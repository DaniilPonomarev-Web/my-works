import {
  HttpExceptionMessagesGraphQL,
  IUser,
  IUserWithoutPass,
  LoginResponseDTO,
} from '@erist-opt/shared';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';

import { JwtUserService } from '@erist-opt/jwt-user';
import { UserService } from '@erist-opt/user';
import { AppLoggerLoki } from '@erist-opt/logs';

/**
 * Сервис для аутентификации и управления токенами пользователей.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtUserService: JwtUserService,
    private readonly userService: UserService,
    private AppLoggerLoki: AppLoggerLoki
  ) {}

  /**
   * Валидирует пользователя по его email и паролю.
   * @param email Email пользователя.
   * @param password Пароль пользователя.
   * @returns {Promise<any>} Промис, который разрешается, если пользователь валидирован.
   * @throws {UnauthorizedException} Если пользователь не найден или пароль неверен.
   *
   * Этот метод проверяет, существует ли пользователь с указанным email, и сверяет
   * указанный пароль с хешированным паролем в базе данных.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      this.AppLoggerLoki.error(
        `Пользователь не смог авторизоваться из-за того что его нет в системе ${email}`,
        'api'
      );
      throw new UnauthorizedException({
        message: HttpExceptionMessagesGraphQL.user.notUser,
      });
    }
    if (!user.status) {
      throw new UnauthorizedException({
        message: HttpExceptionMessagesGraphQL.user.userDown,
      });
    }
    if (await compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return;
  }

  /**
   * Проверяет статус пользователя по его идентификатору.
   * @param userId Идентификатор пользователя.
   * @returns {Promise<boolean>} Промис с результатом проверки статуса пользователя.
   *
   * Этот метод проверяет, активен ли пользователь по его идентификатору.
   */
  async checkUserStatus(userId: string): Promise<boolean> {
    const user = await this.getUserStatus(userId);
    if (!user?.status) {
      this.AppLoggerLoki.error(
        `Пользователь не смог авторизоваться из-за статуса ${user?.email}`,
        'api'
      );
      return false;
    }
    return true;
  }

  /**
   * Возвращает статус пользователя по его идентификатору.
   * @param userId Идентификатор пользователя.
   * @returns {Promise<IUserWithoutPass | null>} Промис с объектом пользователя или null, если не найдено.
   *
   * Этот метод возвращает объект пользователя по указанному идентификатору.
   */
  private async getUserStatus(
    userId: string
  ): Promise<IUserWithoutPass | null> {
    const user = await this.userService.findOneByIdWithoutCache(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * Аутентифицирует пользователя и генерирует для него access и refresh токены.
   * @param user Объект пользователя.
   * @returns {Promise<{ access_token: string, refresh_token: string }>} Промис с объектом, содержащим access и refresh токены.
   *
   * Этот метод очищает старые токены пользователя, генерирует новые access и refresh токены и возвращает их.
   */
  async login(user: IUser): Promise<LoginResponseDTO> {
    await this.jwtUserService.deleteTokens(user.id);
    const genretadTokens = await this.jwtUserService.generateTokens(user);
    this.AppLoggerLoki.log('Пользователь авторизовался ' + user.email, 'api');
    return genretadTokens;
  }

  /**
   * Обновляет access и refresh токены.
   * @param token Текущий refresh токен.
   * @returns {Promise<{ access_token: string; refresh_token: string }>} Промис с объектом, содержащим новые access и refresh токены.
   * @throws {UnauthorizedException} Если токен не найден или истек.
   *
   * Этот метод проверяет действительность текущего refresh токена, удаляет его, затем генерирует новые access и refresh токены и возвращает их.
   */
  async refreshToken(token: string): Promise<LoginResponseDTO> {
    const refreshToken = await this.jwtUserService.refreshToken(token);
    if (!refreshToken) {
      this.AppLoggerLoki.error('Пользователь не смог зарефрешить токен', 'api');

      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.auth.errorTokenValid
      );
    }
    return refreshToken;
  }

  /**
   * Проверяет токен пользователя.
   * @param token Токен пользователя.
   * @returns {Promise<boolean>} Промис с результатом проверки токена.
   *
   * Этот метод проверяет валидность токена пользователя.
   */
  async verifyTokenUser(token: string): Promise<boolean> {
    return await this.jwtUserService.verifyTokenUser(token);
  }
}
