import { Body, Controller, Post } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderService } from './order.service.js';

@Controller('feedcare/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }
}