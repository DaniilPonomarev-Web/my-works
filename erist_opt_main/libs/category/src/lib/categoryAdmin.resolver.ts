import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryAdminService } from './categoryAdmin.service';
import { NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import {
  CategoryDTO,
  CategoryListDTO,
  CategoryListFilterAdminDTO,
  CreateCategoryWithDescriptionDTO,
  CustomerRole,
  HttpExceptionMessagesGraphQL,
  OrdersPaginationAdminDTO,
  UpdateCategoryDTO,
} from '@erist-opt/shared';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';

@UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
@SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
@Resolver(() => CategoryDTO)
export class CategoryAdminResolver {
  constructor(private readonly categoryService: CategoryAdminService) {}

  /**
   * Создает новую категорию с описаниями.
   * @param createCategoryWithDescriptionInput Данные для создания категории.
   * @returns Созданная категория.
   * @throws Ошибка, если категория не создана.
   */
  @Mutation(() => CategoryDTO, {
    description: `Создает новую категорию с описанием`,
  })
  async createCategoryWithDescription(
    @Args('createCategoryWithDescriptionInput')
    createCategoryWithDescriptionInput: CreateCategoryWithDescriptionDTO
  ): Promise<CategoryDTO> {
    const category = await this.categoryService.createCategoryWithDescription(
      createCategoryWithDescriptionInput
    );
    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notCreate
      );
    }
    return category;
  }

  /**
   * Возвращает дерево категорий.
   * @returns Дерево категорий.
   */
  @Query(() => CategoryListDTO, { description: `Возвращает дерево категорий.` })
  async getCategoryTree(
    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO,
    @Args('filter', { nullable: true }) filter?: CategoryListFilterAdminDTO
  ): Promise<CategoryListDTO> {
    const categoryTree = await this.categoryService.getAllCategories();
    // console.warn(categoryTree);

    if (!categoryTree) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notTree
      );
    }
    let filterCategoryData = categoryTree;
    if (filter) {
      // console.warn(filter);

      if (filter.filterStatus !== null) {
        filterCategoryData = filterCategoryData.filter(
          (item) => item.status === filter.filterStatus
        );
      }

      if (filter.filterName !== null) {
        filterCategoryData = filterCategoryData.filter((item) =>
          item.descriptions[0].name
            .toLocaleLowerCase()
            .includes(filter.filterName.toLocaleLowerCase())
        );
      }

      if (filter.filterDescription !== null) {
        filterCategoryData = filterCategoryData.filter((item) =>
          item.descriptions[0].description
            .toLocaleLowerCase()
            .includes(filter.filterDescription.toLocaleLowerCase())
        );
      }

      if (filter.filterMainCategory !== null) {
        filterCategoryData = filterCategoryData.filter((item) => {
          if (filter.filterMainCategory) {
            return item.parent_id === null;
          } else {
            return item.parent_id !== null;
          }
        });
      }
    }
    const totalCategories = filterCategoryData.filter(
      (item) => item.parent_id === null
    ).length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    filterCategoryData = filterCategoryData.slice(startIndex, endIndex);
    const categoryTreeData: CategoryListDTO = {
      data: filterCategoryData,
      total: totalCategories,
    };
    return categoryTreeData;
  }

  /**
   * Возвращает категорию по ID.
   * @param id ID категории.
   * @returns Найденная категория или ошибка, если категория не найдена.
   */
  @Query(() => CategoryDTO, {
    description: 'Возвращает категорию по ID.',
    nullable: true,
  })
  async getCategoryById(@Args('id') id: string): Promise<CategoryDTO> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notError
      );
    }
    return category;
  }

  /**
   * Обновляет существующую категорию.
   * @param updateCategoryInput Данные для обновления категории.
   * @returns Обновленная категория.
   */
  @Mutation(() => CategoryDTO, {
    description: 'бновляет существующую категорию.',
  })
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryDTO
  ): Promise<CategoryDTO> {
    const category = await this.categoryService.updateCategory(
      updateCategoryInput
    );
    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notUpdate
      );
    }
    return category;
  }

  /**
   * Возвращает список всех  категорий тупо списком.
   * @returns Список родительских категорий.
   */
  @Query(() => [CategoryDTO], {
    description: 'Возвращает список всех категорий без детей и описаний',
  })
  async getAllCategories(): Promise<CategoryDTO[]> {
    const categories = await this.categoryService.getAllCategories();
    return categories;
  }

  /**
   * Возвращает список всех  категорий тупо списком.
   * @returns Список родительских категорий.
   */
  @Query(() => [CategoryDTO], {
    description: 'Возвращает список всех дочерних категорий',
    complexity: 3,
  })
  async getAllCildrenCategories(): Promise<CategoryDTO[]> {
    const categories = await this.categoryService.getAllChildrensCategories();
    return categories;
  }

  /**
   * Возвращает список всех родительских категорий.
   * @returns Список родительских категорий.
   */
  @Query(() => [CategoryDTO], {
    description: 'Возвращает список всех родительских категорий',
  })
  async getParentCategories(): Promise<CategoryDTO[]> {
    const categories = await this.categoryService.getParentCategories();
    return categories;
  }

  /**
   * Возвращает список всех дочерних категорий.
   * @returns Список дочерних категорий.
   */
  @Query(() => [CategoryDTO], {
    description: 'Возвращает список всех дочерних категорий',
  })
  async getChildrenCategories(): Promise<CategoryDTO[]> {
    const categories = await this.categoryService.getChildrenCategories();
    return categories;
  }

  /**
   * Удаляет категорию по ID.
   * @param id ID категории для удаления.
   * @returns Удаленная категория.
   * @throws Ошибка, если категория не найдена.
   */
  @Mutation(() => Boolean, {
    description: 'Удаляет категорию по ID.',
  })
  async deleteCategory(@Args('id') id: string): Promise<boolean> {
    const category = await this.categoryService.deleteCategory(id);
    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notError
      );
    }
    return category;
  }
}
