import {
  HttpException,
  HttpStatus,
  NotFoundException,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCustomerDTO,
  CustomerDTO,
  CustomerRole,
  CustomersFilterAdminDTO,
  CustomersResultDTO,
  HttpExceptionMessagesGraphQL,
  ICustomersResult,
  ICustomerWithoutPass,
  OrdersPaginationAdminDTO,
  UpdateCustomerDTO,
} from '@erist-opt/shared';
import { JwtAuthCustomerGuard } from '@erist-opt/jwt-customer';

@Resolver(() => CustomerDTO)
@UseGuards(JwtAuthCustomerGuard)
@SetMetadata('roles', [CustomerRole.Admin])
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => CustomerDTO, {
    name: 'createCustomer',
    description: 'Создание нового пользователя.',
  })
  async createCustomer(
    @Args('createCustomerDto') createCustomerDto: CreateCustomerDTO
  ) {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @Mutation(() => CustomerDTO, {
    name: 'updateCustomer',
    description: 'Обновление существующего пользователя.',
  })
  async updateCustomer(
    @Args('updateCustomerDto') updateCustomerDto: UpdateCustomerDTO
  ) {
    console.warn(updateCustomerDto);

    return this.customerService.updateCustomer(updateCustomerDto);
  }

  @Mutation(() => Boolean, {
    name: 'deleteCustomer',
    description: 'Удаление пользователя по ID.',
  })
  async deleteCustomer(@Args('id') id: string) {
    await this.customerService.deleteCustomer(id);
    return true;
  }

  @Query(() => CustomerDTO, {
    name: 'whoIAmCustomer',
    description:
      'Получает информацию о текущем пользователе админки, авторизованном через токен.',
  })
  async whoIAmCustomer(@Context() context: any) {
    const customer = context.req.user;

    const userData = await this.customerService.findOneById(customer.id);
    if (!userData) {
      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUser);
    }
    return userData;
  }

  @Query(() => CustomerDTO, {
    name: 'getCustomer',
    description: 'Получает информацию о пользователе админки',
  })
  async getCustomer(
    @Args('id', { description: 'ID пользователя админки' }) id: string
  ) {
    const userData = await this.customerService.findOneById(id);
    if (!userData) {
      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUser);
    }
    return userData;
  }

  @Query(() => CustomersResultDTO, {
    name: 'getAllCustomers',
    description: 'Получение всех Customers',
  })
  async getAllCustomers(
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

    @Args('filter', { nullable: true }) filter?: CustomersFilterAdminDTO
  ) {
    const customers: ICustomerWithoutPass[] =
      await this.customerService.getAllCustomers();

    if (customers.length === 0) {
      throw new HttpException(
        HttpExceptionMessagesGraphQL.user.notUsers,
        HttpStatus.NOT_FOUND
      );
    }

    let filterCustomersData = customers;

    if (filter) {
      if (filter.filterLogin) {
        filterCustomersData = filterCustomersData.filter((item) =>
          item.login.includes(filter?.filterLogin)
        );
      }

      if (filter.filterEmail) {
        filterCustomersData = filterCustomersData.filter((item) =>
          item.email.includes(filter?.filterEmail)
        );
      }
    }

    if (sortBy && sortOrder) {
      filterCustomersData = await this.customerService.sortUsers(
        filterCustomersData,
        sortBy,
        sortOrder
      );
    }
    const totalUsers = filterCustomersData.length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    filterCustomersData = filterCustomersData.slice(startIndex, endIndex);

    const usersData: ICustomersResult = {
      customers: filterCustomersData,
      total: totalUsers,
    };

    return usersData;
  }
}
