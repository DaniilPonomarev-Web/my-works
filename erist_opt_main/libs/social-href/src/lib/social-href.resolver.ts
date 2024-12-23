import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { SocialHrefService } from './social-href.service';

import {
  CreateUpdateSocialHrefInputDTO,
  SocialHrefDTO,
  SocialHrefsDataDTO,
  UpdateSocialHrefInputDTO,
} from './dto/social-href.dto';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { CustomerRole, OrdersPaginationAdminDTO } from '@erist-opt/shared';
import { LogsAdminService } from '@erist-opt/logs';

@Resolver(() => SocialHrefDTO)
export class SocialHrefResolver {
  constructor(
    private readonly socialHrefService: SocialHrefService,
    private logsAdminService: LogsAdminService
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [SocialHrefDTO], {
    name: 'getAllSocialHrefsForUser',
    description: 'Социальные сети в футер и может ещё куда-то для пользователя',
  })
  async getAllSocialHrefsForUser(): Promise<SocialHrefDTO[]> {
    return this.socialHrefService.findAllUser();
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Query(() => SocialHrefDTO, {
    name: 'getSocialHref',
    description: 'Социальная сеть для админа',
  })
  async getSocialHref(
    @Args('id', { type: () => ID }) id: string
  ): Promise<SocialHrefDTO> {
    return await this.socialHrefService.find(id);
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Query(() => SocialHrefsDataDTO, {
    name: 'getAllSocialHrefs',
    description: 'Социальные сети в футер и может ещё куда-то для админа',
  })
  async getAllSocialHrefs(
    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO
  ): Promise<SocialHrefsDataDTO> {
    let socialHrefs = await this.socialHrefService.findAll();
    const totalSocialHrefs = socialHrefs.length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    socialHrefs = socialHrefs.slice(startIndex, endIndex);

    const socialHrefsData: SocialHrefsDataDTO = {
      data: socialHrefs,
      total: totalSocialHrefs,
    };
    return socialHrefsData;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => SocialHrefDTO, {
    name: 'createSocialHref',
    description: 'Создание ссылки на соц сети',
  })
  async createSocialHref(
    @Context() context: any,
    @Args('input') input: CreateUpdateSocialHrefInputDTO
  ): Promise<SocialHrefDTO> {
    const newSocialHref = await this.socialHrefService.create(input);
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'SocialHrefs',
      userContext.login,
      `Создал соц ссылку с id = ${newSocialHref.id}`,
      input
    );
    return newSocialHref;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => Boolean, {
    name: 'deleteSocialHref',
    description: 'Удаление соц сети',
  })
  async deleteSocialHref(
    @Context() context: any,
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    const deteleSoc = await this.socialHrefService.delete(id);
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'SocialHrefs',
      userContext.login,
      `Удалил соц ссылку с id = ${id}`,
      {
        id,
      }
    );
    return deteleSoc;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => SocialHrefDTO, {
    name: 'updateSocialHref',
    description: 'Обновление ссылки на соц сеть',
  })
  async updateSocialHref(
    @Context() context: any,
    @Args('input') input: UpdateSocialHrefInputDTO
  ): Promise<SocialHrefDTO> {
    const userContext = context.req.user;

    const updatedSoc = await this.socialHrefService.update(input);
    await this.logsAdminService.createLog(
      'SocialHrefs',
      userContext.login,
      `Обновил соц ссылку с id = ${input.id}`,
      input
    );
    return updatedSoc;
  }
}
