import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppLoggerLoki } from '@erist-opt/logs';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { HttpExceptionMessagesGraphQL, ICategory } from '@erist-opt/shared';
import { CacheCategoryService } from '@erist-opt/redis';

@Injectable()
export class CategoryUserService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private AppLoggerLoki: AppLoggerLoki,
    private readonly cacheCategoryService: CacheCategoryService
  ) {}

  /**
   * Возвращает категорию по ID.
   * @param id ID категории.
   * @returns Найденная категория или null, если категория не найдена.
   */
  async getCategoryById(id: string): Promise<ICategory | null> {
    const key = `cat_${id}`;
    const categoryCache = await this.cacheCategoryService.getCategory(key);
    if (categoryCache) {
      return categoryCache;
    }
    const category = await this.categoryRepository.findOne({
      where: { id, status: true },
      relations: ['descriptions', 'children', 'children.descriptions'],
    });
    if (!category) {
      this.AppLoggerLoki.error(
        `Пользователь не смог получить категорию по ID=${id}`,
        'api'
      );
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notError
      );
    }
    if (category.status === false) {
      this.AppLoggerLoki.error(
        `Пользователь не смог получить категорию по ID=${id} потому что она выключена`,
        'api'
      );
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.category.notStatue
      );
    }
    const filteredCategory = await this.filterCategory(category);

    if (filteredCategory) {
      await this.cacheCategoryService.setCategory(key, filteredCategory);
      this.AppLoggerLoki.log(`Закешировали категорию с ID=${id}`, 'api');
    }
    this.AppLoggerLoki.log(`Пользователь получил категорию по ID=${id}`, 'api');
    return filteredCategory;
  }

  /**
   * Возвращает дерево категорий.
   * @returns Дерево категорий.
   */
  async getCategoryTree(): Promise<ICategory[]> {
    const key = `cat_TREE`;
    const categoriesTreeCache =
      await this.cacheCategoryService.getCategoriesTree(key);
    if (categoriesTreeCache && categoriesTreeCache) {
      return categoriesTreeCache;
    }
    const categories = await this.categoryRepository.find({
      where: { status: true },
      relations: ['descriptions', 'children', 'children.descriptions'],
      order: { sort_order: 'ASC' },
    });
    this.AppLoggerLoki.log(`Пользователь получил дерево категорий`, 'api');
    const buildedTreeCategories = await this.buildTree(categories);
    await this.cacheCategoryService.setCategoriesTree(
      key,
      buildedTreeCategories
    );
    return buildedTreeCategories;
  }

  /**
   * Возвращает дерево категорий.
   * @returns Дерево категорий.
   */
  async getCategoriesForHomePage(): Promise<ICategory[]> {
    const key = `cat_HOME`;
    const categoriesTreeCache =
      await this.cacheCategoryService.getCategoriesTree(key);
    if (categoriesTreeCache && categoriesTreeCache) {
      return categoriesTreeCache;
    }
    const categories = await this.categoryRepository.find({
      where: { status: true, onHomePage: true, image: Not(IsNull()) },
      relations: ['descriptions', 'children', 'children.descriptions'],
      order: { sort_order: 'ASC' },
    });
    this.AppLoggerLoki.log(
      `Пользователь получил дерево категорий для главной страницы`,
      'api'
    );
    await this.cacheCategoryService.setCategoriesTree(key, categories);
    return categories;
  }

  /**
   * Строит дерево категорий.
   * @param categories Список всех категорий.
   * @param parentId ID родительской категории.
   * @returns Дерево категорий.
   */
  private async buildTree(
    categories: Category[],
    parentId: string | null = null
  ): Promise<Category[]> {
    const tree: Category[] = [];

    for (const category of categories) {
      if (category.parent_id === parentId && category.status) {
        const children = await this.buildTree(categories, category.id);
        if (children.length) {
          category.children = children.filter((child) => child.status);
        } else {
          category.children = [];
        }
        tree.push(category);
      }
    }

    return tree;
  }

  /**
   * Рекурсивно фильтрует категории и их потомков по статусу.
   * @param category Категория для фильтрации.
   * @returns Отфильтрованная категория.
   */
  private async filterCategory(category: ICategory): Promise<ICategory | null> {
    if (!category || category.status === false) {
      return null;
    }

    if (category.children) {
      const filteredChildren = await Promise.all(
        category.children.map(this.filterCategory.bind(this))
      );

      category.children = filteredChildren.filter(
        (child): child is ICategory => child !== null
      );
    }

    return category;
  }

  /**
   * Возвращает список всех категорий без детей включенные.
   * @returns Список категорий.
   */
  async getAllCategories(): Promise<ICategory[]> {
    return await this.categoryRepository.find({
      where: { status: true },
      relations: ['descriptions'],
    });
  }
}
