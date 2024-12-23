import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SalesDataDTO {
  @Field()
  date: string;

  @Field()
  amount: number;
}

@ObjectType({ description: 'Данные для админ панели' })
export class DashboardDTO {
  @Field(() => Float, { description: 'всего заказов' })
  countOrders: number;

  @Field(() => Float, { description: 'Всего покупателей' })
  countUsers: number;

  @Field(() => Float, { description: 'Всего товаров' })
  countProducts: number;

  @Field(() => Float, { description: 'Сумма заказов' })
  summOrders: number;

  @Field(() => String, { description: 'User Login' })
  customer: string;

  @Field(() => [SalesDataDTO])
  salesData: SalesDataDTO[];

  constructor(
    countOrders: number,
    countUsers: number,
    countProducts: number,
    summOrders: number,
    customer: string,
    salesData: SalesDataDTO[]
  ) {
    this.countOrders = countOrders;
    this.countUsers = countUsers;
    this.countProducts = countProducts;
    this.summOrders = summOrders;
    this.customer = customer;
    this.salesData = salesData;
  }
}
