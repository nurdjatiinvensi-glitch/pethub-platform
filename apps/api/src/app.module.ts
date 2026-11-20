import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CatalogModule } from './catalog/catalog.module.js';
import { LoggingModule } from './common/logging/logging.module.js';
import { DonorModule } from './feedcare/donor/donor.module.js';
import { OrderModule } from './feedcare/order/order.module.js';
import { PaymentModule } from './feedcare/payment/payment.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    LoggingModule,
    PrismaModule,
    DonorModule,
    CatalogModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
