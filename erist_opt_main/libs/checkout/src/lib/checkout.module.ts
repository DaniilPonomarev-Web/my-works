import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from '@erist-opt/shared';
import { UserModule } from '@erist-opt/user';
import { ProductModule } from '@erist-opt/product';
import { GenerateInvoiceModule } from '@erist-opt/generate-invoice';
import { KafkaModule } from '@erist-opt/kafka';
import { CardModule } from '@erist-opt/card';
import { OrderAdminService } from './orderAdmin.service';
import { OrderAdminResolver } from './orderAdmin.resolver';
import { RabbitModule } from '@erist-opt/rabbit';
import { LogsModule } from '@erist-opt/logs';
import { OptionModule } from '@erist-opt/options';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
    ProductModule,
    GenerateInvoiceModule,
    KafkaModule,
    CardModule,
    RabbitModule,
    LogsModule,
    OptionModule,
  ],
  providers: [
    OrderResolver,
    OrderAdminResolver,
    OrderService,
    OrderAdminService,
  ],
  exports: [OrderService, OrderAdminService],
})
export class CheckoutModule {}
