import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Message1C } from '../broker/broker.interface';

@Injectable()
export class CacheService {
  private key = 'orders_1c';

  private logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async saveOrder(order: Message1C) {
    this.logger.log(`saveOrder: ${order.id}`);
    const orders = (await this.cacheManager.get<Message1C[]>(this.key)) ?? [];

    orders.push(order);

    await this.cacheManager.set(this.key, orders);
  }

  async getOrders(): Promise<Message1C[]> {
    const orders = await this.cacheManager.get<Message1C[]>(this.key);
    this.clearOrders();
    return orders ?? [];
  }

  clearOrders() {
    this.cacheManager.set(this.key, []);
  }
}
