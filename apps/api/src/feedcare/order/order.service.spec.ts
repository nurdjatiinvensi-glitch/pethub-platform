import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PaymentService } from '../payment/payment.service.js';
import { OrderService } from './order.service.js';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: {
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
          },
        },
        {
          provide: PaymentService,
          useValue: {
            createForOrder: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});