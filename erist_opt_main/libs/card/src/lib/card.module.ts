import { Module } from '@nestjs/common';
import { CartService } from './card.service';
import { RedisCacheModule } from '@erist-opt/redis';
import { CartResolver } from './card.resolver';
import { ProductModule } from '@erist-opt/product';
import { LogsModule } from '@erist-opt/logs';

@Module({
  imports: [RedisCacheModule, ProductModule, LogsModule],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CardModule {}
