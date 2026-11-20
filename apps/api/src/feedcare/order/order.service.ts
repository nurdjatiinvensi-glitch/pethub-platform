import { randomBytes } from 'node:crypto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { AuditLogService } from '../../common/logging/audit-log.service.js';
import type { DbContext } from '../../prisma/db-context.js';
import { isUniqueViolation } from '../../prisma/db-errors.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ItemService } from '../../catalog/item/item.service.js';
import { DonorService } from '../donor/donor.service.js';
import { PaymentService } from '../payment/payment.service.js';

import { CreateOrderDto } from './dto/create-order.dto.js';

const MAX_ORDER_NUMBER_ATTEMPTS = 5;

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLog: AuditLogService,
    private readonly donorService: DonorService,
    private readonly paymentService: PaymentService,
    private readonly itemService: ItemService,
  ) {}

  async create(data: CreateOrderDto) {
    if (typeof data.itemId !== 'string' || !data.itemId.trim()) {
      throw new BadRequestException('Item FeedCare wajib dipilih.');
    }

    const donor = await this.donorService.findByPhone(data.phone);

    if (!donor) {
      throw new NotFoundException(
        'Donor tidak ditemukan. Buat donor terlebih dahulu.',
      );
    }

    const item = await this.itemService.findFeedCareItemById(data.itemId);
    const totalAmount = String(item.price);

    for (let attempt = 1; ; attempt++) {
      try {
        // Order dan payment dibuat dalam SATU transaksi: tidak akan pernah ada
        // order tanpa payment (atau sebaliknya) jika salah satu langkah gagal.
        return await this.prisma.client.transaction(async (tx) => {
          const order = await tx.orm.public.FeedCareOrder.create({
            orderNumber: this.generateOrderNumber(),
            donorId: donor.id,
            packageId: null,
            itemId: item.id,
            quantity: 1,
            mealsPurchased: null,
            totalAmount,
            status: 'PENDING',
          });

          await this.paymentService.createForOrder(
            order.id,
            order.totalAmount,
            tx,
          );

          return order;
        });
      } catch (error) {
        // Nomor order acak bisa bentrok (sangat jarang). Database menolaknya
        // lewat unique constraint, lalu kita coba lagi dengan nomor baru.
        const collided = isUniqueViolation(error, 'orderNumber');

        if (!collided || attempt >= MAX_ORDER_NUMBER_ATTEMPTS) {
          throw error;
        }
      }
    }
  }

  async findById(orderId: string, db: DbContext = this.prisma.client) {
    const order = await db.orm.public.FeedCareOrder.first({
      id: orderId,
    });

    if (!order) {
      throw new NotFoundException('FeedCare Order tidak ditemukan.');
    }

    return order;
  }

  // Membuat payment untuk order yang sudah ada (idempotent).
  async ensurePayment(orderId: string) {
    const order = await this.findById(orderId);

    return this.paymentService.createForOrder(order.id, order.totalAmount);
  }

  // Verifikasi pembayaran. Tiga langkah berikut berhasil atau gagal BERSAMA
  // (satu transaksi): payment menjadi PAID, order menjadi PAID, audit log dicatat.
  async verifyPayment(orderId: string) {
    return this.prisma.client.transaction(async (tx) => {
      await this.findById(orderId, tx);

      const payment = await this.paymentService.verify(orderId, tx);

      await tx.orm.public.FeedCareOrder
        .where({ id: orderId })
        .update({ status: 'PAID' });

      await this.auditLog.log(
        {
          action: 'FEEDCARE_PAYMENT_VERIFIED',
          entity: 'Payment',
          entityId: payment.id,
          oldValue: { status: 'VERIFYING' },
          newValue: { status: 'PAID', orderId },
        },
        tx,
      );

      return payment;
    });
  }

  // FC-YYYYMMDD-XXXXXX. Bagian acak memakai crypto (bukan Math.random) agar
  // tidak mudah ditebak: 6 karakter heksadesimal = 16,7 juta kemungkinan/hari.
  private generateOrderNumber() {
    const now = new Date();

    const datePart = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('');

    const randomPart = randomBytes(3).toString('hex').toUpperCase();

    return `FC-${datePart}-${randomPart}`;
  }
}
