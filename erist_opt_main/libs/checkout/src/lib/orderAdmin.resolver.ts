import { Resolver, Mutation, Args, Context, ID } from '@nestjs/graphql';
import { OrderService } from './order.service';
import {
  ActionOrder,
  CustomerRole,
  ICustomer,
  OrderDTO,
  OrderListDTO,
  OrdersFilterAdminDTO,
  OrdersPaginationAdminDTO,
  OrderWithProductsDTO,
  StateOrder,
} from '@erist-opt/shared';
import { NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';

import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { OrderAdminService } from './orderAdmin.service';
import { LogsAdminService } from '@erist-opt/logs';
dayjs.extend(customParseFormat);

@UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
@Resolver(() => OrderDTO)
export class OrderAdminResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderAdminService: OrderAdminService,
    private logsAdminService: LogsAdminService
  ) {}

  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => OrderListDTO, {
    name: 'getOrdersUsersAdmin',
    description: 'Получение всех заказов',
  })
  async getOrdersUsersAdmin(
    @Args('sortBy', {
      nullable: true,
      defaultValue: 'sortOrder',
      description: 'параметр сортировки по полю',
    })
    sortBy: string,

    @Args('sortOrder', {
      nullable: true,
      defaultValue: 'ASC',
      description: 'параметр порядка сортировки',
    })
    sortOrder: string,

    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO,

    @Args('filter', { nullable: true }) filter?: OrdersFilterAdminDTO
  ): Promise<OrderListDTO> {
    let userOrders: OrderWithProductsDTO[] =
      await this.orderAdminService.getOrders();

    if (filter) {
      if (filter.totalAmountFrom) {
        userOrders = userOrders.filter(
          (order) => order.totalAmount >= filter.totalAmountFrom
        );
      }
      if (filter.totalAmountTo) {
        userOrders = userOrders.filter(
          (order) => order.totalAmount <= filter.totalAmountTo
        );
      }
      if (filter.productName) {
        userOrders = userOrders.filter((order) =>
          order.products.some((product) =>
            product.name.includes(filter.productName)
          )
        );
      }
      if (filter.orderNumber) {
        userOrders = userOrders.filter(
          (order) => order.currentID === filter.orderNumber
        );
      }
      if (filter.dateFrom) {
        userOrders = userOrders.filter((order) => {
          const orderDate = dayjs(order.registred, 'DD.MM.YYYY');
          const fromDate = dayjs(filter.dateFrom, 'DD.MM.YYYY');
          return (
            orderDate.isSame(fromDate, 'day') ||
            orderDate.isAfter(fromDate, 'day')
          );
        });
      }
      if (filter.dateTo) {
        userOrders = userOrders.filter((order) => {
          const orderDate = dayjs(order.registred, 'DD.MM.YYYY');
          const toDate = dayjs(filter.dateTo, 'DD.MM.YYYY');
          return (
            orderDate.isSame(toDate, 'day') || orderDate.isBefore(toDate, 'day')
          );
        });
      }
    }

    console.warn(sortBy);

    if (sortBy) {
      userOrders.sort((a, b) => {
        if (sortOrder.toLowerCase() === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }

    const totalOrders = userOrders.length;
    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    userOrders = userOrders.slice(startIndex, endIndex);

    const orders: OrderListDTO = {
      orders: userOrders,
      total: totalOrders,
    };
    return orders;
  }

  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => OrderWithProductsDTO, {
    description: 'Обновление статуса заказа',
  })
  async updateOrderStatus(
    @Args('orderId', { type: () => ID }) orderId: string,
    @Args('newState', { type: () => StateOrder }) newState: StateOrder,
    @Context() context: any
  ): Promise<OrderWithProductsDTO> {
    const customer: ICustomer = context.req.user;

    const updatedOrder: OrderWithProductsDTO | null =
      await this.orderService.updateOrderStatus(orderId, newState);
    if (!updatedOrder) {
      throw new NotFoundException('Ошибка обновления статуса заказа');
    }
    const action: ActionOrder = ActionOrder.Update;
    this.orderService.sendOrderEditConfirmation(
      customer,
      action,
      updatedOrder.currentID,
      updatedOrder.state
    );
    await this.logsAdminService.createLog(
      'Orders',
      customer.login,
      `Обновил статус заказа с id = ${orderId} на ${newState}`,
      updatedOrder
    );
    return updatedOrder;
  }

  @SetMetadata('roles', [CustomerRole.Admin])
  @Mutation(() => Boolean, {
    description: 'Удаление заказа по ID',
  })
  async deleteOrder(
    @Args('orderId', { type: () => ID }) orderId: string,
    @Context() context: any
  ): Promise<boolean> {
    const customer: ICustomer = context.req.user;

    const currentID = await this.orderAdminService.findOrderCurrentIDById(
      orderId
    );
    console.warn(currentID);

    if (!currentID) {
      throw new NotFoundException(`Заказ с ID ${orderId} не найден`);
    }
    const result = await this.orderService.deleteOrder(orderId);
    if (!result) {
      throw new NotFoundException(`Заказ с ID ${orderId} не найден`);
    }
    const action: ActionOrder = ActionOrder.Delete;
    this.orderService.sendOrderEditConfirmation(customer, action, currentID);
    await this.logsAdminService.createLog(
      'Orders',
      customer.login,
      `Удалил заказ с id = ${orderId} `,
      {
        orderCurrentId: currentID,
      }
    );
    return true;
  }

  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => OrderWithProductsDTO, {
    description: 'Получение 1 заказа для админа',
  })
  async getOrderByIdAdmin(
    @Args('orderId', { type: () => ID }) orderId: string
  ): Promise<OrderWithProductsDTO> {
    const order: OrderWithProductsDTO | null =
      await this.orderAdminService.findOrderById(orderId);

    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    return order;
  }
}
