import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import {
  LoginResponseDTO,
  LoginUserInputDTO,
  RefreshResponseDTO,
} from '@erist-opt/shared';
import { GglAuthGuard, JwtAuthGuard } from '@erist-opt/jwt-user';

@Resolver(() => AuthResolver)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  /**
   * Мутация для входа пользователя.
   * @param loginUserInput Входные данные пользователя для входа.
   * @param context Контекст GraphQL запроса.
   * @returns {Promise<LoginResponseDTO>} Промис с объектом ответа на вход пользователя.
   *
   * Этот метод используется для входа пользователя с использованием введенных им учетных данных.
   */
  @Mutation(() => LoginResponseDTO, {
    name: 'login',
    description: 'Выполняет вход пользователя в систему и возвращает токены.',
  })
  @UseGuards(GglAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInputDTO,
    @Context() context: any
  ) {
    const user = context.user;
    const login = await this.authService.login(user);
    return login;
  }

  /**
   * Мутация для обновления токена доступа.
   * @param refreshToken Токен обновления.
   * @returns {Promise<RefreshResponseDTO>} Промис с объектом ответа на обновление токена.
   *
   * Этот метод используется для обновления токена доступа пользователя с помощью токена обновления.
   */
  @Mutation(() => RefreshResponseDTO, {
    name: 'refreshToken',
    description: 'Обновляет токен доступа с помощью переданного рефреш токена.',
  })
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }

  @Query(() => Boolean, {
    name: 'verifyTokenUser',
    description: 'Проверяет валидность токена.',
  })
  async verifyTokenUser(@Context() context: any): Promise<boolean> {
    const authorizationHeader = context.req.headers.authorization; // Извлечение заголовка авторизации.
    if (!authorizationHeader) {
      return false; // В случае отсутствия заголовка возвращается false.
    }
    const token = authorizationHeader.split(' ')[1];

    const checkToken = await this.authService.verifyTokenUser(token);
    if (!checkToken) {
      return false;
    }
    return true;
  }

  // Метод проверки статуса пользователя
  @Query(() => Boolean, {
    name: 'checkUserStatus',
    description: 'Проверяет статус пользователя.',
  })
  @UseGuards(JwtAuthGuard)
  async checkUserStatus(@Context() context: any): Promise<boolean> {
    const userContext = context.req.user;
    if (!userContext) {
      return false;
    }
    const status = await this.authService.checkUserStatus(userContext.id);
    if (!status) {
      return false;
    }
    return true;
  }
}
