import { InviteHrefInterface } from '@money-app/shared';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Ссылка для инвайта пользователя' })
export class InviteHref implements InviteHrefInterface {
  @Field({
    nullable: false,
    description: 'Ссылка',
  })
  inviteHref: string;

  constructor(inviteHref: string) {
    this.inviteHref = inviteHref;
  }
}

