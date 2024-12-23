import { OrderAdminService } from '@erist-opt/checkout';
import { ProductUserService } from '@erist-opt/product';
import { UserService } from '@erist-opt/user';
import { Injectable } from '@nestjs/common';
import { DashboardDTO } from './DTO/dashboard-admin.dto';

@Injectable()
export class DashboardAdminService {
  constructor(
    private readonly orderService: OrderAdminService,
    private readonly userService: UserService,
    private readonly productService: ProductUserService
  ) {}

  async getDashboard(customerLogin: string): Promise<DashboardDTO> {
    const countOrders = await this.orderService.getOrdersCount();
    const usersCount = await this.userService.getUsersCount();
    const productsCount = await this.productService.getProductsCount();
    const amountOrder = await this.orderService.getTotalAmount();
    const getOrdersForGraph =
      await this.orderService.getOrdersDataForDashboard();
    // console.warn(getOrdersForGraph);

    const data: DashboardDTO = {
      countOrders,
      countUsers: usersCount,
      countProducts: productsCount,
      summOrders: amountOrder,
      customer: customerLogin,
      salesData: getOrdersForGraph,
      // salesData: [
      //   { date: '2024-07-21', amount: 45432 },
      //   { date: '2024-07-26', amount: 60000 },
      //   { date: '2024-07-30', amount: 60000 },
      //   { date: '2024-07-31', amount: 33333 },
      //   { date: '2024-08-01', amount: 80000 },
      //   { date: '2024-08-05', amount: 90000 },
      //   { date: '2024-09-10', amount: 100000 },
      // ],
    };
    return data;
  }
}
