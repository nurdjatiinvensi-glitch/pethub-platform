import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateDonorDto } from './dto/create-donor.dto.js';

@Injectable()
export class DonorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.orm.public.Donor.all();
  }

  async create(data: CreateDonorDto) {
    const existingDonor =
      await this.prisma.client.orm.public.Donor.first({
        phone: data.phone,
      });

    if (existingDonor) {
      return existingDonor;
    }

    return this.prisma.client.orm.public.Donor.create({
      phone: data.phone,
      name: data.name,
      email: data.email,
    });
  }
}