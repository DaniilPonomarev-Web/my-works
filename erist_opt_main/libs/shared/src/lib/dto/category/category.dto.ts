import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CategoryDescriptionDTO } from './category-description.dto';
import { ICategory } from '../../interfaces';
import { IsOptional } from 'class-validator';

@ObjectType()
export class CategoryDTO implements ICategory {
  @Field({ description: 'id категории' })
  id: string;

  @Field({ nullable: true, description: 'Ссылка на изображение' })
  image: string | null;

  @Field({ nullable: true, description: 'Родительская категория' })
  parent_id: string | null;

  @Field(() => Number, { description: 'Порядок сортировки' })
  sort_order: number;

  @Field({ description: 'Статус категории' })
  status: boolean;

  @Field({ description: 'Отображать в плитке на главной' })
  onHomePage: boolean;

  @Field(() => [CategoryDescriptionDTO], {
    description: 'Описания категории',
    nullable: true,
  })
  descriptions: CategoryDescriptionDTO[];

  @Field(() => [CategoryDTO], {
    nullable: true,
    description: 'Дочерняя категория',
  })
  children: CategoryDTO[];

  constructor(
    id: string,
    image: string,
    parent_id: string,
    sort_order: number,
    status: boolean,
    onHomePage: boolean,
    descriptions: CategoryDescriptionDTO[],
    children: CategoryDTO[]
  ) {
    this.id = id;
    this.image = image;
    this.parent_id = parent_id;
    this.sort_order = sort_order;
    this.status = status;
    this.onHomePage = onHomePage;
    this.descriptions = descriptions;
    this.children = children;
  }
}

@ObjectType()
export class CategoryListDTO {
  @Field(() => [CategoryDTO], { description: 'Дерево категорий' })
  data: CategoryDTO[];

  @Field({
    nullable: false,
    description: 'Количество категорий первого уровня',
  })
  total: number;

  constructor(data: CategoryDTO[], total: number) {
    this.data = data;
    this.total = total;
  }
}

@InputType({ description: 'Инпут для фильтров дерева категорий' })
export class CategoryListFilterAdminDTO {
  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
    description: 'фильтр по статусу',
  })
  filterStatus: boolean;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по части названия ',
  })
  filterName: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'фильтр по части описания',
  })
  filterDescription: string;

  @IsOptional()
  @Field(() => Boolean, {
    nullable: true,
    description: 'фильтр по родительским и дочерним',
  })
  filterMainCategory: boolean;

  constructor(
    filterStatus: boolean,
    filterName: string,
    filterDescription: string
  ) {
    this.filterStatus = filterStatus;
    this.filterName = filterName;
    this.filterDescription = filterDescription;
  }
}
