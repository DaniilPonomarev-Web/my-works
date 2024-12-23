import { IInviteds } from '@money-app/entities';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType({ description: 'Приглашения' })
export class InvitedsDto implements Omit<IInviteds, 'hash' | 'email'> {
  @Field(() => ID)
  id: string;

  @Field({ description: 'id  группы' })
  groupId: string;

  @Field({ description: 'Идентификатор клиента web' })
  accountId: string;

  @Field({ description: 'Роль пользователя' })
  role: string;

  @Field({ description: 'Имя пользователя бота' })
  firstName: string;

  @Field({ description: 'Был ли использован' })
  used: false;

  @Field({ description: 'Номер телефона пользователя' })
  phone: string;

  @Field({ description: ' Дата до которой действует инвайт' })
  validity: Date;
}

@InputType({ description: 'Создание инвайта' })
export class InvitedsInputDto {
  @Field({ description: 'Идентификатор клиента web' })
  clientId: string;

  @Field({ description: 'ID группы' })
  groupId: string;

  @Field({ description: 'Будущее имя пользователя бота' })
  firstName: string;

  @Field({ description: 'Номер телефона пользователя' })
  phone: string;
}
