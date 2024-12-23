import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICreateOptionValueOneC,
  IUpdateOptionValueOneC,
  Option,
} from '@erist-opt/shared';
import { OptionValue } from '@erist-opt/shared';
import { OptionOneCService } from './optionsOneC.service';

@Injectable()
export class OptionValuesOneCService {
  constructor(
    private readonly optionOneCService: OptionOneCService,
    @InjectRepository(OptionValue)
    private readonly optionValueRepository: Repository<OptionValue>
  ) {}

  async syncOptionValues(syncOptionValues: any[]) {
    // обрабатываем занения опций

    let sortOrder = 0;
    for (const optionValue of syncOptionValues) {
      sortOrder++;
      try {
        await this.upsertOptionValue(optionValue, sortOrder);
        console.log(`add optionValue ${optionValue.id1c} processed`);
      } catch (error) {
        console.error(
          `Error processing optionValue ${optionValue.id1c}:`,
          error.message
        );
      }
      await this.delay(100); // Задержка
    }
  }

  private async upsertOptionValue(optionValue: any, sortOrder: number) {
    const existingOption = await this.optionOneCService.findOneOptionById1c(
      optionValue.optionTypeId
    );

    if (!existingOption) {
      return null;
    }
    const optionId = existingOption.id; // ИД Опции уже существующей

    const existingOptionValue = await this.findOneOptionValueById1c(
      optionValue.id1c
    );

    if (!existingOptionValue) {
      await this.createOption(optionValue, optionId, sortOrder);
    }
    await this.updateOption(optionValue, sortOrder);
  }

  private async updateOption(option: any, sortOrder: number) {
    const optionValueIdInBase = await this.findOneOptionValueById1c(
      option.id1c
    );

    if (!optionValueIdInBase) {
      return;
    }
    const optionUpdate: IUpdateOptionValueOneC = {
      id1c: option.id1c,
      name: option.name,
      sortOrder: sortOrder,
    };

    try {
      console.log(
        'Updating optionValue with data:',
        optionUpdate,
        optionValueIdInBase.id
      );
      await this.updateOptionBase(optionValueIdInBase.id, optionUpdate);
    } catch (error) {
      console.error('Error updating optionValue:', error.message);
      throw error;
    }
  }

  private async createOption(option: any, optionId: string, sortOrder: number) {
    const optionInsert: ICreateOptionValueOneC = {
      optionId: optionId, // Id Опции (Размера)
      id1c: option.id1c,
      name: option.name,
      colorCode: option.colorCode,
      sortOrder: sortOrder,
    };

    try {
      console.log('Inserting optionValue with data:', optionInsert);
      await this.createOptionValueBase(optionInsert);
    } catch (error) {
      console.error('Error creating optionValue:', error.message);
      throw error;
    }
  }

  /**
   * Возвращает значение опции по указанному идентификатору.
   * @param id Идентификатор значения опции.
   * @returns {Promise<OptionValue | null>} Промис с объектом значения опции или null, если не найдено.
   *
   * Этот метод возвращает значение опции с указанным идентификатором.
   */
  async findOneOptionValue(id: string): Promise<OptionValue | null> {
    const option = await this.optionValueRepository.findOne({
      where: { id: id },
    });
    if (!option) {
      return null;
    }
    return option;
  }
  async findOneOptionValueById1c(id1c: string): Promise<OptionValue | null> {
    const optionValue = await this.optionValueRepository.findOne({
      where: { id1c: id1c },
      relations: ['option'],
    });
    if (!optionValue) {
      return null;
    }
    // console.warn(optionValue);

    return optionValue;
  }

  /**
   * Создает значения для указанной опции.
   * @param createOptionValueForOptionInput Объект с данными для создания значений опции.
   * @returns {Promise<OptionValue[]>} Промис с массивом созданных значений опции.
   *
   * Этот метод создает значения для указанной опции и сохраняет их в базе данных.
   */
  async createOptionValueBase(
    payload: ICreateOptionValueOneC
  ): Promise<OptionValue> {
    const { id1c, name, sortOrder } = payload;
    const optionId = payload.optionId;
    const option = await this.optionOneCService.findOneOption(optionId);
    if (!option) {
      throw new Error(`Опция c id ${optionId} не найдена `);
    }

    const optionValue = this.optionValueRepository.create({
      ...payload,
      option,
    });

    await this.optionValueRepository.save(optionValue);

    return optionValue;
  }

  async updateOptionBase(
    id: string,
    payload: IUpdateOptionValueOneC
  ): Promise<OptionValue> {
    const { name, id1c, sortOrder } = payload;

    // Находим значение опции по ID
    const optionValue = await this.findOneOptionValueById1c(id1c);

    if (!optionValue) {
      throw new Error(`Опция с ${id} не найдена`);
    }

    // Обновляем занчения опции
    optionValue.id1c = id1c;
    optionValue.name = name;
    optionValue.sortOrder = sortOrder;
    optionValue.colorCode = null;

    // Сохраняем обновленное значение опции
    await this.optionValueRepository.save(optionValue);

    return optionValue;
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
