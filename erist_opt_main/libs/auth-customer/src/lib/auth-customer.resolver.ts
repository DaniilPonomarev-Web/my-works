import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthCustomerService } from './auth-customer.service';
import { UseGuards } from '@nestjs/common';
import {
  LoginCustomerInputDTO,
  LoginResponseDTO,
  RefreshResponseDTO,
} from '@erist-opt/shared';
import { GglAuthCustomerGuard } from '@erist-opt/jwt-customer';

@Resolver(() => AuthCustomerResolver)
export class AuthCustomerResolver {
  constructor(private readonly authCustomerService: AuthCustomerService) {}
  /**
   * Мутация для входа пользователя.
   * @param loginUserInput Входные данные пользователя для входа.
   * @param context Контекст GraphQL запроса.
   * @returns {Promise<LoginResponseDTO>} Промис с объектом ответа на вход пользователя.
   *
   * Этот метод используется для входа пользователя с использованием введенных им учетных данных.
   */
  @Mutation(() => LoginResponseDTO, {
    name: 'loginCustomer',
    description: 'Выполняет вход пользователя в систему и возвращает токены.',
  })
  @UseGuards(GglAuthCustomerGuard)
  async loginCustomer(
    @Args('loginCustomerInput') loginCustomerInput: LoginCustomerInputDTO,
    @Context() context: any
  ) {
    const customer = context.user;
    const login = await this.authCustomerService.login(customer);
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
    name: 'refreshTokenCustomer',
    description: 'Обновляет токен доступа с помощью переданного рефреш токена.',
  })
  async refreshTokenCustomer(@Args('refreshToken') refreshToken: string) {
    return await this.authCustomerService.refreshToken(refreshToken);
  }

  @Query(() => Boolean, {
    name: 'verifyTokenCustomer',
    description: 'Проверяет валидность токена.',
  })
  async verifyTokenCustomer(@Context() context: any): Promise<boolean> {
    const authorizationHeader = context.req.headers.authorization; // Извлечение заголовка авторизации.
    if (!authorizationHeader) {
      return false; // В случае отсутствия заголовка возвращается false.
    }
    const token = authorizationHeader.split(' ')[1];

    const checkToken = await this.authCustomerService.verifyTokenCustomer(
      token
    );
    if (!checkToken) {
      return false;
    }
    return true;
  }
}
