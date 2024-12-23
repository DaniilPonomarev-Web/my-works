import { AppLoggerLoki } from '@erist-opt/logs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  GET_CATEGORIES_SEARCH,
  GET_PRODUCTS_SEARCH,
  ICategory,
  ITransformedProduct,
  OrderDTO,
  SEND_NEW_ORDER,
} from '@erist-opt/shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('ERIST_OPT')
    private rabbitClient: ClientProxy,

    @Inject('ORDER_QUEUE')
    private orderQueueClient: ClientProxy,
    private AppLoggerLoki: AppLoggerLoki
  ) {}

  /**
   * Отправка заказа в очередь RabbitMQ
   * @param order - Объект заказа для отправки
   * @returns
   */
  async pushOrder(order: OrderDTO): Promise<boolean> {
    this.AppLoggerLoki.log(
      `Отправили заказ в очередь с id=${order.id}`,
      'order_queue'
    );
    return firstValueFrom(this.orderQueueClient.emit(SEND_NEW_ORDER, order));
  }

  /**
   * Получить все включенные товары
   * @interface productsPayload
   * @returns
   */
  async getProductsForSearch(): Promise<ITransformedProduct[]> {
    return firstValueFrom(
      this.rabbitClient.send({ cmd: GET_PRODUCTS_SEARCH }, {})
    );
  }

  /**
   * Получить все категории
   * @interface productsPayload
   * @returns
   */
  async getCategoriesForSearch(): Promise<ICategory[] | null> {
    return firstValueFrom(
      this.rabbitClient.send({ cmd: GET_CATEGORIES_SEARCH }, {})
    );
  }
}
