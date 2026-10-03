import { Controller, Get } from '@nestjs/common';

import { PackageService } from './package.service.js';

@Controller('feedcare/packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  findAll() {
    return this.packageService.findAll();
  }
}