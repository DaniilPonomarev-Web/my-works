import {
  GetOrdersUsersMutation,
  OrdersFilterDto,
} from '@erist-opt/meta-graphql';

export interface SortOptions {
  key: string;
  orderBy: string;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface OrdersUsersParams {
  sort: SortOptions;
  pagination: Pagination;
  filter: OrdersFilterDto;
}

export type OrdersUser = GetOrdersUsersMutation['getOrdersUsers'];
