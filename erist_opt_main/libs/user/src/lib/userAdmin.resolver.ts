import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserAdminService } from './userAdmin.service';
import {
  UserDTO,
  IUser,
  HttpExceptionMessagesGraphQL,
  IUsersResult,
  UsersResultsDTO,
  CustomerRole,
  OrdersPaginationAdminDTO,
  UsersFilterAdminDTO,
  IUserWithoutPass,
  UpdateUserForAdminDto,
  DadataDataDTO,
  SignUpUserInputDTO,
  ICreateUser,
} from '@erist-opt/shared';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { LogsAdminService } from '@erist-opt/logs';
import { UserService } from './user.service';

@UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
@SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
@Resolver(() => UserDTO)
export class UserAdminResolver {
  constructor(
    private readonly userService: UserAdminService,
    private readonly userUserService: UserService,
    private logsAdminService: LogsAdminService
  ) {}

  @Query(() => UserDTO, {
    description: 'Получить пользователя по ID',
  })
  async getUserById(
    @Args('id', { description: 'ID пользователя' }) id: string
  ) {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUser);
    }
    return user;
  }

  @Mutation(() => UsersResultsDTO, {
    name: 'getAllUsers',
    description: 'Получение всех пользователей',
    complexity: 3,
  })
  async getAllUsers(
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

    @Args('filter', { nullable: true }) filter?: UsersFilterAdminDTO
  ) {
    const users: IUser[] = await this.userService.getAllUsers();

    if (!users || users.length === 0) {
      throw new HttpException(
        HttpExceptionMessagesGraphQL.user.notUsers,
        HttpStatus.NOT_FOUND
      );
    }

    let filterUsersData = users;

    if (filter) {
      if (filter.filterStatus !== null) {
        filterUsersData = filterUsersData.filter(
          (item) => item.status === filter.filterStatus
        );
      }
      if (filter.filterPhone) {
        filterUsersData = filterUsersData.filter((item) =>
          item.phone.includes(filter?.filterPhone)
        );
      }

      if (filter.filterName) {
        filterUsersData = filterUsersData.filter((item) =>
          item.name.includes(filter?.filterName)
        );
      }

      if (filter.filterEmail) {
        filterUsersData = filterUsersData.filter((item) =>
          item.email.includes(filter?.filterEmail)
        );
      }
    }

    if (sortBy && sortOrder) {
      filterUsersData = await this.userService.sortUsers(
        filterUsersData,
        sortBy,
        sortOrder
      );
    }
    const totalUsers = filterUsersData.length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    filterUsersData = filterUsersData.slice(startIndex, endIndex);

    const usersData: IUsersResult = {
      users: filterUsersData,
      total: totalUsers,
    };

    return usersData;
  }

  @Mutation(() => UserDTO, {
    description:
      'Изменить статус пользователя (включить/отключить пользователя)',
  })
  async updateUserStatus(
    @Context() context: any,
    @Args('id', { description: 'ID пользователя' }) id: string
  ) {
    const updatedUser = await this.userService.updateUserStatus(id);
    if (!updatedUser) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.user.errorUpdateUserStatusData
      );
    }
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'Users',
      userContext.login,
      `Обновил статус пользователя с id = ${id}`,
      updatedUser
    );
    return updatedUser;
  }

  @SetMetadata('roles', [CustomerRole.Admin])
  @Mutation(() => UserDTO, {
    name: 'updateUserAdmin',
    description: 'Обновление основной информации о пользователе',
  })
  async updateUserAdmin(
    @Context() context: any,
    @Args('updateUserForAdminDto') updateUserForAdminDto: UpdateUserForAdminDto
  ): Promise<IUserWithoutPass> {
    const userUpdated = await this.userService.updateUser(
      updateUserForAdminDto
    );
    if (!userUpdated) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.user.errorUpdateUserData
      );
    }
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'Users',
      userContext.login,
      `Обновил  пользователя с id = ${userUpdated.id}`,
      updateUserForAdminDto
    );
    return userUpdated;
  }

  @SetMetadata('roles', [CustomerRole.Admin])
  @Mutation(() => DadataDataDTO, {
    name: 'getDadataData',
    description:
      'Получает информацию о текущем пользователе, авторизованном через токен.',
  })
  async getDadataData(
    @Args('inn', { description: 'INN пользователя' }) inn: string
  ) {
    const userDaData = await this.userService.getSuggestionDataDadata(inn);

    if (!userDaData) {
      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.dadata);
    }
    console.warn(userDaData.suggestions[0].data);

    return userDaData.suggestions[0].data;
  }

  @SetMetadata('roles', [CustomerRole.Admin])
  @Mutation(() => UserDTO, {
    name: 'createUserAdmin',
    description: 'Регистрирует нового пользователя в системе.',
  })
  async createUserAdmin(
    @Args('createUserAdminInput') createUserAdminInput: SignUpUserInputDTO
  ) {
    const checkUserByPhone: boolean =
      await this.userUserService.checkOneByPhone(createUserAdminInput.phone);

    if (!checkUserByPhone) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.userWithPhoneWasCreated
      );
    }

    const checkUserByEmail: boolean =
      await this.userUserService.checkOneByEmail(
        createUserAdminInput.email.toLowerCase()
      );
    if (!checkUserByEmail) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.userWithEmailWasCreated
      );
    }

    const checkUserByInn: boolean = await this.userUserService.checkOneByInn(
      createUserAdminInput.company.inn.toLowerCase()
    );
    if (!checkUserByInn) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.userWithInnWasCreated
      );
    }

    const newUser: ICreateUser = {
      name: createUserAdminInput.name,
      phone: createUserAdminInput.phone,
      email: createUserAdminInput.email.toLowerCase(),
      password: createUserAdminInput.password,
      secondPassword: createUserAdminInput.secondPassword,
      company: createUserAdminInput.company,
      // addresses: createUserAdminInput.addresses,
    };

    const register = await this.userUserService.createUser(newUser);
    if (!register) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorRegister
      );
    }

    return register;
  }
}
