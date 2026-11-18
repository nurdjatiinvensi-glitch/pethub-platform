import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service.js';
import { DonorService } from './donor.service.js';

describe('DonorService', () => {
  let service: DonorService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      client: {
        orm: {
          public: {
            Donor: {
              all: vi.fn(),
              first: vi.fn(),
              create: vi.fn(),
            },
          },
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonorService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<DonorService>(DonorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const donorData = {
      name: 'DJ',
      phone: '08123456789',
      email: 'dj@example.com',
    };

    it('should create a donor when the phone number is not registered', async () => {
      prismaMock.client.orm.public.Donor.first.mockResolvedValue(null);

      const createdDonor = {
        id: 'donor-123',
        ...donorData,
      };

      prismaMock.client.orm.public.Donor.create.mockResolvedValue(
        createdDonor,
      );

      await expect(service.create(donorData)).resolves.toEqual(createdDonor);

      expect(prismaMock.client.orm.public.Donor.first).toHaveBeenCalledWith({
        phone: donorData.phone,
      });

      expect(prismaMock.client.orm.public.Donor.create).toHaveBeenCalledWith(
        donorData,
      );
    });

    it('should return the existing donor when the phone number is registered', async () => {
      const existingDonor = {
        id: 'donor-existing',
        ...donorData,
      };

      prismaMock.client.orm.public.Donor.first.mockResolvedValue(
        existingDonor,
      );

      await expect(service.create(donorData)).resolves.toEqual(existingDonor);

      expect(prismaMock.client.orm.public.Donor.create).not.toHaveBeenCalled();
    });
  });
});