// import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
// import {
//   ICategory,
//   ICategoryDescription,
//   IInputCreateCategory,
//   IInputCreateCategoryDescription,
// } from '../../interfaces';

// import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';
// import { Type } from 'class-transformer';
// import {
//   IsNotEmpty,
//   IsNumber,
//   IsOptional,
//   IsUUID,
//   Length,
//   ValidateNested,
// } from 'class-validator';
// @ObjectType({ description: 'Описание категории' })
// export class CategoryDescriptionDTO implements ICategoryDescription {
//   @Field(() => String, { description: 'ID описания категории' })
//   id: string;

//   @Field({ description: 'Название категории' })
//   name: string;

//   @Field({ description: 'Изображение категории' })
//   imageUrl: string;

//   @Field({ description: 'Описание категории' })
//   description: string;

//   @Field({ description: 'Мета заголовок категории' })
//   metaTitle: string;

//   @Field({ description: 'Мета H1 категории' })
//   metaH1: string;

//   @Field({ description: 'Мета описание категории' })
//   metaDescription: string;

//   constructor(
//     id: string,
//     imageUrl: string,
//     name: string,
//     description: string,
//     metaTitle: string,
//     metaH1: string,
//     metaDescription: string
//   ) {
//     this.id = id;
//     this.imageUrl = imageUrl;
//     this.name = name;
//     this.description = description;
//     this.metaTitle = metaTitle;
//     this.metaH1 = metaH1;
//     this.metaDescription = metaDescription;
//   }
// }

// @ObjectType({ description: 'Category' })
// export class CategoryDTO implements ICategory {
//   @Field(() => ID, { description: 'ID категории' })
//   id: string;

//   @Field({ description: 'Основная категория' })
//   main: boolean;

//   @Field(() => [CategoryDTO], {
//     nullable: true,
//     description: 'Родительская категория',
//   })
//   parentCategories: CategoryDTO[];

//   @Field(() => [CategoryDTO], {
//     nullable: true,
//     description: 'Дочерние категории',
//   })
//   children: CategoryDTO[];

//   @Field({ description: 'Порядок сортировки' })
//   sortOrder: number;

//   @Field({ description: 'Статус категории' })
//   status: boolean;

//   @Field({ description: 'Дата добавления' })
//   dateAdded: string;

//   @Field(() => CategoryDescriptionDTO, {
//     nullable: true,
//     description: 'Описание категории',
//   })
//   description: CategoryDescriptionDTO;

//   constructor(
//     id: string,
//     main: boolean,
//     sortOrder: number,
//     status: boolean,
//     dateAdded: string,
//     description: CategoryDescriptionDTO,
//     parentCategories: CategoryDTO[],
//     children: CategoryDTO[]
//   ) {
//     this.id = id;
//     this.main = main;
//     this.parentCategories = parentCategories;
//     this.children = children;
//     this.sortOrder = sortOrder;
//     this.status = status;
//     this.dateAdded = dateAdded;
//     this.description = description;
//   }
// }

// @InputType({ description: 'Ввод данных для создания описания категории' })
// export class CreateCategoryDescriptionDTO
//   implements IInputCreateCategoryDescription
// {
//   @IsOptional()
//   @Field({ nullable: false, description: 'Название категории' })
//   name: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Описание категории' })
//   description: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'URL изображения' })
//   imageUrl: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Мета заголовок категории' })
//   metaTitle: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Мета H1 категории' })
//   metaH1: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Мета описание категории' })
//   metaDescription: string;

//   constructor(
//     name: string,
//     description: string,
//     imageUrl: string,
//     metaTitle: string,
//     metaH1: string,
//     metaDescription: string
//   ) {
//     this.name = name;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.metaTitle = metaTitle;
//     this.metaH1 = metaH1;
//     this.metaDescription = metaDescription;
//   }
// }

