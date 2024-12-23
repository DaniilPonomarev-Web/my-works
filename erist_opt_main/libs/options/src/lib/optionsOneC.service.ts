import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICreateOptionOneC,
  IUpdateOptionOneC,
  Option,
} from '@erist-opt/shared';

@Injectable()
export class OptionOneCService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>
  ) {}

  async syncOptions(syncOptions: any[]) {
    // обрабатываем опции
    let sortOrder = 0;
    for (const option of syncOptions) {
      sortOrder++;
      try {
        await this.upsertOption(option, sortOrder);
        console.log(`add option ${option.id1c} processed`);
      } catch (error) {
        console.error(`Error processing option ${option.id1c}:`, error.message);
      }
      await this.delay(100); // Задержка
    }
  }

  private async upsertOption(option: any, sortOrder: number) {
    const existingOption = await this.findOneOptionById1c(option.id1c);

    if (!existingOption) {
      await this.createOption(option, sortOrder);
    }
    await this.updateOption(option, sortOrder);
  }

  private async updateOption(option: any, sortOrder: number) {
    const optionIdInBase = await this.findOneOptionById1c(option.id1c);

    if (!optionIdInBase) {
      return;
    }
    const optionUpdate: IUpdateOptionOneC = {
      id1c: option.id1c,
      name: option.name,
      type: option.type,
      sortOrder: sortOrder,
    };

    try {
      console.log(
        'Updating option with data:',
        optionUpdate,
        optionIdInBase.id
      );
      await this.updateOptionBase(optionIdInBase.id, optionUpdate);
    } catch (error) {
      console.error('Error updating option:', error.message);
      throw error;
    }
  }

  private async createOption(option: any, sortOrder: number) {
    const optionInsert: ICreateOptionOneC = {
      id1c: option.id1c,
      name: option.name,
      type: option.type || 'radio',
      sortOrder: sortOrder,
    };

    try {
      console.log('Inserting option with data:', optionInsert);
      await this.createOptionBase(optionInsert);
    } catch (error) {
      console.error('Error creating option:', error.message);
      throw error;
    }
  }

  /**
   * Возвращает опцию по указанному идентификатору.
   * @param id Идентификатор опции.
   * @returns {Promise<Option | null>} Промис с объектом опции или null, если не найдено.
   *
   * Этот метод возвращает опцию с указанным идентификатором вместе с её значениями.
   */
  async findOneOption(id: string): Promise<Option | null> {
    const option = await this.optionRepository.findOne({
      where: { id: id },
    });
    if (!option) {
      return null;
    }
    return option;
  }
  async findOneOptionById1c(id1s: string): Promise<Option | null> {
    const option = await this.optionRepository.findOne({
      where: { id1c: id1s },
    });
    if (!option) {
      return null;
    }
    return option;
  }
  async findOneOptionById1cWithValues(id1s: string): Promise<Option | null> {
    const option = await this.optionRepository.findOne({
      where: { id1c: id1s },
      relations: ['values'],
    });
    if (!option) {
      return null;
    }
    return option;
  }

  /**
   * Создает новую опцию.
   * @param createOptionInput Объект с данными для создания опции.
   * @returns {Promise<Option>} Промис с объектом созданной опции.
   *
   * Этот метод создает новую опцию с указанными значениями и сохраняет её в базе данных.
   */
  async createOptionBase(
    createOptionInput: ICreateOptionOneC
  ): Promise<Option> {
    const { name, type, sortOrder, id1c } = createOptionInput;
    const option = this.optionRepository.create({
      id1c,
      name,
      type,
      sortOrder,
    });
    await this.optionRepository.save(option);
    return option;
  }

  async updateOptionBase(
    id: string,
    updateOptionInput: IUpdateOptionOneC
  ): Promise<Option> {
    const { name, type, sortOrder, id1c } = updateOptionInput;

    // Находим опцию по ID
    const option = await this.optionRepository.findOneBy({ id: id });

    if (!option) {
      throw new Error(`Опция с ${id} не найдена`);
    }

    // Обновляем поля опции
    option.name = name;
    option.type = type;
    option.sortOrder = sortOrder;
    option.id1c = id1c;

    // Сохраняем обновленную опцию
    await this.optionRepository.save(option);

    return option;
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
