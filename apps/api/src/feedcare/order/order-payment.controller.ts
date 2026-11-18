import { Controller, Param, Patch, Post } from '@nestjs/common';

import { OrderService } from './order.service.js';

// Route di bawah /feedcare/payments yang membutuhkan data Order. Letaknya di
// modul Order (bukan Payment) supaya Payment tidak perlu mengenal Order.
// URL untuk klien tidak berubah.
@Controller('feedcare/payments')
export class OrderPaymentController {
  constructor(private readonly orderService: OrderService) {}

  @Post('order/:orderId')
  ensurePayment(@Param('orderId') orderId: string) {
    return this.orderService.ensurePayment(orderId);
  }

  @Patch('order/:orderId/verify')
  verify(@Param('orderId') orderId: string) {
    return this.orderService.verifyPayment(orderId);
  }
}
