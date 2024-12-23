import { Injectable } from '@nestjs/common';
import { RedisService } from '@erist-opt/redis';
import {
  ICategory,
  IProduct,
  IProductsAndCategories,
  ITransformedProduct,
} from '@erist-opt/shared';
import { RabbitMQService } from '@erist-opt/rabbit';
import { SearchSynonymsService } from '@erist-opt/search-synonyms';

@Injectable()
export class SearchService {
  constructor(
    private readonly redisService: RedisService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly searchSynonymsService: SearchSynonymsService
  ) {}

  /**
   * Делает поиск всех включенных товаров
   * Делает поиск всех включенных категорий
   * Кэширует эти данные
   * @param  Объект со всеми товарами и категориями.
   * @returns {Promise<IProductsAndCategories | null>} Промис с объектом пользователя без пароля или null в случае ошибки.
   */
  async findProductsAndCategories(): // userId: string
  Promise<IProductsAndCategories | null> {
    // const key = 'searchAll' + userId;

    // const cachedData = await this.redisService.getSearchData(key);
    // if (cachedData) {
    //   return cachedData;
    // }
    const products: ITransformedProduct[] | null =
      await this.rabbitMQService.getProductsForSearch();
    const categories: ICategory[] | null =
      await this.rabbitMQService.getCategoriesForSearch();

    if (!products || !categories) {
      return null;
    }

    const data: IProductsAndCategories = {
      products,
      categories,
    };

    // await this.redisService.setSearchData(key, data);
    return data;
  }

  private async getSynonymGroups(): Promise<string[][]> {
    const synonymGroups = await this.searchSynonymsService.getSynonymGroups();
    return synonymGroups;
  }

  /**
   * Фильтрует продукты и категории по строке поиска.
   * @param data Объект, содержащий продукты и категории.
   * @param searchValue Строка поиска.
   * @returns {Promise<IProductsAndCategories>} Промис с объектом, содержащим отфильтрованные продукты и категории.
   *
   * Этот метод фильтрует продукты и категории по указанной строке поиска, проверяя соответствие строки в различных полях продуктов и описаниях категорий.
   */
  async filterProductsAndCategories(
    data: IProductsAndCategories,
    searchValue: string
  ): Promise<IProductsAndCategories> {
    const searchLower = searchValue.toLowerCase();
    const synonymGroups = await this.getSynonymGroups();

    // Найти все синонимы для введенного значения
    const searchValues = new Set<string>();
    synonymGroups.forEach((group) => {
      if (group.includes(searchLower)) {
        group.forEach((syn) => searchValues.add(syn));
      }
    });

    // Добавить само значение поиска в набор
    searchValues.add(searchLower);

    // console.warn(searchValues);

    const searchValuesArray = Array.from(searchValues);

    console.warn(searchValuesArray);

    const filteredProducts = data.products.filter((product) => {
      const {
        model,
        description: { name, parameters, compound, description },
      } = product;
      return searchValuesArray.some(
        (val) =>
          model.toLowerCase().includes(val) ||
          (name && name.toLowerCase().includes(val)) ||
          (parameters && parameters.toLowerCase().includes(val)) ||
          (compound && compound.toLowerCase().includes(val)) ||
          (description && description.toLowerCase().includes(val))
      );
    });

    const filteredCategories = data.categories.filter((category) =>
      category.descriptions.some((description) => {
        const { name, description: desc } = description;
        return searchValuesArray.some(
          (val) =>
            (name && name.toLowerCase().includes(val)) ||
            (desc && desc.toLowerCase().includes(val))
        );
      })
    );

    console.warn(filteredProducts);

    return {
      products: filteredProducts,
      categories: filteredCategories,
    };
  }
}
