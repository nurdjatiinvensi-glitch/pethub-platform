import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PackageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.orm.public.FeedCarePackage.all();
  }

  // Dipakai modul lain (Order): paket harus ada dan masih aktif.
  async findActiveById(id: string) {
    if (typeof id !== 'string' || !id.trim()) {
      throw new BadRequestException('Package wajib dipilih.');
    }

    const packageData =
      await this.prisma.client.orm.public.FeedCarePackage.first({ id });

    if (!packageData) {
      throw new NotFoundException('FeedCare Package tidak ditemukan.');
    }

    if (!packageData.isActive) {
      throw new NotFoundException('FeedCare Package sudah tidak aktif.');
    }

    return packageData;
  }
}
