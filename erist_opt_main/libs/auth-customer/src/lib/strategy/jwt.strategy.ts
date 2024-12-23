import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionMessagesGraphQL } from '@erist-opt/shared';
import { CustomerService } from '@erist-opt/customer';

/**
 * Стратегия аутентификации с использованием JWT (JSON Web Token).
 * Проверяет валидность и декодирует JWT токен, извлекая информацию о пользователе из него.
 * Если токен недействителен или истек срок его действия, выбрасывает исключение UnauthorizedException.
 * Если пользователь, связанный с данным токеном, не найден в базе данных, также выбрасывается UnauthorizedException.
 */
@Injectable()
export class JwtStrategyCustomer extends PassportStrategy(
  Strategy,
  'jwt-customer'
) {
  /**
   * Создает экземпляр стратегии JWT.
   * @param config Сервис конфигурации приложения.
   * @param customerService Сервис пользователей для доступа к базе данных.
   * @param configService Сервис конфигурации.
   */
  constructor(
    private config: ConfigService,
    private customerService: CustomerService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекает JWT токен из заголовка Authorization.
      ignoreExpiration: false, // Не игнорировать срок действия токена.
      secretOrKey: process.env['JWT_ACCESS_TOKEN_PUBLIC_KEY_CUSTOMER'], // Публичный ключ для проверки подписи токена.
      algorithms: ['RS256'], // Алгоритмы для декодирования токена.
    });
  }
  /**
   * Проверяет и декодирует JWT токен, а также осуществляет проверку его валидности и срока действия.
   * @param payload Декодированные данные из JWT токена.
   * @returns Возвращает пользователя, связанного с данным JWT токеном.
   * @throws UnauthorizedException Если токен недействителен или истек срок его действия,
   * а также если пользователь не найден в базе данных.
   */
  async validate(payload: any) {
    const tokenExpired = Date.now() > payload.exp * 1000;
    if (tokenExpired) {
      throw new UnauthorizedException(
        HttpExceptionMessagesGraphQL.auth.errorTokenTime
      );
    }

    const customer = await this.customerService.findOneByLogin(payload.login);
    if (!customer) {
      throw new UnauthorizedException();
    }
    return customer;
  }
}
