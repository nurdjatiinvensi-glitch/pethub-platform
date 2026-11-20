import { Module } from '@nestjs/common';

import { DonorModule } from '../donor/donor.module.js';
import { PaymentModule } from '../payment/payment.module.js';
import { CatalogModule } from '../../catalog/catalog.module.js';

import { OrderPaymentController } from './order-payment.controller.js';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';

// Order adalah "orkestrator": ia memakai Donor, Item, dan Payment lewat
// service yang mereka ekspor. Arah dependensi hanya satu arah:
//   Order -> Donor, Order -> Catalog Item, Order -> Payment
// Tidak ada modul yang boleh bergantung balik ke Order (tidak ada siklus).
@Module({
  imports: [DonorModule, PaymentModule, CatalogModule],
  providers: [OrderService],
  controllers: [OrderController, OrderPaymentController],
})
export class OrderModule {}
