import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { MainPageBlockService } from './main-page-block.service';
import {
  CreateMainPageBlockInputDTO,
  CustomerRole,
  IMainPageBlock,
  MainPageBlockDTO,
  UpdateMainPageBlockInputDTO,
  IdMainPageBlockInputDTO,
  OrdersPaginationAdminDTO,
  MainPageBlockListDTO,
  IMainPageBlockList,
} from '@erist-opt/shared';
import { SetMetadata, UseGuards } from '@nestjs/common';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { LogsAdminService } from '@erist-opt/logs';

@Resolver(() => MainPageBlockListDTO)
export class MainPageBlockAdminResolver {
  constructor(
    private readonly mainPageBlockService: MainPageBlockService,
    private logsAdminService: LogsAdminService
  ) {}

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Query(() => MainPageBlockListDTO, {
    name: 'mainPageBlocks',
    description: 'Запрос всех блоков',
  })
  async findAll(
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
    pagination: OrdersPaginationAdminDTO
  ): Promise<IMainPageBlockList> {
    const blocks = await this.mainPageBlockService.findAll();

    let blocksAdmin = blocks;

    if (sortBy) {
      blocksAdmin.sort((a, b) => {
        if (sortOrder.toLowerCase() === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }
    const total = blocksAdmin.length;
    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    blocksAdmin = blocksAdmin.slice(startIndex, endIndex);

    const blocksAdminList: MainPageBlockListDTO = {
      blocks: blocksAdmin,
      total: total,
    };
    return blocksAdminList;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => MainPageBlockDTO, {
    name: 'createMainPageBlock',
    description: 'Создание нового блока',
  })
  async createMainPageBlock(
    @Context() context: any,
    @Args('createMainPageBlockInput')
    createMainPageBlockInput: CreateMainPageBlockInputDTO
  ): Promise<IMainPageBlock> {
    const block = await this.mainPageBlockService.create(
      createMainPageBlockInput
    );

    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'MainPageBlock',
      userContext.login,
      `Создал блок товаров с id = ${block.id}`,
      block
    );

    return block;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Query(() => MainPageBlockDTO, {
    name: 'getMainPageBlock',
    description: 'Запрос по id одного блока',
  })
  async getMainPageBlock(
    @Args('IdMainPageBlockInputDTO')
    IdMainPageBlockInputDTO: IdMainPageBlockInputDTO
  ): Promise<IMainPageBlock> {
    const block = await this.mainPageBlockService.findOne(
      IdMainPageBlockInputDTO.id
    );
    return block;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => MainPageBlockDTO, {
    name: 'updateMainPageBlock',
    description: 'Обновление блока',
  })
  async updateMainPageBlock(
    @Context() context: any,
    @Args('updateMainPageBlockInput')
    updateMainPageBlockInput: UpdateMainPageBlockInputDTO
  ): Promise<IMainPageBlock> {
    const block = await this.mainPageBlockService.update(
      updateMainPageBlockInput.id,
      updateMainPageBlockInput
    );
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'MainPageBlock',
      userContext.login,
      `Обновил блок товаров с id = ${block.id}`,
      block
    );
    return block;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => [MainPageBlockDTO], {
    name: 'removeMainPageBlock',
    description: 'Удаление блока по id',
  })
  async removeMainPageBlock(
    @Context() context: any,
    @Args('IdMainPageBlockInputDTO')
    IdMainPageBlockInputDTO: IdMainPageBlockInputDTO
  ): Promise<IMainPageBlock[]> {
    const blocks = await this.mainPageBlockService.remove(
      IdMainPageBlockInputDTO.id
    );
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'MainPageBlock',
      userContext.login,
      `Удалил блок товаров с id = ${IdMainPageBlockInputDTO.id}`,
      {
        IdMainPageBlockInputDTO,
      }
    );

    return blocks;
  }
}
