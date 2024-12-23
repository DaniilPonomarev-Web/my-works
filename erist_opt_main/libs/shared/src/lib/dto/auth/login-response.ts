import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Ответ для пользователей' })
export class LoginResponseDTO {
  @Field({ description: 'токен доступа' })
  access_token: string;

  @Field({ description: 'рефреш токен' })
  refresh_token: string;

  constructor(access_token: string, refresh_token: string) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
