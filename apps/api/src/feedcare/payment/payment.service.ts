import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AuditLogService } from '../../common/logging/audit-log.service.js';
import type { DbContext, TxContext } from '../../prisma/db-context.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { transitionPayment } from './payment-state.js';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLog: AuditLogService,
  ) {}

  // Nominal tagihan diberikan oleh pemanggil (modul Order). Payment tidak
  // membaca tabel order. `db` opsional agar bisa ikut transaksi pemanggil.
  async createForOrder(
    orderId: string,
    amount: number,
    db: DbContext = this.prisma.client,
  ) {
    const existingPayment = await db.orm.public.Payment.first({
      orderId,
    });

    if (existingPayment) {
      return existingPayment;
    }

    return db.orm.public.Payment.create({
      orderId,
      amount,
      method: 'QRIS',
      status: 'PENDING',
    });
  }

  async findByOrder(orderId: string, db: DbContext = this.prisma.client) {
    const payment = await db.orm.public.Payment.first({
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

    if (!['PENDING', 'REJECTED'].includes(payment.status)) {
      throw new BadRequestException(
        'Bukti pembayaran hanya dapat dikirim saat status PENDING atau REJECTED.',
      );
    }

    if (!Number.isFinite(paidAmount) || paidAmount <= 0) {
      throw new BadRequestException(
        'Nominal pembayaran harus lebih dari nol.',
      );
    }

    if (!proofUrl || !proofUrl.trim()) {
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
        proofUrl: proofUrl.trim(),
        rejectionReason: null,
        status: 'VERIFYING',
      });
  }

  // Hanya mengubah payment. Mengubah status order dan mencatat audit log adalah
  // tugas modul Order (OrderService.verifyPayment), dalam satu transaksi.
  // Wajib dipanggil dengan `tx` agar perubahan status bersifat atomik.
  async verify(orderId: string, tx: TxContext) {
    const payment = await this.findByOrder(orderId, tx);

    if (payment.status !== 'VERIFYING') {
      throw new BadRequestException(
        'Payment belum berada pada status VERIFYING.',
      );
    }

    const now = new Date().toISOString();

    // Jika dua admin menekan verify bersamaan, hanya satu yang berhasil
    // mengubah baris; yang lain mendapat `false` dan ditolak.
    const changed = await transitionPayment(tx, payment.id, 'VERIFYING', {
      status: 'PAID',
      paidAt: now,
      verifiedAt: now,
    });

    if (!changed) {
      throw new BadRequestException(
        'Payment belum berada pada status VERIFYING.',
      );
    }

    return this.findByOrder(orderId, tx);
  }

  async reject(
    orderId: string,
    rejectionReason: string,
  ) {
    return this.prisma.client.transaction(async (tx) => {
      const payment = await this.findByOrder(orderId, tx);

      if (payment.status !== 'VERIFYING') {
        throw new BadRequestException(
          'Payment belum berada pada status VERIFYING.',
        );
      }

      const changed = await transitionPayment(tx, payment.id, 'VERIFYING', {
        status: 'REJECTED',
        rejectionReason,
      });

      if (!changed) {
        throw new BadRequestException(
          'Payment belum berada pada status VERIFYING.',
        );
      }

      await this.auditLog.log(
        {
          action: 'FEEDCARE_PAYMENT_REJECTED',
          entity: 'Payment',
          entityId: payment.id,
          oldValue: { status: 'VERIFYING' },
          newValue: { status: 'REJECTED', rejectionReason, orderId },
        },
        tx,
      );

      return this.findByOrder(orderId, tx);
    });
  }
}
