import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginClientInput {
  @Field()
  phone: string;

  @Field()
  password: string;
}
