import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateDonorDto } from './dto/create-donor.dto.js';

@Injectable()
export class DonorService {
  constructor(private readonly prisma: PrismaService) {}

  // Dipakai modul lain (Order). Mengembalikan null jika donor belum ada.
  async findByPhone(phone: string) {
    // Penjaga penting: filter ORM yang bernilai undefined diabaikan, sehingga
    // first({ phone: undefined }) akan mengembalikan donor MANA SAJA.
    if (typeof phone !== 'string' || !phone.trim()) {
      throw new BadRequestException('Nomor HP wajib diisi.');
    }

    return this.prisma.client.orm.public.Donor.first({ phone });
  }

  async create(data: CreateDonorDto) {
    const existingDonor = await this.findByPhone(data.phone);

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
