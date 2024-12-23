import { OrderDTOFor1c, SEND_NEW_ORDER } from '@erist-opt/shared';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { OrderService } from './order/order.service';

@Controller()
export class AppMessage {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern(SEND_NEW_ORDER)
  async getOrder(order: OrderDTOFor1c) {
    this.orderService.processOrderFromSite(order);
  }
}
