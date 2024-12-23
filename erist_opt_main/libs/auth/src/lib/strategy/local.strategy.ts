import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { HttpExceptionMessagesGraphQL } from '@erist-opt/shared';
import { AppLoggerLoki } from '@erist-opt/logs';
/**
 * Стратегия аутентификации с использованием локальной стратегии (по имени пользователя и паролю).
 * Проверяет валидность имени пользователя (email) и пароля, вызывая метод AuthService.validateUser.
 * Если пользователь с указанными учетными данными не найден, выбрасывается исключение UnauthorizedException.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Создает экземпляр локальной стратегии аутентификации.
   * @param authService Сервис аутентификации для доступа к методу проверки пользовательских учетных данных.
   */
  constructor(
    private authService: AuthService,
    private AppLoggerLoki: AppLoggerLoki
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * Проверяет валидность имени пользователя (email) и пароля.
   * @param email Имя пользователя (email).
   * @param password Пароль пользователя.
   * @returns Возвращает пользователя, если аутентификация успешна.
   * @throws UnauthorizedException Если пользователь с указанными учетными данными не найден.
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      this.AppLoggerLoki.error(
        `Пользователь не смог авторизоваться из-за того что ввел неверный пароль ${email}`,
        'api'
      );
      throw new UnauthorizedException(
        HttpExceptionMessagesGraphQL.auth.dataNotCorrect
      );
    }
    return user;
  }
}
