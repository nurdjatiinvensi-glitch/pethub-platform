import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DonorModule } from './feedcare/donor/donor.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { PackageModule } from './feedcare/package/package.module.js';
import { OrderModule } from './feedcare/order/order.module.js';
import { PaymentModule } from './feedcare/payment/payment.module.js';

@Module({
  imports: [
    PrismaModule,
    DonorModule,
    PackageModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}