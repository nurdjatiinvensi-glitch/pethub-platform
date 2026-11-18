import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { DonorController } from './donor.controller.js';
import { DonorService } from './donor.service.js';

describe('DonorController', () => {
  let controller: DonorController;
  let app: INestApplication;
  let donorService: {
    create: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    donorService = {
      create: vi.fn(),
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
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Regresi keamanan: daftar donor berisi nama, email, dan nomor HP orang lain.
  // Route GET ini sengaja dihapus. Jika ada yang menambahkannya lagi, test gagal.
  describe('daftar donor tidak boleh terbuka', () => {
    it('GET /feedcare/donors tidak ada (404)', async () => {
      await request(app.getHttpServer()).get('/feedcare/donors').expect(404);
    });

    it('service tidak lagi menyediakan findAll', () => {
      expect('findAll' in DonorService.prototype).toBe(false);
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

    it('POST /feedcare/donors tetap berfungsi (dipakai checkout web)', async () => {
      donorService.create.mockResolvedValue({ id: 'donor-1' });

      await request(app.getHttpServer())
        .post('/feedcare/donors')
        .send({ name: 'DJ', phone: '08123456789' })
        .expect(201);
    });
  });
});
