import { Module } from '@nestjs/common';

import { DonorController } from './donor.controller.js';
import { DonorService } from './donor.service.js';

@Module({
  controllers: [DonorController],
  providers: [DonorService],
  // Modul lain (misalnya Order) hanya boleh memakai Donor lewat service ini,
  // bukan dengan membaca tabel donor secara langsung.
  exports: [DonorService],
})
export class DonorModule {}
