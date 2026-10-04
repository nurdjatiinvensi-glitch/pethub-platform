import { Test, TestingModule } from '@nestjs/testing';

import { DonorController } from './donor.controller.js';
import { DonorService } from './donor.service.js';

describe('DonorController', () => {
  let controller: DonorController;
  let donorService: {
    create: ReturnType<typeof vi.fn>;
    findAll: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    donorService = {
      create: vi.fn(),
      findAll: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonorController],
      providers: [
        {
          provide: DonorService,
          useValue: donorService,
        },
      ],
    }).compile();

    controller = module.get<DonorController>(DonorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all donors from the service', async () => {
      const donors = [
        {
          id: 'donor-123',
          name: 'DJ',
          phone: '08123456789',
        },
      ];

      donorService.findAll.mockResolvedValue(donors);

      await expect(controller.findAll()).resolves.toEqual(donors);

      expect(donorService.findAll).toHaveBeenCalledOnce();
    });
  });

  describe('create', () => {
    it('should pass donor data to the service', async () => {
      const donorData = {
        name: 'DJ',
        phone: '08123456789',
        email: 'dj@example.com',
      };

      const createdDonor = {
        id: 'donor-123',
        ...donorData,
      };

      donorService.create.mockResolvedValue(createdDonor);

      await expect(controller.create(donorData)).resolves.toEqual(
        createdDonor,
      );

      expect(donorService.create).toHaveBeenCalledWith(donorData);
    });
  });
});