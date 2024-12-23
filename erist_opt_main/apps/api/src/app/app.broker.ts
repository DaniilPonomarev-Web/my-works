import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CategoryOneCService } from '@erist-opt/category';
import {
  SyncData,
  EventPatternEnum,
  SyncBalanceData,
  SyncPriceData,
  StatusOrderMessage,
} from '@erist-opt/shared';
import { OptionOneCService, OptionValuesOneCService } from '@erist-opt/options';
import { ProductOneCService } from '@erist-opt/product';
import { OrderService } from '@erist-opt/checkout';

@Controller()
export class BrokerMessage {
  constructor(
    private readonly categoryOneCService: CategoryOneCService,
    private readonly optionsService: OptionOneCService,
    private readonly optionValueService: OptionValuesOneCService,
    private readonly productService: ProductOneCService,
    private readonly orderService: OrderService
  ) {}
  private logger = new Logger(BrokerMessage.name);

  @EventPattern(EventPatternEnum.sync)
  async syncNomenclature(data: SyncData[]) {
    this.logger.log(`EventPattern: ${EventPatternEnum.sync}`);

    for (const { key, result } of data) {
      if (key === 'categories') {
        await this.categoryOneCService.syncCategories(result);
      }
      if (key === 'option_types') {
        // Это размер цвет
        await this.optionsService.syncOptions(result);
      }
      if (key === 'options') {
        // это значения как ни странно
        // console.warn(data.result);

        await this.optionValueService.syncOptionValues(result);
      }
      if (key === 'products') {
        await this.productService.syncProducts(result);
      }
    }
  }

  @EventPattern(EventPatternEnum.syncBalance)
  syncBalances(data: SyncBalanceData) {
    this.logger.log(
      `EventPattern: ${EventPatternEnum.syncBalance}, key: ${data.key}, result: ${data.result?.length}`
    );
  }

  @EventPattern(EventPatternEnum.syncPrice)
  syncPrices(data: SyncPriceData) {
    this.logger.log(
      `EventPattern: ${EventPatternEnum.syncPrice}, key: ${data.key}, result: ${data.result?.length}`
    );
  }

  @EventPattern(EventPatternEnum.updateOrders)
  async updateOrders(orders: StatusOrderMessage[]) {
    this.logger.log(
      `EventPattern: ${EventPatternEnum.updateOrders}, orders: ${orders.length}`
    );
    // console.warn(orders);
    // return;
    for (const order of orders) {
      try {
        const invoiceUrl = await this.orderService.createOrderInvoice(
          order.id,
          order.doc.id,
          order.doc.code
        );
        this.logger.log(
          `Создали инвойс для заказа ${order.id}: ${invoiceUrl}`,
          'api'
        );
      } catch (error) {
        this.logger.error(
          `Ошибка создания заказа для инвойса ${order.id}: ${error.message}`,
          'api'
        );
      }
    }
  }
}
