// /* eslint-disable @nx/enforce-module-boundaries */
// import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
// import { CategoryService } from './category.service';
// import {
//   CategoryDTO,
//   ICategory,
//   InputCreateCategoryDTO,
//   CustomerRole,
//   HttpExceptionMessagesGraphQL,
//   InputUpdateCategoryDTO,
// } from '@erist-opt/shared';
// import { NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '@erist-opt/auth';

// @Resolver(() => CategoryDTO)
// export class CategoryResolver {
//   constructor(private readonly categoryService: CategoryService) {}

//   // // @UseGuards(JwtAuthGuard)
//   // @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
//   @Mutation(() => CategoryDTO, { description: 'Create a new category' })
//   async createCategory(
//     @Args('createCategoryInput') createCategoryDTO: InputCreateCategoryDTO
//   ): Promise<CategoryDTO> {
//     const category = await this.categoryService.createCategory(
//       createCategoryDTO
//     );
//     return new CategoryDTO(
//       category.id,
//       category.main,
//       category.sortOrder,
//       category.status,
//       category.dateAdded,
//       category.description,
//       category.parentCategories,
//       category.children
//     );
//   }

//   @Query(() => [CategoryDTO])
//   async getCategoryTree(): Promise<ICategory[]> {
//     return this.categoryService.getCategoryTree();
//   }

//   // Рекурсивная функция для загрузки всех дочерних категорий
//   async loadChildren(category: ICategory): Promise<ICategory> {
//     if (category.children.length > 0) {
//       for (const child of category.children) {
//         await this.loadChildren(child);
//       }
//     }
//     return category;
//   }

//   @Query(() => CategoryDTO, {
//     description: 'Get category by ID with parents and children',
//   })
//   async getCategoryById(
//     @Args('id', { type: () => String }) id: string
//   ): Promise<ICategory> {
//     const category = await this.categoryService.getCategoryById(id);
//     if (!category) {
//       throw new NotFoundException(
//         HttpExceptionMessagesGraphQL.category.notError
//       );
//     }
//     return category;
//   }

//   @Mutation(() => CategoryDTO, { nullable: true })
//   async updateCategory(
//     @Args('updateCategoryDto') updateCategoryDto: InputUpdateCategoryDTO
//   ): Promise<ICategory> {

//     return await this.categoryService.updateCategory(updateCategoryDto);
//   }

//   @Mutation(() => Boolean, { description: 'Delete a category' })
//   async deleteCategory(
//     @Args('id', { type: () => String }) id: string
//   ): Promise<boolean> {
//     await this.categoryService.deleteCategory(id);
//     return true;
//   }

//   // @Query(() => [CategoryDTO])
//   // async getCategoryTree(): Promise<ICategory[]> {
//   //   return this.categoryService.getCategoryTree();
//   // }

//   // @Mutation(() => CategoryDTO)
//   // async createCategory(
//   //   @Args('createCategoryInput') createCategoryInput: InputCreateCategoryDTO
//   // ): Promise<ICategory> {
//   //   return this.categoryService.createCategory(createCategoryInput);
//   // }

//   // @Mutation(() => CategoryDescriptionDTO)
//   // async createCategoryDescription(
//   //   @Args('createCategoryDescriptionInput')
//   //   createCategoryDescriptionInput: InputCreateCategoryDescriptionDTO
//   // ): Promise<ICategoryDescription> {
//   //   return this.categoryService.createCategoryDescription(
//   //     createCategoryDescriptionInput
//   //   );
//   // }

//   // // @UseGuards(JwtAuthGuard)
//   // @Query(() => [CategoryDTO], { name: 'getCategories' })
//   // async getCategories(): Promise<ICategory[] | null> {
//   //   return this.categoryService.findAll();
//   // }

//   // // @UseGuards(JwtAuthGuard)
//   // @Query(() => CategoryDTO, { name: 'getCategory' })
//   // async getCategory(@Args('id') id: string): Promise<ICategory | null> {
//   //   return this.categoryService.findOneById(id);
//   // }
// }
