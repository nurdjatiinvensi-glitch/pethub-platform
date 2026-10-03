import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PaymentService } from './payment.service.js';

@Controller('feedcare/payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Post('order/:orderId')
  createForOrder(
    @Param('orderId') orderId: string,
  ) {
    return this.paymentService.createForOrder(orderId);
  }

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

  @Patch('order/:orderId/verify')
  verify(
    @Param('orderId') orderId: string,
  ) {
    return this.paymentService.verify(orderId);
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