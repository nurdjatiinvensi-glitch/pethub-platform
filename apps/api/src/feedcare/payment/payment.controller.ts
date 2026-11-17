import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';

import { PaymentService } from './payment.service.js';

// Route yang menyentuh Order (POST order/:orderId dan PATCH order/:orderId/verify)
// dilayani oleh OrderPaymentController di modul Order. URL-nya tetap sama.
@Controller('feedcare/payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Get('order/:orderId')
  findByOrder(
    @Param('orderId') orderId: string,
  ) {
    return this.paymentService.findByOrder(orderId);
  }

  @Patch('order/:orderId/proof')
  submitProof(
    @Param('orderId') orderId: string,
    @Body()
    data: {
      paidAmount: number;
      proofUrl: string;
    },
  ) {
    return this.paymentService.submitProof(
      orderId,
      data.paidAmount,
      data.proofUrl,
    );
  }

  @Patch('order/:orderId/reject')
  reject(
    @Param('orderId') orderId: string,
    @Body()
    data: {
      rejectionReason: string;
    },
  ) {
    return this.paymentService.reject(
      orderId,
      data.rejectionReason,
    );
  }
}
