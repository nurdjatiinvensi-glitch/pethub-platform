import { Module } from '@nestjs/common';

import { DonorModule } from '../donor/donor.module.js';
import { PackageModule } from '../package/package.module.js';
import { PaymentModule } from '../payment/payment.module.js';

import { OrderPaymentController } from './order-payment.controller.js';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';

// Order adalah "orkestrator": ia memakai Donor, Package, dan Payment lewat
// service yang mereka ekspor. Arah dependensi hanya satu arah:
//   Order -> Donor, Order -> Package, Order -> Payment
// Tidak ada modul yang boleh bergantung balik ke Order (tidak ada siklus).
@Module({
  imports: [DonorModule, PackageModule, PaymentModule],
  providers: [OrderService],
  controllers: [OrderController, OrderPaymentController],
})
export class OrderModule {}
