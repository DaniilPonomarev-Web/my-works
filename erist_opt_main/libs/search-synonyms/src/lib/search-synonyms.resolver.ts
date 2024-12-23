import { Resolver, Mutation, Query, Args, ID, Context } from '@nestjs/graphql';
import { SearchSynonymsService } from './search-synonyms.service';
import {
  CreateSynonymGroupDto,
  CustomerRole,
  ISynonymGroupList,
  OrdersPaginationAdminDTO,
  SynonymGroupDto,
  SynonymGroupFilterAdminDTO,
  SynonymGroupListDto,
  UpdateSynonymGroupDto,
} from '@erist-opt/shared';
import {
  HttpException,
  HttpStatus,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { LogsAdminService } from '@erist-opt/logs';

@UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
@SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
@Resolver(() => SynonymGroupDto)
export class SearchSynonymsResolver {
  constructor(
    private readonly searchSynonymsService: SearchSynonymsService,
    private logsAdminService: LogsAdminService
  ) {}

  @Mutation(() => SynonymGroupDto, {
    name: 'createSynonymGroup',
    description: 'Создание группы синонимов',
  })
  async createSynonymGroup(
    @Context() context: any,
    @Args('createSynonymGroupDto') createSynonymGroupDto: CreateSynonymGroupDto
  ) {
    const newGroup = await this.searchSynonymsService.createSynonymGroup(
      createSynonymGroupDto
    );
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'SynonymsGroup',
      userContext.login,
      `Создал группу синонимов с id = ${newGroup.id}`,
      newGroup
    );
    return newGroup;
  }

  @Mutation(() => SynonymGroupDto, {
    name: 'updateSynonymGroup',
    description: 'Обновление группы синонимов',
  })
  async updateSynonymGroup(
    @Context() context: any,
    @Args('updateSynonymGroupDto') updateSynonymGroupDto: UpdateSynonymGroupDto
  ) {
    const updatedGroup = await this.searchSynonymsService.updateSynonymGroup(
      updateSynonymGroupDto
    );
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'SynonymsGroup',
      userContext.login,
      `Обновил группу синонимов с id = ${updatedGroup.id}`,
      updatedGroup
    );
    return updatedGroup;
  }

  @Mutation(() => Boolean, {
    name: 'deleteSynonymGroup',
    description: 'Удалить группу синонимов по ID',
  })
  async deleteSynonymGroup(
    @Context() context: any,
    @Args('id', { type: () => ID }) id: string
  ) {
    const deletedGroup = await this.searchSynonymsService.deleteSynonymGroup(
      id
    );
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'SynonymsGroup',
      userContext.login,
      `Удалил группу синонимов с id = ${id}`,
      {
        id,
      }
    );
    return deletedGroup;
  }

  @Query(() => SynonymGroupListDto, {
    name: 'getAllSynonymGroups',
    description: 'Получить все группы синонимов',
  })
  async getAllSynonymGroups(
    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO,
    @Args('filter', { nullable: true }) filter?: SynonymGroupFilterAdminDTO
  ) {
    const synonyms = await this.searchSynonymsService.getAllSynonymGroups();
    if (!synonyms) {
      throw new HttpException(
        'Группы синонимов не найдены',
        HttpStatus.NOT_FOUND
      );
    }
    let filterSymonymsData = synonyms;

    if (filter) {
      if (filter.synonym !== null) {
        filterSymonymsData = filterSymonymsData.filter((item) =>
          item.synonyms.includes(filter.synonym)
        );
      }
    }
    const totalSynonymsGroups = filterSymonymsData.length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;
    filterSymonymsData = filterSymonymsData.slice(startIndex, endIndex);

    const usersData: ISynonymGroupList = {
      data: filterSymonymsData,
      total: totalSynonymsGroups,
    };

    return usersData;
  }

  @Query(() => SynonymGroupDto, {
    name: 'getSynonymGroupById',
    description: 'Получить одну группу синонимов по ID',
  })
  async getSynonymGroupById(@Args('id', { type: () => ID }) id: string) {
    return await this.searchSynonymsService.getSynonymGroupById(id);
  }
}
