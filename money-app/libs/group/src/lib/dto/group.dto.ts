import { ICategory, IGroup } from '@money-app/entities';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { CategoryDto } from '@money-app/category';

@ObjectType({ description: 'Группа' })
export class GroupDto implements IGroup {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Название группы' })
  name: string;

  @Field({ description: 'ID аккаунта' })
  accountId: string;

  @Field({ description: 'Статус группы' })
  status: boolean;
}

@ObjectType({ description: 'Группа' })
export class GroupWithCategoryDto implements IGroup {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Название группы' })
  name: string;

  @Field({ description: 'ID аккаунта' })
  accountId: string;

  @Field({ description: 'Статус группы' })
  status: boolean;

  @Field(() => [CategoryDto], { description: 'Категории' })
  categories: ICategory[];
}

@InputType({ description: 'Создание группы' })
export class InputCreateGroupDto {
  @Field({ description: 'Идентификатор клиента web' })
  clientId: string;

  @Field({ description: 'Название группы' })
  name: string;

  @Field({ defaultValue: true, description: 'Статус группы' })
  status: boolean;
}

@InputType({ description: 'Обновление группы группы' })
export class InputUpdateGroupDto {
  @Field({ description: 'Идентификатор клиента web' })
  clientId: string;

  @Field({ description: 'Идентификатор группы' })
  id: string;

  @Field({ description: 'Новое название группы' })
  name: string;

  @Field({ defaultValue: true, description: 'Новый статус группы' })
  status: boolean;
}
