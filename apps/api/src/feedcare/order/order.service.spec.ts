import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PaymentService } from '../payment/payment.service.js';
import { OrderService } from './order.service.js';

describe('OrderService', () => {
  let service: OrderService;

  const prismaMock = {
    client: {
      orm: {
        public: {
          Donor: {
            first: vi.fn(),
          },
          FeedCarePackage: {
            first: vi.fn(),
          },
          FeedCareOrder: {
            create: vi.fn(),
          },
        },
      },
    },
  };

  const paymentMock = {
    createForOrder: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: PaymentService, useValue: paymentMock },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order and initialize payment', async () => {
    const donor = { id: 'donor-1' };
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

    prismaMock.client.orm.public.Donor.first.mockResolvedValue(donor);
    prismaMock.client.orm.public.FeedCarePackage.first.mockResolvedValue(
      packageData,
    );
    prismaMock.client.orm.public.FeedCareOrder.create.mockResolvedValue(
      createdOrder,
    );
    paymentMock.createForOrder.mockResolvedValue(undefined);

    const result = await service.create({
      phone: '08123456789',
      packageId: 'package-1',
    });

    expect(result).toEqual(createdOrder);
    expect(prismaMock.client.orm.public.Donor.first).toHaveBeenCalledWith({
      phone: '08123456789',
    });
    expect(
      prismaMock.client.orm.public.FeedCarePackage.first,
    ).toHaveBeenCalledWith({ id: 'package-1' });
    expect(prismaMock.client.orm.public.FeedCareOrder.create).toHaveBeenCalledWith(
      expect.objectContaining({
        donorId: 'donor-1',
        packageId: 'package-1',
        quantity: 1,
        mealsPurchased: 100,
        totalAmount: 250000,
        status: 'PENDING',
      }),
    );
    expect(paymentMock.createForOrder).toHaveBeenCalledWith('order-1');
  });

  it('should reject order creation when donor does not exist', async () => {
    prismaMock.client.orm.public.Donor.first.mockResolvedValue(null);

    await expect(
      service.create({
        phone: '08123456789',
        packageId: 'package-1',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(
      prismaMock.client.orm.public.FeedCarePackage.first,
    ).not.toHaveBeenCalled();
    expect(
      prismaMock.client.orm.public.FeedCareOrder.create,
    ).not.toHaveBeenCalled();
    expect(paymentMock.createForOrder).not.toHaveBeenCalled();
  });

  it('should reject order creation when package does not exist', async () => {
    prismaMock.client.orm.public.Donor.first.mockResolvedValue({
      id: 'donor-1',
    });
    prismaMock.client.orm.public.FeedCarePackage.first.mockResolvedValue(null);

    await expect(
      service.create({
        phone: '08123456789',
        packageId: 'package-1',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(
      prismaMock.client.orm.public.FeedCareOrder.create,
    ).not.toHaveBeenCalled();
    expect(paymentMock.createForOrder).not.toHaveBeenCalled();
  });

  it('should reject order creation when package is inactive', async () => {
    prismaMock.client.orm.public.Donor.first.mockResolvedValue({
      id: 'donor-1',
    });
    prismaMock.client.orm.public.FeedCarePackage.first.mockResolvedValue({
      id: 'package-1',
      isActive: false,
    });

    await expect(
      service.create({
        phone: '08123456789',
        packageId: 'package-1',
      }),
    ).rejects.toThrow(NotFoundException);

    expect(
      prismaMock.client.orm.public.FeedCareOrder.create,
    ).not.toHaveBeenCalled();
    expect(paymentMock.createForOrder).not.toHaveBeenCalled();
  });
});