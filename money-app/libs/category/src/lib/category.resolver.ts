import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { ICategory } from '@money-app/entities';
import {
  CategoryDto,
  CategoryInputDto,
  UpdateCategoryInputDto,
} from './dto/category.dto';
import { JwtAuthGuard } from '@money-app/auth';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { defaultCategories } from '@money-app/shared';

@Resolver(() => CategoryDto)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryDto)
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Args('categoryInput') categoryInput: CategoryInputDto
  ): Promise<ICategory> {
    const category =
      await this.categoryService.findAllByClientIdAndGroupIdAndName(
        categoryInput.accountId,
        categoryInput.groupId,
        categoryInput.name
      );
    if (category) {
      throw new HttpException(
        `Категория с названием "${categoryInput.name}" уже существует в данной группе !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return this.categoryService.createCategory(categoryInput);
  }

  @Mutation(() => [CategoryDto])
  @UseGuards(JwtAuthGuard)
  async createDefaultCategories(
    @Args('clientId') clientId: string,
    @Args('groupId') groupId: string
  ): Promise<ICategory[]> {
    const categories = await this.categoryService.findAllByClientIdAndGroupId(
      clientId,
      groupId
    );

    if (categories.length != 0) {
      throw new HttpException(
        `Вы уже создали категории`,
        HttpStatus.BAD_REQUEST
      );
    }

    const newCategories = await this.categoryService.createDefaultCategories(
      clientId,
      groupId,
      defaultCategories
    );
    if (!newCategories) {
      throw new HttpException(
        `Ошибка создания категорий`,
        HttpStatus.BAD_REQUEST
      );
    }

    const categoriesUser = await this.categoryService.findAllByClientId(
      clientId
    );

    return categoriesUser;
  }

  @Mutation(() => CategoryDto, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Args('updateCategory')
    updateCategoryInputDto: UpdateCategoryInputDto
  ): Promise<ICategory> {
    const category = await this.categoryService.findOne(
      updateCategoryInputDto.id
    );
    if (!category) {
      throw new HttpException(
        `Категория  "${updateCategoryInputDto.name}" не существует !`,
        HttpStatus.BAD_REQUEST
      );
    }

    const categorySearchName =
      await this.categoryService.getCategoryByClientIdAndNameAndCategoryId(
        updateCategoryInputDto.id,
        updateCategoryInputDto.clientId,
        updateCategoryInputDto.groupId,
        updateCategoryInputDto.name
      );
    if (categorySearchName) {
      throw new HttpException(
        `Категория с названием "${updateCategoryInputDto.name}" уже существует в данной группе!`,
        HttpStatus.BAD_REQUEST
      );
    }

    const updatedCategory = await this.categoryService.updateCategory(
      updateCategoryInputDto
    );
    if (!updatedCategory) {
      throw new HttpException(
        `Ошибка обновления категории !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return updatedCategory;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Args('id') id: string): Promise<boolean> {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new HttpException(
        `Категория не существует !`,
        HttpStatus.BAD_REQUEST
      );
    }

    const deleteCategory = await this.categoryService.deleteCategory(id);
    if (!deleteCategory) {
      throw new HttpException(
        `Ошибка удаления категории !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return deleteCategory;
  }

  @Query(() => [CategoryDto])
  @UseGuards(JwtAuthGuard)
  async getAllCategoriesByGroup(
    @Args('clientId') clientId: string,
    @Args('groupId') groupId: string
  ): Promise<ICategory[]> {
    console.log(clientId);
    console.log(groupId);

    const categories: ICategory[] =
      await this.categoryService.findAllByClientIdAndGroupId(clientId, groupId);
    console.log(categories);
    return categories;
  }

  @Query(() => [CategoryDto])
  @UseGuards(JwtAuthGuard)
  async getAllCategories(
    @Args('clientId') clientId: string
  ): Promise<ICategory[]> {
    return this.categoryService.findAllByClientId(clientId);
  }
}
