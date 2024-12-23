import { Resolver, Mutation, Args, Query, ID, Context } from '@nestjs/graphql';
import { OptionService } from './options.service';
import {
  CreateOptionInput,
  CreateOptionValueForOptionInput,
  OptionDTO,
  OptionFilterDTO,
  OptionsListDTO,
  OptionValueDTO,
  OrdersPaginationAdminDTO,
  UpdateOptionValueForOptionInput,
} from '@erist-opt/shared';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';
import { LogsAdminService } from '@erist-opt/logs';

@Resolver(() => OptionDTO)
export class OptionResolver {
  constructor(
    private readonly optionService: OptionService,
    private logsAdminService: LogsAdminService
  ) {}

  @Mutation(() => OptionDTO, {
    description: 'Создать опцию',
  })
  async createOption(
    @Args('createOptionInput') createOptionInput: CreateOptionInput
  ): Promise<OptionDTO> {
    return this.optionService.createOption(createOptionInput);
  }

  @Mutation(() => [OptionValueDTO], {
    description: 'Создать значения опции',
  })
  async createOptionValues(
    // @Context() context: any,
    @Args('createOptionValueForOptionInput')
    createOptionValueForOptionInput: CreateOptionValueForOptionInput
  ): Promise<OptionValueDTO[]> {
    const newOption = await this.optionService.createOptionValues(
      createOptionValueForOptionInput
    );
    // const userContext = context.req.user;
    // await this.logsAdminService.createLog(
    //   'OptionsValues',
    //   userContext.login,
    //   `Cоздал значения для опции с id = ${createOptionValueForOptionInput.optionId}`,
    //   createOptionValueForOptionInput
    // );
    return newOption;
  }

  @Mutation(() => OptionDTO, {
    description: 'Обновить значения опции',
  })
  async updateOptionValues(
    @Context() context: any,
    @Args('updateOptionValuesInput')
    updateOptionValuesInput: UpdateOptionValueForOptionInput
  ): Promise<OptionDTO> {
    // const userContext = context.req.user;
    const updatedOptionValues = await this.optionService.updateOptionValues(
      updateOptionValuesInput
    );
    // await this.logsAdminService.createLog(
    //   'OptionsValues',
    //   userContext.login,
    //   `Обновил значения для опции с id = ${updateOptionValuesInput.optionId}`,
    //   updateOptionValuesInput
    // );
    return updatedOptionValues;
  }

  @Mutation(() => Boolean, {
    description: 'Удалить опцию со всеми значениями',
  })
  async deleteOption(
    @Context() context: any,
    @Args('optionId', { type: () => ID }) optionId: string
  ): Promise<boolean> {
    // const userContext = context.req.user;
    await this.optionService.deleteOption(optionId);
    // await this.logsAdminService.createLog(
    //   'Options',
    //   userContext.login,
    //   `Удалил опцию и все значения | id = ${optionId}`,
    //   {
    //     optionId,
    //   }
    // );
    return true;
  }

  @Query(() => OptionDTO, {
    description: 'Получить опцию по идентификатору',
  })
  async getOptionById(
    @Args('id', { type: () => String }) id: string
  ): Promise<OptionDTO> {
    return this.optionService.getOptionById(id);
  }

  @Query(() => OptionsListDTO, {
    description: 'Получить все опции со значениями',
  })
  async getAllOptionsWithValues(
    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO
  ): Promise<OptionsListDTO> {
    const options = await this.optionService.getAllOptionsWithValues();
    let optionsAdmin = options;
    const total = optionsAdmin.length;
    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    optionsAdmin = optionsAdmin.slice(startIndex, endIndex);

    const optionsAdminList: OptionsListDTO = {
      options: optionsAdmin,
      total: total,
    };

    return optionsAdminList;
  }

  @Mutation(() => Boolean, {
    description: 'Удалить значение опции',
  })
  async deleteOptionValue(
    @Context() context: any,
    @Args('optionValueId', { type: () => ID }) optionValueId: string
  ): Promise<boolean> {
    // const userContext = context.req.user;
    await this.optionService.deleteOptionValue(optionValueId);
    // await this.logsAdminService.createLog(
    //   'OptionsValues',
    //   userContext.login,
    //   `Удалил значение опции с id = ${optionValueId}`,
    //   { optionValueId }
    // );
    return true;
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => [OptionFilterDTO], {
    description: 'Получить акутальные опции для фильтра',
  })
  async getOptionsForFilter(): Promise<OptionFilterDTO[]> {
    return this.optionService.getOptionsForFilter();
  }
}
