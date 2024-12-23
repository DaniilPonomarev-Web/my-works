import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDescription } from './entities/category-description.entity';
import {
  HttpExceptionMessagesGraphQL,
  ICreateCategoryOneC,
  ILogData,
  IUpdateCategoryOneC,
} from '@erist-opt/shared';
import { CacheCategoryService } from '@erist-opt/redis';
import { Notification1cService } from '@erist-opt/notification-1c';
const logData: ILogData = {
  processed: [],
  errorUpsert: [],
  created: [],
  errorCreated: [],
  updated: [],
  errorUpdated: [],
};
@Injectable()
export class CategoryOneCService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(CategoryDescription)
    private readonly categoryDescriptionRepository: Repository<CategoryDescription>,
    private readonly cacheCategoryService: CacheCategoryService,
    private readonly notification1cService: Notification1cService
  ) {}

  async syncCategories(categories: any[]) {
    // Получаем родительские и дочерние категории
    const parentCategories = categories.filter((cat) => !cat.categoryId);
    const childCategories = categories.filter((cat) => cat.categoryId);

    // Сначала обрабатываем родительские категории
    if (parentCategories.length >= 1) {
      let sortOrder = 0;
      for (const category of parentCategories) {
        try {
          console.log(`Parent category ${category.id1c} processed`);
          sortOrder++;

          await this.upsertCategory(category, sortOrder);
          logData.processed.push({
            id1c: category.id1c,
            timestamp: new Date().toISOString(),
          });
        } catch (error) {
          console.error(
            `Error processing parent category ${category.id1c}:`,
            error.message
          );
          logData.errorUpsert.push({
            id1c: category.id1c,
            errorMessage: error.message,
            timestamp: new Date().toISOString(),
          });
        }
        await this.delay(100); // Задержка 3 секунды
      }
    }

    // Затем обрабатываем дочерние категории
    if (childCategories.length >= 1) {
      let sortOrder = 0;
      for (const category of childCategories) {
        sortOrder++;
        try {
          await this.upsertCategory(category, sortOrder);
          logData.processed.push({
            id1c: category.id1c,
            timestamp: new Date().toISOString(),
          });
          console.log(`Child category ${category.id1c} processed`);
        } catch (error) {
          console.error(
            `Error processing child category ${category.id1c}:`,
            error.message
          );
          logData.errorUpsert.push({
            id1c: category.id1c,
            errorMessage: error.message,
            timestamp: new Date().toISOString(),
          });
        }
        await this.delay(100); // Задержка 3 секунды
      }
    }

    // const categoriesData = await this.categoryOneCService.getAllCategories();
    // console.warn(categoriesData);
    await this.cacheCategoryService.delAllCategories();
    await this.cacheCategoryService.delCategoriesTree('cat_TREE');

    await this.notification1cService.sendSnapshotNotification(
      logData,
      'category'
    );

    logData.processed = [];
    logData.errorUpsert = [];
    logData.created = [];
    logData.errorCreated = [];
    logData.updated = [];
    logData.errorUpdated = [];
  }

  private async upsertCategory(category: any, sortOrder: number) {
    const existingCategory = await this.getCategoryById1c(category.id1c);

    if (!existingCategory) {
      await this.createCategory(category, sortOrder);
      return;
    }
    // console.warn(existingCategory.status);

    await this.updateCategory(category, sortOrder);
  }

  private async updateCategory(category: any, sortOrder: number) {
    let categoryParentId = null;
    let categoryInBaseStatus = false;
    let categorySortOrder = 0;
    const categoryInBase = await this.getCategoryById1c(category.id1c);

    if (category.id1c) {
      categoryInBaseStatus = categoryInBase ? categoryInBase.status : false;
      categorySortOrder = categoryInBase ? categoryInBase.sort_order : 0;
    }
    if (category.categoryId) {
      const categoryInBaseParent = await this.getCategoryById1c(
        category.categoryId
      );
      categoryParentId = categoryInBaseParent ? categoryInBaseParent.id : null;
    }

    const categoryUpdate: IUpdateCategoryOneC = {
      parent_id: categoryParentId,
      sort_order: categorySortOrder,
      status: categoryInBaseStatus,
      id1c: category.id1c,
      descriptions: [
        {
          catIdOneC: category.id1c,
          name: category.name,
          description: category.name,
        },
      ],
    };

    try {
      console.log('Updating category with id1c:', categoryUpdate.id1c);
      // console.log('Updating category with data:', categoryUpdate);
      await this.updateCategoryBase(categoryUpdate);
      logData.updated.push({
        id1c: category.id1c,
        name: category.name,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating category:', error.message);
      logData.errorUpdated.push({
        id1c: category.id1c,
        name: category.name,
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  private async createCategory(category: any, sortOrder: number) {
    let categoryParentId = null;
    if (category.categoryId) {
      const categoryInBase = await this.getCategoryById1c(category.categoryId);
      categoryParentId = categoryInBase ? categoryInBase.id : null;
    }
    const categoryInsert: ICreateCategoryOneC = {
      parent_id: categoryParentId,
      sort_order: sortOrder || 0,
      status: category.status || true,
      id1c: category.id1c,
      descriptions: [
        {
          catIdOneC: category.id1c,
          name: category.name,
          description: category.name,
        },
      ],
    };
    try {
      console.log('Inserting category with data:', categoryInsert);
      await this.createCategoryBase(categoryInsert);
    } catch (error) {
      console.error('Error creating category:', error.message);
      throw error;
    }
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Создает категорию с описанием.
   * @param createCategoryDto Данные для создания категории.
   * @returns Созданная категория или null, если создание не удалось.
   */
  async createCategoryBase(
    payload: ICreateCategoryOneC
  ): Promise<Category | null> {
    const { parent_id, sort_order, status, id1c, descriptions } = payload;

    try {
      const category = this.categoryRepository.create({
        parent_id,
        sort_order,
        status,
        id1c,
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

      // console.warn('создалась категория с id в 1с', payload.id1c);
      logData.created.push({
        id1c: category.id1c,
        name: category.descriptions[0].name,
        timestamp: new Date().toISOString(),
      });
      return catNew;
    } catch (error) {
      console.error('Error creating product:', error.message);
      logData.errorCreated.push({
        id1c: payload.id1c,
        name: payload.descriptions[0].name,
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
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
   * Возвращает категорию по ID из 1с.
   * @param id ID категории.
   * @returns Найденная категория или null, если категория не найдена.
   */
  async getCategoryById1c(id1c: string): Promise<Category | null> {
    const category = await this.categoryRepository.findOne({
      where: { id1c: id1c },
    });
    if (!category) {
      return null;
    }
    // console.warn(category);

    return category;
  }

  /**
   * Обновляет существующую категорию.
   * @param updateCategoryDto Данные для обновления категории.
   * @returns Обновленная категория.
   * @throws Ошибка, если категория не найдена.
   */
  async updateCategoryBase(
    payload: IUpdateCategoryOneC
  ): Promise<Category | null> {
    const { id1c, descriptions, ...categoryData } = payload;

    // Загружаем категорию с отношениями
    const category = await this.categoryRepository.findOne({
      where: { id1c: id1c },
      relations: ['descriptions'],
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
          (d) => d.catIdOneC === desc.catIdOneC
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
      where: { id1c },
      relations: ['descriptions'],
    });

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
  }
}
