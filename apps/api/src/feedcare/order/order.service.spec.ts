import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogService } from '../../common/logging/audit-log.service.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { DonorService } from '../donor/donor.service.js';
import { PackageService } from '../package/package.service.js';
import { PaymentService } from '../payment/payment.service.js';
import { OrderService } from './order.service.js';

describe('OrderService', () => {
  let service: OrderService;

  // Order hanya boleh menyentuh tabel miliknya sendiri (FeedCareOrder).
  // Donor, Package, dan Payment diakses lewat service masing-masing.
  const orderUpdate = vi.fn();
  const prismaMock = {
    client: {
      // transaction(fn) menjalankan fn dengan konteks yang sama (tanpa DB asli).
      transaction: vi.fn(async (fn: (tx: unknown) => unknown) =>
        fn(prismaMock.client),
      ),
      orm: {
        public: {
          FeedCareOrder: {
            first: vi.fn(),
            create: vi.fn(),
            where: vi.fn(() => ({ update: orderUpdate })),
          },
        },
      },
    },
  };

  const auditMock = { log: vi.fn() };
  const donorMock = { findByPhone: vi.fn() };
  const packageMock = { findActiveById: vi.fn() };
  const paymentMock = {
    createForOrder: vi.fn(),
    verify: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: AuditLogService, useValue: auditMock },
        { provide: DonorService, useValue: donorMock },
        { provide: PackageService, useValue: packageMock },
        { provide: PaymentService, useValue: paymentMock },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const packageData = {
      id: 'package-1',
      isActive: true,
      meals: 100,
      price: 250000,
    };
    const createdOrder = {
      id: 'order-1',
      orderNumber: 'FC-20261004-ABC123',
      donorId: 'donor-1',
      packageId: 'package-1',
      quantity: 1,
      mealsPurchased: 100,
      totalAmount: 250000,
      status: 'PENDING',
    };

    it('should create an order and initialize payment with the order amount', async () => {
      donorMock.findByPhone.mockResolvedValue({ id: 'donor-1' });
      packageMock.findActiveById.mockResolvedValue(packageData);
      prismaMock.client.orm.public.FeedCareOrder.create.mockResolvedValue(
        createdOrder,
      );

      const result = await service.create({
        phone: '628123456789',
        packageId: 'package-1',
      });

      expect(donorMock.findByPhone).toHaveBeenCalledWith('628123456789');
      expect(packageMock.findActiveById).toHaveBeenCalledWith('package-1');
      expect(
        prismaMock.client.orm.public.FeedCareOrder.create,
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          orderNumber: expect.stringMatching(/^FC-\d{8}-[A-Z0-9]+$/),
          donorId: 'donor-1',
          packageId: 'package-1',
          quantity: 1,
          mealsPurchased: 100,
          totalAmount: 250000,
          status: 'PENDING',
        }),
      );
      // Payment dibuat dalam transaksi yang sama dengan order (argumen ke-3).
      expect(paymentMock.createForOrder).toHaveBeenCalledWith(
        'order-1',
        250000,
        prismaMock.client,
      );
      expect(prismaMock.client.transaction).toHaveBeenCalledTimes(1);
      expect(result).toEqual(createdOrder);
    });

    it('should retry with a new order number when the number collides', async () => {
      donorMock.findByPhone.mockResolvedValue({ id: 'donor-1' });
      packageMock.findActiveById.mockResolvedValue(packageData);
      prismaMock.client.orm.public.FeedCareOrder.create
        .mockRejectedValueOnce({
          sqlState: '23505',
          constraint: 'feedCareOrder_orderNumber_key',
        })
        .mockResolvedValueOnce(createdOrder);

      const result = await service.create({
        phone: '628123456789',
        packageId: 'package-1',
      });

      expect(
        prismaMock.client.orm.public.FeedCareOrder.create,
      ).toHaveBeenCalledTimes(2);
      expect(result).toEqual(createdOrder);
    });

    it('should not retry on errors other than an order number collision', async () => {
      donorMock.findByPhone.mockResolvedValue({ id: 'donor-1' });
      packageMock.findActiveById.mockResolvedValue(packageData);
      prismaMock.client.orm.public.FeedCareOrder.create.mockRejectedValue(
        new Error('koneksi putus'),
      );

      await expect(
        service.create({ phone: '628123456789', packageId: 'package-1' }),
      ).rejects.toThrow('koneksi putus');

      expect(
        prismaMock.client.orm.public.FeedCareOrder.create,
      ).toHaveBeenCalledTimes(1);
    });

    it('should give up after repeated collisions', async () => {
      donorMock.findByPhone.mockResolvedValue({ id: 'donor-1' });
      packageMock.findActiveById.mockResolvedValue(packageData);
      prismaMock.client.orm.public.FeedCareOrder.create.mockRejectedValue({
        sqlState: '23505',
        constraint: 'feedCareOrder_orderNumber_key',
      });

      await expect(
        service.create({ phone: '628123456789', packageId: 'package-1' }),
      ).rejects.toMatchObject({ sqlState: '23505' });

      expect(
        prismaMock.client.orm.public.FeedCareOrder.create,
      ).toHaveBeenCalledTimes(5);
    });

    it('should reject order creation when donor does not exist', async () => {
      donorMock.findByPhone.mockResolvedValue(null);

      await expect(
        service.create({ phone: '628123456789', packageId: 'package-1' }),
      ).rejects.toThrow(NotFoundException);

      expect(packageMock.findActiveById).not.toHaveBeenCalled();
      expect(
        prismaMock.client.orm.public.FeedCareOrder.create,
      ).not.toHaveBeenCalled();
    });

    it('should not create an order when the package lookup fails', async () => {
      donorMock.findByPhone.mockResolvedValue({ id: 'donor-1' });
      packageMock.findActiveById.mockRejectedValue(
        new NotFoundException('FeedCare Package sudah tidak aktif.'),
      );

      await expect(
        service.create({ phone: '628123456789', packageId: 'package-1' }),
      ).rejects.toThrow('sudah tidak aktif');

      expect(
        prismaMock.client.orm.public.FeedCareOrder.create,
      ).not.toHaveBeenCalled();
      expect(paymentMock.createForOrder).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException when order does not exist', async () => {
      prismaMock.client.orm.public.FeedCareOrder.first.mockResolvedValue(null);

      await expect(service.findById('missing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('ensurePayment', () => {
    it('should create the payment using the order total', async () => {
      prismaMock.client.orm.public.FeedCareOrder.first.mockResolvedValue({
        id: 'order-1',
        totalAmount: 100000,
      });
      paymentMock.createForOrder.mockResolvedValue({ id: 'payment-1' });

      await service.ensurePayment('order-1');

      expect(paymentMock.createForOrder).toHaveBeenCalledWith(
        'order-1',
        100000,
      );
    });
  });

  describe('verifyPayment', () => {
    it('should verify the payment, then mark the order as PAID', async () => {
      prismaMock.client.orm.public.FeedCareOrder.first.mockResolvedValue({
        id: 'order-1',
      });
      paymentMock.verify.mockResolvedValue({ id: 'payment-1', status: 'PAID' });
      orderUpdate.mockResolvedValue({ id: 'order-1', status: 'PAID' });

      const result = await service.verifyPayment('order-1');

      // Semua langkah memakai transaksi yang sama (tx = prismaMock.client).
      expect(paymentMock.verify).toHaveBeenCalledWith(
        'order-1',
        prismaMock.client,
      );
      expect(orderUpdate).toHaveBeenCalledWith({ status: 'PAID' });
      expect(auditMock.log).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'FEEDCARE_PAYMENT_VERIFIED',
          entityId: 'payment-1',
        }),
        prismaMock.client,
      );
      expect(result).toEqual({ id: 'payment-1', status: 'PAID' });
    });

    it('should not touch the order when the payment cannot be verified', async () => {
      prismaMock.client.orm.public.FeedCareOrder.first.mockResolvedValue({
        id: 'order-1',
      });
      paymentMock.verify.mockRejectedValue(new Error('belum VERIFYING'));

      await expect(service.verifyPayment('order-1')).rejects.toThrow(
        'belum VERIFYING',
      );

      expect(orderUpdate).not.toHaveBeenCalled();
      expect(auditMock.log).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException for an unknown order', async () => {
      prismaMock.client.orm.public.FeedCareOrder.first.mockResolvedValue(null);

      await expect(service.verifyPayment('missing')).rejects.toThrow(
        NotFoundException,
      );
      expect(paymentMock.verify).not.toHaveBeenCalled();
    });
  });
});
