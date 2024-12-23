import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCustomerService } from '../auth-customer.service';
import { HttpExceptionMessagesGraphQL } from '@erist-opt/shared';
/**
 * Стратегия аутентификации с использованием локальной стратегии (по имени пользователя и паролю).
 * Проверяет валидность имени пользователя (email) и пароля, вызывая метод AuthService.validateUser.
 * Если пользователь с указанными учетными данными не найден, выбрасывается исключение UnauthorizedException.
 */
@Injectable()
export class LocalStrategyCustomer extends PassportStrategy(
  Strategy,
  'local-customer'
) {
  /**
   * Создает экземпляр локальной стратегии аутентификации.
   * @param authCustomerService Сервис аутентификации для доступа к методу проверки пользовательских учетных данных админки.
   */
  constructor(private authCustomerService: AuthCustomerService) {
    super({
      usernameField: 'login',
      passwordField: 'password',
    });
  }

  /**
   * Проверяет валидность имени пользователя (email) и пароля.
   * @param login Логин пользователя.
   * @param password Пароль пользователя.
   * @returns Возвращает пользователя, если аутентификация успешна.
   * @throws UnauthorizedException Если пользователь с указанными учетными данными не найден.
   */
  async validate(login: string, password: string): Promise<any> {
    // console.warn('validate');

    const customer = await this.authCustomerService.validateCustomer(
      login,
      password
    );
    // console.warn(customer);
    if (!customer) {
      throw new UnauthorizedException(
        HttpExceptionMessagesGraphQL.auth.dataNotCorrect
      );
    }
    // console.warn('Вернули кастомера в local-customer');

    return customer;
  }
}
