import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionMessagesGraphQL } from '@erist-opt/shared';
import { UserService } from '@erist-opt/user';

/**
 * Стратегия аутентификации с использованием JWT (JSON Web Token).
 * Проверяет валидность и декодирует JWT токен, извлекая информацию о пользователе из него.
 * Если токен недействителен или истек срок его действия, выбрасывает исключение UnauthorizedException.
 * Если пользователь, связанный с данным токеном, не найден в базе данных, также выбрасывается UnauthorizedException.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Создает экземпляр стратегии JWT.
   * @param config Сервис конфигурации приложения.
   * @param userService Сервис пользователей для доступа к базе данных.
   * @param configService Сервис конфигурации.
   */
  constructor(
    private config: ConfigService,
    private userService: UserService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекает JWT токен из заголовка Authorization.
      ignoreExpiration: false, // Не игнорировать срок действия токена.
      secretOrKey: process.env['JWT_ACCESS_TOKEN_PUBLIC_KEY'], // Публичный ключ для проверки подписи токена.
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

    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
