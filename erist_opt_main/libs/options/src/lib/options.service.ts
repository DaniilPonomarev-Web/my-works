import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  CreateOptionInput,
  CreateOptionValueForOptionInput,
  IOptionFilter,
  Option,
  OptionFilter,
  ProductOptionValue,
  UpdateOptionValueForOptionInput,
} from '@erist-opt/shared';
import { OptionValue } from '@erist-opt/shared';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(OptionValue)
    private readonly optionValueRepository: Repository<OptionValue>,
    @InjectRepository(OptionFilter)
    private readonly optionFilterRepository: Repository<OptionFilter>,
    @InjectRepository(ProductOptionValue)
    private readonly productOptionValueRepository: Repository<ProductOptionValue>
  ) {}

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
      relations: ['values'],
    });
    if (!option) {
      return null;
    }
    return option;
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

  /**
   * Возвращает массив опций по указанным идентификаторам.
   * @param optionIds Массив идентификаторов опций.
   * @returns {Promise<Option[]>} Промис с массивом объектов опций.
   *
   * Этот метод возвращает массив опций с указанными идентификаторами.
   */
  async getOptionsByIds(optionIds: string[]): Promise<Option[]> {
    return this.optionRepository.findByIds(optionIds);
  }

  /**
   * Создает новую опцию.
   * @param createOptionInput Объект с данными для создания опции.
   * @returns {Promise<Option>} Промис с объектом созданной опции.
   *
   * Этот метод создает новую опцию с указанными значениями и сохраняет её в базе данных.
   */
  async createOption(createOptionInput: CreateOptionInput): Promise<Option> {
    const { name, type, sortOrder, values } = createOptionInput;

    const option = this.optionRepository.create({ name, type, sortOrder });
    await this.optionRepository.save(option);

    if (values && values.length > 0) {
      const optionValues = values.map((value) => {
        const optionValue = this.optionValueRepository.create({ ...value });
        optionValue.option = option; // Устанавливаем ссылку на опцию
        return optionValue;
      });

      await this.optionValueRepository.save(optionValues);
      option.values = optionValues;
    }

    return option;
  }

  /**
   * Создает значения для указанной опции.
   * @param createOptionValueForOptionInput Объект с данными для создания значений опции.
   * @returns {Promise<OptionValue[]>} Промис с массивом созданных значений опции.
   *
   * Этот метод создает значения для указанной опции и сохраняет их в базе данных.
   */
  async createOptionValues(
    createOptionValueForOptionInput: CreateOptionValueForOptionInput
  ): Promise<OptionValue[]> {
    const { optionId, values } = createOptionValueForOptionInput;
    const option = await this.optionRepository.findOne({
      where: { id: optionId },
    });
    if (!option) {
      throw new Error('Option not found');
    }

    const optionValues = values.map((value) =>
      this.optionValueRepository.create({ ...value, option })
    );

    await this.optionValueRepository.save(optionValues);

    return optionValues;
  }

  /**
   * Обновляет значения опции.
   * @param updateOptionValuesInput Объект с данными для обновления значений опции.
   * @returns {Promise<Option>} Промис с массивом обновленных значений опции.
   */
  async updateOptionValues(
    updateOptionValuesInput: UpdateOptionValueForOptionInput
  ): Promise<Option> {
    const { optionId, values } = updateOptionValuesInput;

    // Найти опцию по ID
    const option = await this.optionRepository.findOne({
      where: { id: optionId },
      relations: ['values'],
    });

    if (!option) {
      throw new NotFoundException('Опция не найдена');
    }

    // Найти существующие значения для этой опции
    const existingValues = option.values;

    // Создать мапу существующих значений по их ID для быстрой проверки
    const existingValuesMap = new Map(
      existingValues.map((value) => [value.id, value])
    );

    // Массив для значений, которые нужно удалить
    const valuesToDelete = existingValues.filter(
      (value) =>
        !values.some((newValue) => newValue.id && newValue.id === value.id)
    );

    // Массив для значений, которые нужно добавить или обновить
    const valuesToUpdateOrAdd = values
      .map((newValue) => {
        if (newValue.id) {
          // Если значение существует и его данные изменены, обновляем его
          const existingValue = existingValuesMap.get(newValue.id);

          if (existingValue) {
            if (
              existingValue.name !== newValue.name ||
              existingValue.sortOrder !== newValue.sortOrder ||
              existingValue.colorCode !== newValue.colorCode
            ) {
              Object.assign(existingValue, newValue);
              return existingValue;
            }
            // Если данные не изменились, ничего не делаем
            return null;
          }
        }
        // Если значение не существует или не имеет id, оно новое и должно быть добавлено
        return this.optionValueRepository.create({ ...newValue, option });
      })
      .filter((value) => value !== null);

    // Удалить значения, которые больше не существуют в запросе
    if (valuesToDelete.length > 0) {
      try {
        // Удалить связанные записи в таблице product_option_value
        await this.productOptionValueRepository.delete({
          value: In(valuesToDelete.map((value) => value.id)),
        });

        // Удалить значения опций
        await this.optionValueRepository.remove(valuesToDelete);
      } catch (error) {
        console.error('Error removing values:', error);
        throw new Error(
          'Ошибка при удалении значений опций. Проверьте связи с другими таблицами.'
        );
      }
    }

    // Добавить или обновить значения
    if (valuesToUpdateOrAdd.length > 0) {
      await this.optionValueRepository.save(valuesToUpdateOrAdd);
    }

    const optionNew = await this.optionRepository.findOne({
      where: { id: optionId },
      relations: ['values'],
    });
    if (!optionNew) {
      throw new NotFoundException('Обновленная опция не найдена');
    }
    // Вернуть обновленные значения
    return optionNew;
  }

  /**
   * Удаляет опцию по указанному идентификатору.
   * @param optionId Идентификатор опции.
   * @returns {Promise<void>} Промис без возвращаемого значения.
   *
   * Этот метод удаляет опцию и все её связанные значения по указанному идентификатору.
   */
  async deleteOption(optionId: string): Promise<void> {
    const option = await this.optionRepository.findOne({
      where: { id: optionId },
      relations: ['values'],
    });
    if (!option) {
      throw new NotFoundException('Опция не найдена');
    }

    // Удаляем связанные значения опции
    await this.optionValueRepository.remove(option.values);

    // Удаляем саму опцию
    await this.optionRepository.remove(option);
  }

  /**
   * Удаляет значение опции по указанному идентификатору.
   * @param optionValueId Идентификатор значения опции.
   * @returns {Promise<void>} Промис без возвращаемого значения.
   *
   * Этот метод удаляет значение опции по указанному идентификатору.
   */
  async deleteOptionValue(optionValueId: string): Promise<void> {
    const optionValue = await this.optionValueRepository.findOne({
      where: { id: optionValueId },
    });
    if (!optionValue) {
      throw new NotFoundException('Опция не найдена');
    }

    await this.optionValueRepository.remove(optionValue);
  }

  /**
   * Возвращает все опции с их значениями.
   * @returns {Promise<Option[]>} Промис с массивом объектов опций.
   *
   * Этот метод возвращает все опции из базы данных вместе с их значениями.
   */
  async getAllOptionsWithValues(): Promise<Option[]> {
    return await this.optionRepository.find({
      relations: ['values'],
      order: { sortOrder: 'ASC' },
    });
  }

  /**
   * Возвращает все опцию с ее значениями.
   * @returns {Promise<Option>} Промис с опцией.
   *
   * Этот метод возвращает одну опцию из базы данных вместе с ее значениями.
   */
  async getOptionById(id: string): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where: { id },
      relations: ['values'],
    });
    if (!option) {
      throw new NotFoundException('Опция не найдена');
    }
    return option;
  }

  /**
   * Очищает таблицу фильтров опций для крона.
   * @returns {Promise<void>} Промис без возвращаемого значения.
   *
   * Этот метод очищает все записи в репозитории фильтров опций.
   */
  async clearFilterRepo(): Promise<void> {
    await this.optionFilterRepository.clear();
  }

  /**
   * Сохраняет фильтры опций.
   * @param optionFilter Массив объектов фильтров опций.
   * @returns {Promise<void>} Промис без возвращаемого значения.
   *
   * Этот метод сохраняет массив объектов фильтров опций в базе данных.
   */
  async saveOptionFilters(optionFilter: OptionFilter[]): Promise<void> {
    await this.optionFilterRepository.save(optionFilter);
  }

  /**
   * Возвращает опции для фильтрации.
   * @returns {Promise<IOptionFilter[]>} Промис с массивом объектов фильтров опций.
   *
   * Этот метод возвращает все опции, используемые для фильтрации, из базы данных.
   */
  async getOptionsForFilter(): Promise<IOptionFilter[]> {
    const options = await this.optionFilterRepository.find();
    return options;
  }

  async findOptionValueIdin1c(optionValueProductId: string): Promise<string> {
    // console.warn(optionValueProductId);

    const optionValueId = await this.productOptionValueRepository.findOne({
      where: { id: optionValueProductId },
      relations: ['value'],
    });
    // console.warn(optionValueId);

    if (!optionValueId) {
      throw new NotFoundException('Опция не найдена');
    }

    const optionValue = await this.optionValueRepository.findOne({
      where: { id: optionValueId.value.id },
    });
    if (!optionValue) {
      throw new NotFoundException('Опция не найдена');
    }
    return optionValue.id1c;
  }

  async deleteProductOptionValueByValueId(valueId: string): Promise<void> {
    try {
      const result = await this.productOptionValueRepository.delete({
        value: { id: valueId },
      });

      if (result.affected === 0) {
        throw new Error(`Запись с valueId ${valueId} не найдена`);
      }

      console.log(`Запись с valueId ${valueId} успешно удалена`);
    } catch (error) {
      console.error('Ошибка при удалении записи:', error.message);
      throw new Error('Ошибка при удалении записи');
    }
  }

  async deleteProductOptionValueByValueIds(valueIds: string[]): Promise<void> {
    console.warn(valueIds);

    try {
      // Удаляем записи, где valueId находится в массиве valueIds
      const result = await this.productOptionValueRepository.delete({
        value: { id: In(valueIds) },
      });

      if (result.affected === 0) {
        throw new Error(`Записи с указанными valueIds не найдены`);
      }

      console.log(`Записи с valueIds ${valueIds} успешно удалены`);
    } catch (error) {
      console.error('Ошибка при удалении записей:', error.message);
      throw new Error('Ошибка при удалении записей');
    }
  }
}
