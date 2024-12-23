// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import {
//   Category,
//   CategoryDescription,
//   ICategory,
//   IInputCreateCategory,
//   InputUpdateCategoryDTO,
// } from '@erist-opt/shared';

// @Injectable()
// export class CategoryService {
//   constructor(
//     @InjectRepository(Category)
//     private readonly categoryRepository: Repository<Category>,
//     @InjectRepository(CategoryDescription)
//     private readonly categoryDescriptionRepository: Repository<CategoryDescription>
//   ) {}

//   /**
//    * Создает новую категорию с описанием.
//    * @param input Данные для создания категории с описанием.
//    * @returns {Promise<ICategory | null>} Промис с объектом созданной категории.
//    *
//    * Этот метод создает новую категорию в базе данных, а также создает ее описание.
//    */
//   async createCategory(payload: IInputCreateCategory): Promise<ICategory> {
//     const queryRunner =
//       this.categoryRepository.manager.connection.createQueryRunner();
//     await queryRunner.startTransaction();
//     try {
//       const parentCategories = await this.categoryRepository.findByIds(
//         payload.parentIds || []
//       );

//       const category = this.categoryRepository.create({
//         main: payload.main,
//         sortOrder: payload.sortOrder,
//         status: payload.status,
//         parentCategories: parentCategories || [],
//       });
//       await queryRunner.manager.save(category);

//       // Create category description
//       const categoryDescription = this.categoryDescriptionRepository.create({
//         name: payload.description.name,
//         description: payload.description.description,
//         imageUrl: payload.description.imageUrl,
//         metaTitle: payload.description.metaTitle,
//         metaH1: payload.description.metaH1,
//         metaDescription: payload.description.metaDescription,
//       });
//       const savedDescription = await queryRunner.manager.save(
//         categoryDescription
//       );
//       category.description = savedDescription;
//       await queryRunner.manager.save(category);
//       await queryRunner.commitTransaction();
//       return category;
//     } catch (err) {
//       await queryRunner.rollbackTransaction();
//       throw err;
//     } finally {
//       await queryRunner.release();
//     }
//   }

//   /**
//    * Получает все категории с их родителями и дочерними категориями.
//    * @returns {Promise<ICategory[]>} Промис с массивом всех категорий.
//    *
//    * Этот метод возвращает все категории в базе данных, включая их родительские и дочерние категории.
//    */
//   async getAllCategories(): Promise<ICategory[]> {
//     const categories = await this.categoryRepository.find({
//       relations: ['parentCategory', 'children', 'description'],
//     });

//     return categories;
//   }

//   /**
//    * Получает дерево категорий с родителями и дочерними категориями.
//    * @returns {Promise<Category[]>} Промис с массивом категорий.
//    *
//    * Этот метод возвращает дерево категорий с родителями и дочерними категориями.
//    */
//   async getCategoryTree(): Promise<Category[]> {
//     const topLevelCategories = await this.categoryRepository.find({
//       where: { main: true }, // Получаем основные категории (без родителей)
//       relations: ['children', 'description'], // Загружаем дочерние категории
//     });

//     const buildCategoryTree = async (
//       categories: Category[]
//     ): Promise<Category[]> => {
//       for (const category of categories) {
//         category.children = await this.getChildCategories(category.id);
//         if (category.children.length > 0) {
//           await buildCategoryTree(category.children);
//         }
//       }
//       return categories;
//     };

//     return buildCategoryTree(topLevelCategories);
//   }

//   async getChildCategories(parentId: string): Promise<Category[]> {
//     return this.categoryRepository.find({
//       where: { parentCategories: { id: parentId } }, // Запрос дочерних категорий по родительскому массиву
//       relations: ['children', 'description'],
//     });
//   }

//   async getCategoryById(id: string): Promise<ICategory | null> {
//     const category = await this.categoryRepository.findOne({
//       where: { id },
//       relations: ['description'],
//     });

//     if (!category) {
//       return null;
//     }

//     await this.loadParentCategories(category);
//     await this.loadChildCategories(category);

//     return category;
//   }

//   private async loadParentCategories(category: Category): Promise<void> {
//     const parents = await this.categoryRepository
//       .createQueryBuilder('category')
//       .leftJoinAndSelect('category.parentCategories', 'parent')
//       .leftJoinAndSelect('parent.description', 'parentDescription')
//       .where('category.id = :id', { id: category.id })
//       .getOne();

//     if (parents) {
//       category.parentCategories = parents.parentCategories;
//     }
//   }

//   private async loadChildCategories(category: Category): Promise<void> {
//     const children = await this.categoryRepository.find({
//       where: { parentCategories: { id: category.id } },
//       relations: ['description', 'children'],
//     });

//     category.children = children;

//     for (const child of category.children) {
//       await this.loadChildCategories(child);
//     }
//   }

//   /*Обновление  ниже */
//   // id, {
//   //
//   //     }
//   async updateCategory(
//     updateCategoryDto: InputUpdateCategoryDTO
//   ): Promise<ICategory | null> {
//     const { id, main, parentIds, sortOrder, status, description, childrenIds } =
//       updateCategoryDto;
//     const category = await this.categoryRepository.findOne({
//       where: { id },
//       relations: ['parentCategories', 'children', 'description'],
//     });
//     if (!category) {
//       throw new NotFoundException(`Category with ID ${id} not found.`);
//     }

//     if (main !== undefined) {
//       category.main = main;
//     }
//     if (parentIds) {
//       // Update parent categories
//       category.parentCategories = await this.categoryRepository.findByIds(
//         parentIds
//       );
//     }
//     category.sortOrder = sortOrder;
//     category.status = status;
//     if (description) {
//       category.description = description;
//     }
//     if (childrenIds) {
//       category.children = await this.categoryRepository.findByIds(childrenIds);
//     }

//     const updatedCategory = await this.categoryRepository.save(category);
//     if (!updatedCategory) {
//       throw new NotFoundException(`Ошибка обновления категории`);
//     }
//     const updatedCategoryNew = await this.getCategoryById(updatedCategory.id);
//     if (!updatedCategoryNew) {
//       return updatedCategory;
//     }
//     return updatedCategoryNew;
//   }

//   /* удаление ниже */

//   async deleteCategory(id: string): Promise<void> {
//     const result = await this.categoryRepository.delete(id);

//     if (result.affected === 0) {
//       throw new NotFoundException('Category не найдена!');
//     }
//   }

//   /**
//    * Находит категорию по ее идентификатору.
//    * @param id Идентификатор категории.
//    * @returns {Promise<ICategory | null>} Промис с объектом найденной категории или null, если категория не найдена.
//    *
//    * Этот метод находит категорию по ее идентификатору вместе с ее описанием.
//    */
//   async findOneById(id: string): Promise<ICategory | null> {
//     return this.categoryRepository.findOne({
//       where: { id },
//       relations: ['description'],
//     });
//   }
// }
