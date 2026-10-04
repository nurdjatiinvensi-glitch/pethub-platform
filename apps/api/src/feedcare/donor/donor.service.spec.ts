import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service.js';
import { DonorService } from './donor.service.js';

describe('DonorService', () => {
  let service: DonorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonorService,
        {
          provide: PrismaService,
          useValue: {
            client: {
              orm: {
                public: {
                  Donor: {
                    first: vi.fn(),
                    create: vi.fn(),
                    where: vi.fn(),
                  },
                },
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<DonorService>(DonorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});