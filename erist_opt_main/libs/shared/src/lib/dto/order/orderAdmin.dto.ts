import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import { UserDTOForOrder } from '../user';
import { CartInput } from '../card';
import { StateOrder } from '../../types';
import { OrderWithProductsDTO } from './order.dto';

@ObjectType({ description: 'Список заказов' })
export class OrderListAdminDTO {
  @Field(() => [OrderWithProductsDTO], { description: 'Список заказов' })
  orders: OrderWithProductsDTO[];

  @Field(() => Float, { description: 'Количество заказов' })
  total: number;

  constructor(orders: OrderWithProductsDTO[], total: number) {
    this.orders = orders;
    this.total = total;
  }
}

@InputType({ description: 'Инпут для пагинации заказов' })
export class OrdersPaginationAdminDTO {
  @IsOptional()
  @Field(() => Float, {
    nullable: false,
    defaultValue: 1,
    description: 'Номер страницы',
  })
  page: number;

  @IsOptional()
  @Field(() => Float, {
    nullable: false,
    defaultValue: 10,
    description: 'Количество элементов на странице',
  })
  perPage: number;

  constructor(page: number, perPage: number) {
    this.page = page;
    this.perPage = perPage;
  }
}

@InputType({ description: 'Инпут для фильтров заказов' })
export class OrdersFilterAdminDTO {
  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Минимальная цена для фильтрации',
  })
  totalAmountFrom: number;

  @IsOptional()
  @Field(() => Float, {
    nullable: true,
    description: 'Максимальная цена для фильтрации',
  })
  totalAmountTo: number;

  @IsOptional()
  @Field({ nullable: true, description: 'Часть имени продукта для фильтрации' })
  productName: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Поиск по номеру заказа' })
  orderNumber: number;

  @IsOptional()
  @Field({ nullable: true, description: 'Дата от' })
  dateFrom: string;

  @IsOptional()
  @Field({ nullable: true, description: 'Дата до' })
  dateTo: string;

  constructor(
    totalAmountFrom: number,
    totalAmountTo: number,
    productName: string,
    orderNumber: number,
    dateFrom: string,
    dateTo: string
  ) {
    this.totalAmountFrom = totalAmountFrom;
    this.totalAmountTo = totalAmountTo;
    this.productName = productName;
    this.orderNumber = orderNumber;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
