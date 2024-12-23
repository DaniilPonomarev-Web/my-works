import { Resolver, Mutation, Args, Context, ID } from '@nestjs/graphql';
import { OrderService } from './order.service';
import {
  // CreateOrderDTO,
  IPayloadCreateOrder,
  OrderDTO,
  OrderListDTO,
  OrdersFilterDTO,
  OrderWithProductsDTO,
} from '@erist-opt/shared';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

@Resolver(() => OrderDTO)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => OrderDTO)
  async createOrder(
    // @Args('orderInput') orderInput: CreateOrderDTO,
    @Context() context: any
  ): Promise<OrderDTO> {
    const userContext = context.req.user;
    const cart = await this.orderService.getCart(userContext.id);

    const updateDataProducts = await this.orderService.updateDataProducts(
      userContext.id
    );
    if (!updateDataProducts) {
      throw new NotFoundException('Не удалось создать заказ');
    }

    const orderPayload: IPayloadCreateOrder = {
      userId: userContext.id,
      // shippingAddressId: orderInput.shippingAddressId,
      paymentMethod: 'Счет на оплату',
      cart: cart.items,
      totalAmount: cart.totalAmount,
      total: cart.total,
      discount: cart.discount || null,
    };
    const create: OrderDTO = await this.orderService.createOrder(orderPayload);
    if (!create) {
      throw new NotFoundException('Не удалось создать заказ');
    }
    this.orderService.sendOrderConfirmationTelegram(create);
    return create;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => OrderListDTO, { description: 'Получение всех заказов юзера' })
  async getOrdersUsers(
    @Context() context: any,
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
    @Args('offset', { defaultValue: 0, description: ' По умолчанию 0' })
    offset: number,

    @Args('limit', { defaultValue: 10000, description: 'По умолчанию 10000' })
    limit: number,

    @Args('filter', { nullable: true }) filter?: OrdersFilterDTO
  ): Promise<OrderListDTO> {
    const user = context.req.user;

    console.warn(offset);
    console.warn(limit);
    console.warn(filter);

    let userOrders: OrderWithProductsDTO[] =
      await this.orderService.getOrdersByUserId(user.id);

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

    if (sortBy) {
      userOrders.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }

    let startIndex = offset;
    let endIndex = limit;
    if (startIndex >= userOrders.length) {
      startIndex = 0;
    }
    if (endIndex >= userOrders.length || endIndex === 0) {
      endIndex = userOrders.length;
    }

    userOrders = userOrders.slice(startIndex, endIndex);

    const orders: OrderListDTO = {
      orders: userOrders,
      total: userOrders.length,
    };
    return orders;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => OrderWithProductsDTO, {
    description: 'Получение 1 заказа юзера',
  })
  async getOrderById(
    @Context() context: any,
    @Args('orderId', { type: () => ID }) orderId: string
  ): Promise<OrderWithProductsDTO> {
    const user = context.req.user;

    const userOrder: OrderWithProductsDTO | null =
      await this.orderService.getOrderByUserAndOrderId(orderId, user.id);

    if (!userOrder) {
      throw new NotFoundException('Заказ не найден');
    }

    return userOrder;
  }
}
