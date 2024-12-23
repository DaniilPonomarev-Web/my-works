import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDescription } from './entities/category-description.entity';
import { CacheCategoryService } from '@erist-opt/redis';
import {
  HttpExceptionMessagesGraphQL,
  ICreateCategoryWithDescription,
  UpdateCategoryDTO,
} from '@erist-opt/shared';

const keyTree = `cat_TREE`;
const keyHome = `cat_HOME`;

@Injectable()
export class CategoryAdminService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(CategoryDescription)
    private readonly categoryDescriptionRepository: Repository<CategoryDescription>,
    private readonly cacheCategoryService: CacheCategoryService
  ) {}

  /**
   * Создает категорию с описанием.
   * @param createCategoryDto Данные для создания категории.
   * @returns Созданная категория или null, если создание не удалось.
   */
  async createCategoryWithDescription(
    createCategoryDto: ICreateCategoryWithDescription
  ): Promise<Category | null> {
    const { image, parent_id, sort_order, status, descriptions } =
      createCategoryDto;

    // console.warn(descriptions);

    const category = this.categoryRepository.create({
      image,
      parent_id,
      sort_order,
      status,
    });

    await this.categoryRepository.save(category);

    for (const desc of descriptions) {
      const categoryDescription = this.categoryDescriptionRepository.create({
        id: category.id,
        ...desc,
      });
      await this.categoryDescriptionRepository.save(categoryDescription);
    }

    const catNew = await this.getCategoryById(category.id);

    if (!catNew) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notCreate
      );
    }

    await this.cacheCategoryService.delCategoriesTree(keyTree);
    await this.cacheCategoryService.delCategoriesTree(keyHome);

    return catNew;
  }

  /**
   * Возвращает дерево категорий.
   * @returns Дерево категорий.
   */
  async getCategoryTree(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: ['descriptions', 'children', 'children.descriptions'],
    });

    return this.buildTree(categories);
  }

  /**
   * Возвращает категорию по ID.
   * @param id ID категории.
   * @returns Найденная категория или null, если категория не найдена.
   */
  async getCategoryById(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['descriptions', 'children', 'children.descriptions'],
    });
    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notError
      );
    }
    return category;
  }

  /**
   * Строит дерево категорий.
   * @param categories Список всех категорий.
   * @param parentId ID родительской категории.
   * @returns Дерево категорий.
   */
  private buildTree(
    categories: Category[],
    parentId: string | null = null
  ): Category[] {
    const tree: Category[] = [];

    for (const category of categories) {
      if (category.parent_id === parentId) {
        const children = this.buildTree(categories, category.id);
        if (children.length) {
          category.children = children;
        }
        tree.push(category);
      }
    }

    return tree;
  }

  /**
   * Обновляет существующую категорию.
   * @param updateCategoryDto Данные для обновления категории.
   * @returns Обновленная категория.
   * @throws Ошибка, если категория не найдена.
   */
  async updateCategory(
    updateCategoryDto: UpdateCategoryDTO
  ): Promise<Category | null> {
    const { id, descriptions, ...categoryData } = updateCategoryDto;

    // Загружаем категорию с отношениями
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['descriptions', 'children'],
    });
    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notError
      );
    }

    // Обновляем основные данные категории
    Object.assign(category, categoryData);
    await this.categoryRepository.save(category);

    // Обновляем описания категории
    if (descriptions) {
      for (const desc of descriptions) {
        const existingDesc = category.descriptions.find(
          (d) => d.id === desc.id
        );
        if (existingDesc) {
          Object.assign(existingDesc, desc);
          await this.categoryDescriptionRepository.save(existingDesc);
        } else {
          const newDesc = this.categoryDescriptionRepository.create({
            category: category,
            ...desc,
          });
          await this.categoryDescriptionRepository.save(newDesc);
        }
      }
    }

    // Загружаем обновленную категорию вместе с вложенными категориями и описаниями
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['descriptions', 'children', 'children.descriptions'],
    });

    await this.cacheCategoryService.delCategory(`cat_${updateCategoryDto.id}`);
    await this.cacheCategoryService.delCategoriesTree(keyTree);
    await this.cacheCategoryService.delCategoriesTree(keyHome);

    return updatedCategory;
  }

  /**
   * Возвращает список всех категорий без детей и описаний.
   * @returns Список категорий.
   */
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['descriptions', 'children'],
    });
    // {
    //   where: { status: true },
    //   relations: ['descriptions'],
    // }
  }

  /**
   * Возвращает список всех категорий без детей и описаний.
   * @returns Список категорий.
   */
  async getAllChildrensCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        parent_id: Not(IsNull()),
        status: true,
      },
    });
  }

  /**
   * Возвращает список всех родительских категорий.
   * @returns Список родительских категорий.
   */
  async getParentCategories(): Promise<Category[]> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    queryBuilder.where('category.parent_id IS NULL');
    return await queryBuilder.getMany();
  }

  /**
   * Возвращает список всех дочерних категорий.
   * @returns Список дочерних категорий.
   */
  async getChildrenCategories(): Promise<Category[]> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    queryBuilder.where('category.parent_id IS NOT NULL');
    return await queryBuilder.getMany();
  }

  /**
   * Удаляет категорию и обновляет дочерние категории.
   * @param id ID категории для удаления.
   * @returns Удаленная категория.
   * @throws Ошибка, если категория не найдена.
   */
  async deleteCategory(id: string): Promise<boolean> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notError
      );
    }

    // Обновляем родительский ID дочерних категорий
    if (category.children.length > 0) {
      await this.categoryRepository.update(
        { parent_id: category.id },
        { parent_id: null }
      );
    }

    // Удаляем описания категории
    await this.categoryDescriptionRepository.delete({
      id: category.id,
    });

    // Удаляем категорию
    await this.categoryRepository.remove(category);
    await this.cacheCategoryService.delCategory(`cat_${id}`);
    await this.cacheCategoryService.delCategoriesTree(keyTree);
    await this.cacheCategoryService.delCategoriesTree(keyHome);
    return true;
  }
}
