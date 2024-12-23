import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
/**
 * Кастомный guard для аутентификации с использованием JSON Web Tokens (JWT) и GraphQL контекста.
 * Наследуется от AuthGuard и использует стратегию JWT ('jwt').
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Переопределяет метод getRequest для извлечения запроса из GraphQL контекста.
   * @param context Контекст выполнения запроса.
   * @returns Запрос, извлеченный из GraphQL контекста.
   */
  override getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req;
  }
}
