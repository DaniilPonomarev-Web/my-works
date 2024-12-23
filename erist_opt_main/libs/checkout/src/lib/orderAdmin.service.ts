import {
  formatDateOrderForDashbord,
  Order,
  OrderWithProductsDTO,
} from '@erist-opt/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from './order.service';

@Injectable()
export class OrderAdminService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderService: OrderService
  ) {}

  async findOrderById(orderId: string): Promise<OrderWithProductsDTO | null> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return null;
    }

    const normalizedOrder = await this.orderService.normalizeOrder(order);
    return normalizedOrder;
  }

  async findOrderCurrentIDById(orderId: string): Promise<number | null> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select('order.currentID')
      .where('order.id = :orderId', { orderId })
      .getRawOne();

    // console.warn(result);

    if (!result) {
      return null;
    }
    return result.order_currentID;
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    const result = await this.orderRepository.delete(orderId);
    return !!result.affected && result.affected > 0;
  }

  async getOrders(): Promise<OrderWithProductsDTO[]> {
    const orders = await this.orderRepository.find({
      order: {
        currentID: 'DESC',
      },
    });

    const normalizedOrders = await Promise.all(
      orders.map((order) => this.orderService.normalizeOrder(order))
    );

    const data = normalizedOrders.filter(
      (order): order is OrderWithProductsDTO => order !== null
    );

    return data;
  }

  async getOrdersCount(): Promise<number> {
    const ordersCount = await this.orderRepository.count();
    return ordersCount;
  }

  async getOrdersDataForDashboard(): Promise<any> {
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .select('order.registred', 'date')
      .addSelect('order.totalAmount', 'totalAmount')
      .getRawMany();
    return orders.map((order) => ({
      date: formatDateOrderForDashbord(order.date),
      amount: order.totalAmount,
    }));
  }

  async getTotalAmount(): Promise<number> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalAmount)', 'totalAmount')
      .getRawOne();
    return parseFloat(result.totalAmount || '0');
  }
}
