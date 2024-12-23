import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';

@InputType({ description: 'Авторизация для пользователя' })
export class LoginUserInputDTO {
  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.login.notLogin,
  })
  @IsEmail(
    {},
    {
      message: HttpExceptionMessagesGraphQL.valiadtions.login.loginCorrect,
    }
  )
  @Field({ description: 'email' })
  email: string;

  @IsNotEmpty({
    message: HttpExceptionMessagesGraphQL.valiadtions.password.notPassword,
  })
  @Field({ description: 'Пароль' })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
