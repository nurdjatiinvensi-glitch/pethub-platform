import { Test, TestingModule } from '@nestjs/testing';

import { PackageController } from './package.controller.js';
import { PackageService } from './package.service.js';

describe('PackageController', () => {
  let controller: PackageController;
  let packageServiceMock: {
    findAll: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    packageServiceMock = {
      findAll: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageController],
      providers: [
        {
          provide: PackageService,
          useValue: packageServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PackageController>(PackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all FeedCare packages', async () => {
      const packages = [
        { id: 'package-123', name: 'Paket Basic', price: 50000 },
        { id: 'package-456', name: 'Paket Premium', price: 100000 },
      ];

      packageServiceMock.findAll.mockResolvedValue(packages);

      await expect(controller.findAll()).resolves.toEqual(packages);

      expect(packageServiceMock.findAll).toHaveBeenCalledOnce();
    });
  });
});
