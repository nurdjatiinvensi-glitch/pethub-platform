import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async createForOrder(orderId: string) {
    const order = await this.prisma.client.orm.public.FeedCareOrder.first({
      id: orderId,
    });

    if (!order) {
      throw new NotFoundException(
        'FeedCare Order tidak ditemukan.',
      );
    }

    const existingPayment =
      await this.prisma.client.orm.public.Payment.first({
        orderId,
      });

    if (existingPayment) {
      return existingPayment;
    }

    return this.prisma.client.orm.public.Payment.create({
      orderId: order.id,
      amount: order.totalAmount,
      method: 'QRIS',
      status: 'PENDING',
    });
  }

  async findByOrder(orderId: string) {
    const payment =
      await this.prisma.client.orm.public.Payment.first({
        orderId,
      });

    if (!payment) {
      throw new NotFoundException(
        'Payment untuk order tersebut tidak ditemukan.',
      );
    }

    return payment;
  }

  async submitProof(
    orderId: string,
    paidAmount: number,
    proofUrl: string,
  ) {
    const payment = await this.findByOrder(orderId);

    if (payment.status === 'PAID') {
      throw new BadRequestException(
        'Payment sudah diverifikasi.',
      );
    }

    if (!proofUrl) {
      throw new BadRequestException(
        'Bukti pembayaran wajib diupload.',
      );
    }

    return this.prisma.client.orm.public.Payment
      .where({
        id: payment.id,
      })
      .update({
        paidAmount,
        proofUrl,
        status: 'VERIFYING',
      });
  }

  async verify(orderId: string) {
    const payment = await this.findByOrder(orderId);

    if (payment.status !== 'VERIFYING') {
      throw new BadRequestException(
        'Payment belum berada pada status VERIFYING.',
      );
    }

    const now = new Date();

    const updatedPayment =
      await this.prisma.client.orm.public.Payment
        .where({
          id: payment.id,
        })
        .update({
          status: 'PAID',
paidAt: new Date().toISOString(),
verifiedAt: new Date().toISOString(),
        });

    await this.prisma.client.orm.public.FeedCareOrder
      .where({
        id: orderId,
      })
      .update({
        status: 'PAID',
      });

    return updatedPayment;
  }

  async reject(
    orderId: string,
    rejectionReason: string,
  ) {
    const payment = await this.findByOrder(orderId);

    if (payment.status !== 'VERIFYING') {
      throw new BadRequestException(
        'Payment belum berada pada status VERIFYING.',
      );
    }

    return this.prisma.client.orm.public.Payment
      .where({
        id: payment.id,
      })
      .update({
        status: 'REJECTED',
        rejectionReason,
      });
  }
}