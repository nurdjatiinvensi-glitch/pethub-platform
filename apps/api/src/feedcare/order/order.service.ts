import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';

import { CreateOrderDto } from './dto/create-order.dto.js';

import { PaymentService } from '../payment/payment.service.js';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
  ) {}

  async create(data: CreateOrderDto) {
    const donor = await this.prisma.client.orm.public.Donor.first({
      phone: data.phone,
    });

    if (!donor) {
      throw new NotFoundException(
        'Donor tidak ditemukan. Buat donor terlebih dahulu.',
      );
    }

    const packageData =
      await this.prisma.client.orm.public.FeedCarePackage.first({
        id: data.packageId,
      });

    if (!packageData) {
      throw new NotFoundException(
        'FeedCare Package tidak ditemukan.',
      );
    }

    if (!packageData.isActive) {
      throw new NotFoundException(
        'FeedCare Package sudah tidak aktif.',
      );
    }

    const now = new Date();

    const datePart = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('');

    const randomPart = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const orderNumber = `FC-${datePart}-${randomPart}`;

    const order =
      await this.prisma.client.orm.public.FeedCareOrder.create({
        orderNumber,
        donorId: donor.id,
        packageId: packageData.id,
        quantity: 1,
        mealsPurchased: packageData.meals,
        totalAmount: packageData.price,
        status: 'PENDING',
      });

    await this.paymentService.createForOrder(order.id);

    return order;
  }
}