import { Body, Controller, Post } from '@nestjs/common';

import { DonorService } from './donor.service.js';
import { CreateDonorDto } from './dto/create-donor.dto.js';

@Controller('feedcare/donors')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post()
  create(@Body() data: CreateDonorDto) {
    return this.donorService.create(data);
  }
}