import { IUser } from '@money-app/entities';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

export type UserRole = 'admin' | 'user';

@ObjectType({ description: 'Пользователь бота' })
export class User implements IUser {
  @Field({
    nullable: false,
    description: 'ID',
  })
  id: string;

  @Field({
    nullable: false,
    description: 'ID пользователя который пригласил',
  })
  accountId: string;

  @Field({
    nullable: false,
    description: 'ID группы',
  })
  groupId: string;

  @Field({
    nullable: false,
    description: 'ID чата telegram',
  })
  chatId: number;

  @Field({
    nullable: false,
    description: 'Имя',
  })
  firstName: string;

  @Field({
    nullable: false,
    description: 'Фамилия',
  })
  lastName: string;

  @Field({
    nullable: false,
    description: 'Номер телефона',
  })
  phone: string;

  @Field({
    nullable: false,
    description: 'Статус пользователя',
  })
  status: boolean;

  @Field({
    description: 'Роль пользователя',
  })
  role: UserRole;
}

@InputType()
export class InputCreateUserDto {
  @Field()
  clientId: string;

  @Field()
  groupId: string;

  @Field()
  chatId: string;

  @Field()
  firstName: string;

  @Field()
  phone: string;

  @Field({ description: 'Статус пользователя' })
  status: boolean;
}
