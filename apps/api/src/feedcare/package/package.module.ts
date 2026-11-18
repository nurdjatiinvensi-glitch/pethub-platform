import { Module } from '@nestjs/common';

import { PackageController } from './package.controller.js';
import { PackageService } from './package.service.js';

@Module({
  providers: [PackageService],
  controllers: [PackageController],
  // Modul lain (Order) memakai Package lewat service ini.
  exports: [PackageService],
})
export class PackageModule {}
