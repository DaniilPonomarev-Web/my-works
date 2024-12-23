import { Module } from '@nestjs/common';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BrokerModule } from '../broker/broker.module';
import { CacheDlModule } from '../cache/cache.module';

@Module({
  imports: [BrokerModule, CacheDlModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
