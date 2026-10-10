import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service.js';
import { PackageService } from './package.service.js';

describe('PackageService', () => {
  let service: PackageService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      client: {
        orm: {
          public: {
            FeedCarePackage: {
              all: vi.fn(),
            },
          },
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackageService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<PackageService>(PackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all FeedCare packages', async () => {
      const packages = [
        {
          id: 'package-123',
          name: 'Paket Basic',
          price: 50000,
        },
        {
          id: 'package-456',
          name: 'Paket Premium',
          price: 100000,
        },
      ];

      prismaMock.client.orm.public.FeedCarePackage.all.mockResolvedValue(
        packages,
      );

      await expect(service.findAll()).resolves.toEqual(packages);

      expect(
        prismaMock.client.orm.public.FeedCarePackage.all,
      ).toHaveBeenCalledOnce();
    });
  });
});