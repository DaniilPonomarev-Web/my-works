import { CacheService } from './../cache/cache.service';
import { OrderDTOFor1c } from '@erist-opt/shared';
import { Injectable } from '@nestjs/common';
import { Message1C } from '../broker/broker.interface';

import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ConfigService } from '@nestjs/config';

dayjs.extend(utc);
dayjs.extend(tz);

@Injectable()
export class OrderService {
  constructor(
    private configService: ConfigService,
    private readonly cacheService: CacheService
  ) {}

  /**
   * Получения заказа с сайта
   * @param order_1c Заказ
   */
  processOrderFromSite(order_1c: OrderDTOFor1c) {
    const order: Message1C = {
      id: order_1c.id,
      date: dayjs(order_1c.registred)
        .tz(this.configService.get<string>('tz'))
        .format('YYYYMMDDHHmmss'),
      products: order_1c.cart.map((item) => ({
        product_id: item.productId1c,
        option_id: item.optionValueIdIn1c,
        quantity: item.quantity,
        discount: order_1c?.discountPerset,
        price:
          typeof item.price === 'string' ? parseInt(item.price) : item.price,
      })),
    };
    this.cacheService.saveOrder(order);
  }
}
