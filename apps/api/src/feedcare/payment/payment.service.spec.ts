import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogService } from '../../common/logging/audit-log.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { transitionPayment } from './payment-state.js';
import { PaymentService } from './payment.service.js';

// transitionPayment menjalankan SQL asli; di unit test cukup kita mock hasilnya
// (true = satu baris berhasil diubah). Perilaku SQL-nya diuji di test integrasi.
vi.mock('./payment-state.js', () => ({ transitionPayment: vi.fn() }));

describe('PaymentService', () => {
  let service: PaymentService;
  let prismaMock: any;
  const auditMock = { log: vi.fn() };

  beforeEach(async () => {
    vi.clearAllMocks();

    prismaMock = {
      client: {
        // transaction(fn) menjalankan fn dengan konteks yang sama (tanpa DB asli).
        transaction: vi.fn(async (fn: (tx: unknown) => unknown) =>
          fn(prismaMock.client),
        ),
        orm: {
          public: {
            Payment: {
              first: vi.fn(),
              create: vi.fn(),
              where: vi.fn(),
            },
          },
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        { provide: AuditLogService, useValue: auditMock },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitProof', () => {
    const payment = {
      id: 'payment-123',
      orderId: 'order-123',
      amount: 50000,
      status: 'PENDING',
    };

    it('should submit valid proof and set status to VERIFYING', async () => {
      prismaMock.client.orm.public.Payment.first.mockResolvedValue(payment);

      const updateMock = vi.fn().mockResolvedValue({
        ...payment,
        paidAmount: '50000',
        proofUrl: 'https://example.com/proof.jpg',
        rejectionReason: null,
        status: 'VERIFYING',
      });

      prismaMock.client.orm.public.Payment.where.mockReturnValue({
        update: updateMock,
      });

      await service.submitProof(
        'order-123',
        50000,
        '  https://example.com/proof.jpg  ',
      );

      expect(
        prismaMock.client.orm.public.Payment.where,
      ).toHaveBeenCalledWith({ id: 'payment-123' });

      expect(updateMock).toHaveBeenCalledWith({
        paidAmount: '50000',
        proofUrl: 'https://example.com/proof.jpg',
        rejectionReason: null,
        status: 'VERIFYING',
      });
    });

    it('should reject zero or negative payment amounts', async () => {
      prismaMock.client.orm.public.Payment.first.mockResolvedValue(payment);

      await expect(
        service.submitProof('order-123', 0, 'https://example.com/proof.jpg'),
      ).rejects.toThrow(BadRequestException);

      await expect(
        service.submitProof(
          'order-123',
          -1000,
          'https://example.com/proof.jpg',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject an empty proof URL', async () => {
      prismaMock.client.orm.public.Payment.first.mockResolvedValue(payment);

      await expect(
        service.submitProof('order-123', 50000, '   '),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject payment statuses other than PENDING or REJECTED', async () => {
      prismaMock.client.orm.public.Payment.first.mockResolvedValue({
        ...payment,
        status: 'PAID',
      });

      await expect(
        service.submitProof(
          'order-123',
          50000,
          'https://example.com/proof.jpg',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should allow resubmission when payment status is REJECTED', async () => {
      prismaMock.client.orm.public.Payment.first.mockResolvedValue({
        ...payment,
        status: 'REJECTED',
      });

      const updateMock = vi.fn().mockResolvedValue({
        ...payment,
        status: 'VERIFYING',
      });

      prismaMock.client.orm.public.Payment.where.mockReturnValue({
        update: updateMock,
      });

      await service.submitProof(
        'order-123',
        50000,
        'https://example.com/proof.jpg',
      );

      expect(updateMock).toHaveBeenCalledWith({
        paidAmount: '50000',
        proofUrl: 'https://example.com/proof.jpg',
        rejectionReason: null,
        status: 'VERIFYING',
      });
    });
  });

  describe('verify', () => {
    const verifying = {
      id: 'payment-123',
      orderId: 'order-123',
      amount: 50000,
      status: 'VERIFYING',
    };

    it('should move VERIFYING to PAID with one conditional update', async () => {
      const tx = prismaMock.client;
      tx.orm.public.Payment.first
        .mockResolvedValueOnce(verifying)
        .mockResolvedValueOnce({ ...verifying, status: 'PAID' });
      vi.mocked(transitionPayment).mockResolvedValue(true);

      const result = await service.verify('order-123', tx);

      expect(result.status).toBe('PAID');
      expect(transitionPayment).toHaveBeenCalledWith(
        tx,
        'payment-123',
        'VERIFYING',
        expect.objectContaining({
          status: 'PAID',
          paidAt: expect.any(String),
          verifiedAt: expect.any(String),
        }),
      );

      // Batas modul: Payment tidak boleh membaca atau mengubah tabel order.
      expect(prismaMock.client.orm.public.FeedCareOrder).toBeUndefined();
    });

    it('should fail when another request already changed it (0 rows updated)', async () => {
      const tx = prismaMock.client;
      tx.orm.public.Payment.first.mockResolvedValue(verifying);
      // Dua admin menekan verify bersamaan: database mengubah 0 baris untuk yang kalah.
      vi.mocked(transitionPayment).mockResolvedValue(false);

      await expect(service.verify('order-123', tx)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should reject verification when payment is not VERIFYING', async () => {
      const tx = prismaMock.client;
      tx.orm.public.Payment.first.mockResolvedValue({
        ...verifying,
        status: 'PENDING',
      });

      await expect(service.verify('order-123', tx)).rejects.toThrow(
        BadRequestException,
      );
      expect(transitionPayment).not.toHaveBeenCalled();
    });
  });

  describe('reject', () => {
    const verifying = {
      id: 'payment-123',
      orderId: 'order-123',
      status: 'VERIFYING',
    };

    it('should reject payment, save the reason, and audit in one transaction', async () => {
      prismaMock.client.orm.public.Payment.first
        .mockResolvedValueOnce(verifying)
        .mockResolvedValueOnce({
          ...verifying,
          status: 'REJECTED',
          rejectionReason: 'Bukti pembayaran tidak jelas',
        });
      vi.mocked(transitionPayment).mockResolvedValue(true);

      const result = await service.reject(
        'order-123',
        'Bukti pembayaran tidak jelas',
      );

      expect(result.status).toBe('REJECTED');
      expect(transitionPayment).toHaveBeenCalledWith(
        prismaMock.client,
        'payment-123',
        'VERIFYING',
        { status: 'REJECTED', rejectionReason: 'Bukti pembayaran tidak jelas' },
      );

      expect(prismaMock.client.transaction).toHaveBeenCalledTimes(1);
      expect(auditMock.log).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'FEEDCARE_PAYMENT_REJECTED',
          entity: 'Payment',
          entityId: 'payment-123',
        }),
        prismaMock.client,
      );
    });

    it('should not audit when the payment was already changed (0 rows)', async () => {
      prismaMock.client.orm.public.Payment.first.mockResolvedValue(verifying);
      vi.mocked(transitionPayment).mockResolvedValue(false);

      await expect(
        service.reject('order-123', 'Bukti tidak valid'),
      ).rejects.toThrow(BadRequestException);

      expect(auditMock.log).not.toHaveBeenCalled();
    });

    it('should reject payment rejection when status is not VERIFYING', async () => {
      prismaMock.client.orm.public.Payment.first.mockResolvedValue({
        ...verifying,
        status: 'PAID',
      });

      await expect(
        service.reject('order-123', 'Bukti tidak valid'),
      ).rejects.toThrow(BadRequestException);

      expect(transitionPayment).not.toHaveBeenCalled();
      expect(auditMock.log).not.toHaveBeenCalled();
    });
  });
});
