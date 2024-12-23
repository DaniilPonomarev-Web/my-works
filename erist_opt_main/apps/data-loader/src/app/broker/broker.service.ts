import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { EventPatternEnum, StatusOrderMessage } from '@erist-opt/shared';

import { Message1C } from './broker.interface';

@Injectable()
export class BrokerService {
  private logger = new Logger(BrokerService.name);

  private patterns = new Map([
    ['products', EventPatternEnum.sync],
    ['categories', EventPatternEnum.sync],
    ['option_types', EventPatternEnum.sync],
    ['options', EventPatternEnum.sync],
    ['balances', EventPatternEnum.syncBalance],
    ['prices', EventPatternEnum.syncPrice],
  ]);
  private Orders: Message1C[] = [];

  constructor(
    @Inject('BROKER_SERVICE') private readonly brokerService: ClientProxy
  ) {}

  /**
   * Получить новые заказы из очереди
   * @returns {Array<Message1C>}
   */
  async writeOrder() {}

  sendSyncNomenclature(key: string, data: any) {
    const pattern = this.patterns.get(key);
    if (!pattern) {
      this.logger.error(`not fount pattern ${key}`);
      return;
    }

    this.logger.log(
      `send: Sync_Nomenclature, key: ${key}, pattern: ${pattern}`
    );
    this.brokerService.emit(pattern, data);
  }

  /**
   * Отправить обновленын заказы
   * @param orders Заказы
   */
  sendStatusOrders(orders: StatusOrderMessage[]) {
    this.logger.log(
      `send: ${EventPatternEnum.updateOrders}, count: ${orders.length}`
    );
    this.brokerService.emit(EventPatternEnum.updateOrders, orders);
  }
}
