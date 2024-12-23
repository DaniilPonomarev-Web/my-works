import { Resolver, Query, Args } from '@nestjs/graphql';
import { CategoryUserService } from './categoryUser.service';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CategoryDTO, HttpExceptionMessagesGraphQL } from '@erist-opt/shared';
import { JwtAuthGuard } from '@erist-opt/jwt-user';

// // @UseGuards(JwtAuthGuard)
@Resolver(() => CategoryDTO)
export class CategoryUserResolver {
  constructor(private readonly categoryService: CategoryUserService) {}

  /**
   * Возвращает дерево категорий только со включеннми статусами..
   * @returns Дерево категорий.
   */
  @Query(() => [CategoryDTO], {
    description: `Возвращает дерево категорий только со включеннми статусами.`,
  })
  async getCategoryTreeForUser(): Promise<CategoryDTO[]> {
    const categoryTree = await this.categoryService.getCategoryTree();
    if (!categoryTree) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notTree
      );
    }
    return categoryTree;
  }

  /**
   * Возвращает дерево категорий только  для главной...
   * @returns Дерево категорий.
   */
  @Query(() => [CategoryDTO], {
    description: `Возвращает дерево категорий только для главной.`,
  })
  async getCategoriesForHomePage(): Promise<CategoryDTO[]> {
    const categoryTree = await this.categoryService.getCategoriesForHomePage();
    if (!categoryTree) {
      return [];
    }
    return categoryTree;
  }

  /**
   * Возвращает категорию по ID.
   * @param id ID категории.
   * @returns Найденная категория или ошибка, если категория не найдена.
   */
  @Query(() => CategoryDTO, {
    description: 'Возвращает категорию по ID с детьми и прочим гавном',
    nullable: true,
  })
  async getCategoryByIdForUser(@Args('id') id: string): Promise<CategoryDTO> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.category.notError
      );
    }
    return category;
  }
}
