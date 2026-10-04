import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service.js';
import { PackageService } from './package.service.js';

describe('PackageService', () => {
  let service: PackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackageService,
        {
          provide: PrismaService,
          useValue: {
            client: {
              orm: {
                public: {
                  FeedCarePackage: {
                    first: vi.fn(),
                    create: vi.fn(),
                    where: vi.fn(),
                    update: vi.fn(),
                    delete: vi.fn(),
                  },
                },
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<PackageService>(PackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});