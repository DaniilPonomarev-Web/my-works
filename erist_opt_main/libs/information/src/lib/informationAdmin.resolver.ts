import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { InformationService } from './information.service';
import {
  InformationDataDTO,
  InformationDTO,
  InputCreateInformationDTO,
  InputUpdateInformationDTO,
} from './dto/information.dto';
import { SetMetadata, UseGuards } from '@nestjs/common';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { CustomerRole, OrdersPaginationAdminDTO } from '@erist-opt/shared';
import { LogsAdminService } from '@erist-opt/logs';

@Resolver(InformationDTO)
@UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
export class InformationAdminResolver {
  constructor(
    private readonly informationService: InformationService,
    private logsAdminService: LogsAdminService
  ) {}

  @SetMetadata('roles', [
    CustomerRole.Admin,
    CustomerRole.Manager,
    CustomerRole.Context,
  ])
  @Query(() => InformationDataDTO, {
    description: 'Получить все информационные странички',
  })
  async getAllInformations(
    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO
  ): Promise<InformationDataDTO> {
    let informations = await this.informationService.findAll();
    const totalInformations = informations.length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    informations = informations.slice(startIndex, endIndex);

    const socialHrefsData: InformationDataDTO = {
      data: informations,
      total: totalInformations,
    };
    return socialHrefsData;
  }

  @SetMetadata('roles', [
    CustomerRole.Admin,
    CustomerRole.Manager,
    CustomerRole.Context,
  ])
  @Query(() => InformationDTO, {
    description: 'Получить информационную страничку по ID',
  })
  async getInformation(@Args('id') id: string) {
    return this.informationService.findOneById(id);
  }

  @SetMetadata('roles', [
    CustomerRole.Admin,
    CustomerRole.Manager,
    CustomerRole.Context,
  ])
  @Query(() => InformationDTO, {
    description: 'Получить информационную страничку по NAME',
  })
  async getInformationByName(@Args('name') name: string) {
    return this.informationService.findOneByName(name);
  }

  @SetMetadata('roles', [
    CustomerRole.Admin,
    CustomerRole.Manager,
    CustomerRole.Context,
  ])
  @Mutation(() => InformationDTO, {
    description: 'Создать информационную страничку',
  })
  async createInformation(
    @Context() context: any,
    @Args('data') data: InputCreateInformationDTO
  ) {
    const userContext = context.req.user;
    const newInformationPage = await this.informationService.create(data);

    await this.logsAdminService.createLog(
      'Information',
      userContext.login,
      `Создал информационную страницу`,
      newInformationPage
    );
    return newInformationPage;
  }

  @SetMetadata('roles', [
    CustomerRole.Admin,
    CustomerRole.Manager,
    CustomerRole.Context,
  ])
  @Mutation(() => InformationDTO, {
    description: 'Обновить информационную страничку',
  })
  async updateInformation(
    @Context() context: any,
    @Args('data') data: InputUpdateInformationDTO
  ) {
    const userContext = context.req.user;
    const updatedInformationPage = await this.informationService.update(data);

    await this.logsAdminService.createLog(
      'Information',
      userContext.login,
      `Обновил информационную страницу с id = ${updatedInformationPage.id}`,
      updatedInformationPage
    );
    return updatedInformationPage;
  }

  @SetMetadata('roles', [
    CustomerRole.Admin,
    CustomerRole.Manager,
    CustomerRole.Context,
  ])
  @Mutation(() => Boolean, {
    description: 'Удалить информационную страничку',
  })
  async deleteInformation(@Context() context: any, @Args('id') id: string) {
    await this.informationService.delete(id);
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'Information',
      userContext.login,
      `Удалил информационную страницу с id = ${id}`,
      {
        id,
      }
    );
    return true;
  }
}
