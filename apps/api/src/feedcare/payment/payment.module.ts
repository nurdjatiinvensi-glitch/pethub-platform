import { Module } from '@nestjs/common';

import { PaymentController } from './payment.controller.js';
import { PaymentService } from './payment.service.js';

// Payment adalah modul "daun": ia hanya mengurus tabel payment miliknya sendiri
// dan tidak tahu apa pun tentang Order. Order yang bergantung pada Payment.
@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
