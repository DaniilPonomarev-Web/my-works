import { IInviteHrefInterface } from '@money-app/shared';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class InputInviteHrefDto implements IInviteHrefInterface {
  @Field({
    nullable: false,
    description: 'ID клиента который заинвайтил',
  })
  clientId: string;

  @Field({
    nullable: true,
    description: 'ID группы в которую пользователя приглашают',
  })
  groupId: string;

  @Field({
    nullable: false,
    description: 'Имя пользователя',
  })
  firstName: string;

  @Field({ nullable: false, description: 'Номер телефона пользователя' })
  phone: string;
}
