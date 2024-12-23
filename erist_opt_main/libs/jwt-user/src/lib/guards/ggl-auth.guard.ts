import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * Кастомный guard для аутентификации с использованием GraphQL контекста.
 * Наследуется от AuthGuard и использует стратегию локальной аутентификации ('local').
 */
@Injectable()
export class GglAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  /**
   * Переопределяет метод getRequest для извлечения запроса из GraphQL контекста.
   * @param context Контекст выполнения запроса.
   * @returns Запрос, извлеченный из GraphQL контекста.
   */
  override getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context); // Создание GraphQL контекста.
    const request = ctx.getContext(); // Получение контекста запроса из GraphQL контекста.
    request.body = ctx.getArgs().loginUserInput; // Установка тела запроса из аргументов GraphQL.
    return request; // Возвращает запрос.
  }
}
