import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Обработчик исключений HTTP в NestJS.
 * Перехватывает все HttpException и возвращает подробную информацию в JSON формате.
 */
@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  /**
   * Метод обработки исключений.
   * @param exception - Перехваченное исключение.
   * @param host - Объект, представляющий текущий контекст запроса.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // Переключаемся на HTTP-контекст.
    const response = ctx.getResponse<Response>(); // Получаем объект ответа.
    const request = ctx.getRequest<Request>(); // Получаем объект запроса.
    const status = exception.getStatus(); // Извлекаем статус HTTP ошибки.
    const contextType = host.getType(); // Определяем тип контекста (например, HTTP).

    // Проверяем тип контекста.
    if (contextType === 'http') {
      // Формируем JSON ответ с подробной информацией об исключении.
      return response.status(status).json({
        statusCode: status, // HTTP статус ошибки.
        message: exception.message, // Сообщение исключения.
        path: request.url, // URL текущего запроса.
        method: request.method, // HTTP метод запроса.
        timestamp: new Date().toISOString(), // Временная метка исключения.
      });
    }

    // Если ошибка не относится к HTTP ошибкам, то просто возвращаем null.
    if (status >= 400 && status < 600) {
      return null;
    }

    // Формируем стандартный JSON ответ для HTTP ошибок.
    return response.status(status).json({
      statusCode: status,
      message: exception.message,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}
