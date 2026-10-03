import { Module } from '@nestjs/common';

import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';

import { PaymentModule } from '../payment/payment.module.js';

@Module({
  imports: [PaymentModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}