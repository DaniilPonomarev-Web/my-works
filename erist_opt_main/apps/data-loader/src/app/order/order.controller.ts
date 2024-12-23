import { Body, Controller, Get, Post } from '@nestjs/common';
import { UpdateStatusOrderDto } from './dto/update-status.dto';
import { BrokerService } from '../broker/broker.service';
import { StatusOrderMessage } from '@erist-opt/shared';
import { CacheService } from '../cache/cache.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly brokerService: BrokerService,
    private readonly cacheService: CacheService
  ) {}

  @Get('new-orders')
  async getNewOrders() {
    return this.cacheService.getOrders();
  }

  @Post('status-update')
  statusUpdate(@Body() dto: UpdateStatusOrderDto) {
    const orders: StatusOrderMessage[] = dto.orders.map((o) => ({
      id: o.id,
      doc: { id: o.id_1c, code: o.code },
    }));
    this.brokerService.sendStatusOrders(orders);
    return true;
  }
}
