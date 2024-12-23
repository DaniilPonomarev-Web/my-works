import { ICategory, TransactionType } from '@money-app/entities';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType({ description: 'Категория' })
export class CategoryDto implements ICategory {
  @Field(() => ID)
  id: string;

  @Field({ description: 'ID аккаунта' })
  accountId: string;

  @Field({ description: 'Название категории' })
  name: string;

  @Field({ description: 'id группы к которой привязана категория' })
  groupId: string;

  @Field({ description: 'Доход или расход' })
  type: TransactionType;

  @Field({ description: 'Статус категории' })
  status: boolean;
}

@InputType({ description: 'Создание категории' })
export class CategoryInputDto {
  @Field({ description: 'Идентификатор клиента web' })
  accountId: string;

  @Field({ description: 'Название категории' })
  name: string;

  @Field({ description: 'id группы к которой привязана категория' })
  groupId: string;

  @Field({ description: 'Доход или расход' })
  type: TransactionType;

  @Field({ defaultValue: true, description: 'Статус категории' })
  status: boolean;
}

@InputType({ description: 'Обновление категории категории' })
export class UpdateCategoryInputDto {
  @Field({ description: 'Идентификатор клиента web' })
  clientId: string;

  @Field({ description: 'Идентификатор категории' })
  id: string;

  @Field({ description: 'Новое название категории' })
  name: string;

  @Field({ description: 'ID группы ' })
  groupId: string;

  @Field({ description: 'Доход или расход' })
  type: TransactionType;

  @Field({ defaultValue: true, description: 'Новый статус категории' })
  status: boolean;
}