// @InputType({ description: 'Input data for creating a category' })
// export class InputCreateCategoryDTO implements IInputCreateCategory {
//   @IsNotEmpty({
//     message: HttpExceptionMessagesGraphQL.category.validations.main.not,
//   })
//   @Field({ description: 'Main category' })
//   main: boolean;

//   @IsOptional()
//   @Field(() => [ID], { nullable: true, description: 'Parent category IDs' })
//   parentIds: string[]; // Массив идентификаторов родительских категорий

//   @IsNotEmpty({
//     message: HttpExceptionMessagesGraphQL.category.validations.sort.not,
//   })
//   @IsNumber(
//     {},
//     {
//       message:
//         HttpExceptionMessagesGraphQL.category.validations.sort.errorCharter,
//     }
//   )
//   @Field({ description: 'Sort order' })
//   sortOrder: number;

//   @IsOptional()
//   @Field({ description: 'Category status' })
//   status: boolean;

//   @ValidateNested()
//   @Type(() => CreateCategoryDescriptionDTO)
//   @Field({ description: 'Category description', nullable: true })
//   description: CreateCategoryDescriptionDTO;

//   constructor(
//     main: boolean,
//     parentIds: string[],
//     sortOrder: number,
//     status: boolean,
//     description: CreateCategoryDescriptionDTO
//   ) {
//     this.main = main;
//     this.parentIds = parentIds;
//     this.sortOrder = sortOrder;
//     this.status = status;
//     this.description = description;
//   }
// }

// @InputType({ description: 'Input data for updating category description' })
// export class UpdateCategoryDescriptionDTO {
//   @IsOptional()
//   @Field({ nullable: true, description: 'Category ID' })
//   id: string;

//   @IsOptional()
//   @Field({ nullable: false, description: 'Category name' })
//   name: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Category description' })
//   description: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Image URL' })
//   imageUrl: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Meta title' })
//   metaTitle: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Meta H1' })
//   metaH1: string;

//   @IsOptional()
//   @Field({ nullable: true, description: 'Meta description' })
//   metaDescription: string;

//   constructor(
//     id: string,
//     name: string,
//     description: string,
//     imageUrl: string,
//     metaTitle: string,
//     metaH1: string,
//     metaDescription: string
//   ) {
//     this.id = id;
//     this.name = name;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.metaTitle = metaTitle;
//     this.metaH1 = metaH1;
//     this.metaDescription = metaDescription;
//   }
// }

// @InputType({ description: 'Input data for updating a category' })
// export class InputUpdateCategoryDTO {
//   @IsNotEmpty({
//     message: HttpExceptionMessagesGraphQL.category.validations.id.not,
//   })
//   @Field(() => ID, { description: 'Category ID' })
//   id: string;

//   @IsOptional()
//   @Field({ description: 'Main category' })
//   main: boolean;

//   @IsOptional()
//   @Field(() => [ID], { nullable: true, description: 'Parent category IDs' })
//   parentIds: string[];

//   @IsOptional()
//   @IsNumber(
//     {},
//     {
//       message:
//         HttpExceptionMessagesGraphQL.category.validations.sort.errorCharter,
//     }
//   )
//   @Field({ description: 'Sort order' })
//   sortOrder: number;

//   @IsOptional()
//   @Field({ description: 'Category status' })
//   status: boolean;

//   @ValidateNested()
//   @Type(() => UpdateCategoryDescriptionDTO)
//   @Field({ description: 'Category description', nullable: true })
//   description: UpdateCategoryDescriptionDTO;

//   @IsOptional()
//   @Field(() => [ID], { nullable: true, description: 'Children category IDs' })
//   childrenIds: string[];

//   constructor(
//     id: string,
//     main: boolean,
//     sortOrder: number,
//     status: boolean,
//     description: UpdateCategoryDescriptionDTO,
//     parentIds: string[],
//     childrenIds: string[]
//   ) {
//     this.id = id;
//     this.main = main;
//     this.sortOrder = sortOrder;
//     this.status = status;
//     this.description = description;
//     this.parentIds = parentIds;
//     this.childrenIds = childrenIds;
//   }
// }
