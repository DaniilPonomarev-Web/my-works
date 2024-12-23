import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { DashboardAdminService } from './dashboard-admin.service';
import { DashboardDTO } from './DTO/dashboard-admin.dto';
import { ICustomer } from '@erist-opt/shared';

@UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
@Resolver(() => DashboardDTO)
export class DashboardAdminResolver {
  constructor(private readonly dasgboardService: DashboardAdminService) {}

  @Query(() => DashboardDTO, {
    name: 'getDashbord',
    description: 'Получение дашборда для админки',
  })
  async getDashbord(@Context() context: any) {
    const customer: ICustomer = context.req.user;

    const dashboard: DashboardDTO = await this.dasgboardService.getDashboard(
      customer.login
    );

    return dashboard;
  }
}
