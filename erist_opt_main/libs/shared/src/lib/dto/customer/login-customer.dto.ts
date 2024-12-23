import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';

@InputType({ description: 'Авторизация для админки' })
export class LoginCustomerInputDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.loginCustomer.notLogin,
  })
  @Length(3, 25, {
    message:
      HttpExceptionMessagesGraphQL.valiadtions.loginCustomer.loginCorrect,
  })
  @Field({ description: 'login' })
  login: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.password.notPassword,
  })
  @Field({ description: 'Пароль' })
  password: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
