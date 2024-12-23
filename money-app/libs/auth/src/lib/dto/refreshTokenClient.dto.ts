// eslint-disable-next-line @nx/enforce-module-boundaries

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshResponse {
  @Field()
  access_token: string;

  // @Field(() => ClientDTO)
  // client: ClientDTO;
}
