import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionMessagesGraphQL } from '@erist-opt/shared';
import * as fs from 'fs';

/**
 * Кастомный guard для аутентификации с использованием JSON Web Tokens (JWT) и GraphQL контекста.
 * Наследуется от AuthGuard и использует стратегию JWT ('local').
 */
@Injectable()
export class JwtGuard extends AuthGuard('local') {
  /**
   * Создает экземпляр JwtGuard.
   * @param jwtService Сервис JSON Web Tokens (JWT).
   * @param config Сервис конфигурации.
   */
  constructor(private jwtService: JwtService, private config: ConfigService) {
    super();
  }
  /**
   * Переопределяет метод canActivate для выполнения аутентификации пользователя на основе JWT.
   * @param context Контекст выполнения запроса.
   * @returns Булево значение, указывающее, прошла ли аутентификация успешно.
   */
  override async canActivate(context: ExecutionContext) {
    // Чтение открытого ключа из файла или из переменной окружения.
    const publicKey = fs
      .readFileSync(process.env['JWT_ACCESS_TOKEN_PUBLIC_KEY'] || '123')
      .toString();

    const ctx = GqlExecutionContext.create(context).getContext(); // Создание GraphQL контекста.
    const authorizationHeader = ctx.req.headers.authorization; // Извлечение заголовка авторизации.
    if (!authorizationHeader) {
      return false; // В случае отсутствия заголовка возвращается false.
    }
    const token = authorizationHeader.split(' ')[1];
    try {
      // Верификация JWT с использованием открытого ключа.
      const user = await this.jwtService.verify(token, {
        publicKey: publicKey,
      });

      ctx.user = user; // Сохранение информации о пользователе в контексте.
      return true; // Возвращается true в случае успешной верификации JWT.
    } catch (error) {
      // В случае ошибки выбрасывается исключение с кодом 401 (UNAUTHORIZED).
      throw new HttpException(
        HttpExceptionMessagesGraphQL.auth.errorToken,
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
