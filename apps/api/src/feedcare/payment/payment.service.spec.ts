import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PaymentService } from './payment.service.js';

describe('PaymentService', () => {
  let service: PaymentService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      client: {
        orm: {
          public: {
            Payment: {
              first: vi.fn(),
              create: vi.fn(),
              where: vi.fn(),
            },
            FeedCareOrder: {
              first: vi.fn(),
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
        paidAmount: 50000,
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
        paidAmount: 50000,
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
        service.submitProof('order-123', -1000, 'https://example.com/proof.jpg'),
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
        service.submitProof('order-123', 50000, 'https://example.com/proof.jpg'),
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
        paidAmount: 50000,
        proofUrl: 'https://example.com/proof.jpg',
        rejectionReason: null,
        status: 'VERIFYING',
      });
    });
  });
});