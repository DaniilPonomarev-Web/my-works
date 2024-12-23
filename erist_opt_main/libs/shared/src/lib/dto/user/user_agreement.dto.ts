import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IUserAgreement } from '../../interfaces';

@ObjectType({ description: 'Договор пользователя' })
export class UserAgreementDTO implements IUserAgreement {
  @Field(() => ID, { description: 'ID Договора' })
  id: string;

  @Field(() => Date, {
    nullable: true,
    description: 'Дата подписания',
  })
  date: Date;

  @Field(() => Boolean, {
    nullable: false,
    description: 'Подписан или нет',
  })
  signed: boolean;

  constructor(id: string, date: Date, signed: boolean) {
    this.id = id;
    this.date = date;
    this.signed = signed;
  }
}
