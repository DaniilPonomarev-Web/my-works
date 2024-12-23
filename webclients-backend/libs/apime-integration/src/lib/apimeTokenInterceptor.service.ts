import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApimeIntegrationService } from './apime-integration.service';

/**
 * @class ApimeTokenInterceptor
 * @description Интерсептор для управления токеном API Me.
 * Этот интерсептор добавляет токен авторизации в заголовки запроса, если токен доступен.
 */
@Injectable()
export class ApimeTokenInterceptor implements NestInterceptor {
  /**
   * @constructor
   * @param {ApimeIntegrationService} apimeIntegrationService - Сервис для интеграции с API Me, используемый для получения токена.
   */
  constructor(
    private readonly apimeIntegrationService: ApimeIntegrationService
  ) {}

  /**
   * @method intercept
   * @description Метод, который перехватывает входящие запросы и добавляет токен авторизации, если он доступен.
   * @param {ExecutionContext} context - Контекст выполнения, содержащий информацию о текущем запросе.
   * @param {CallHandler} next - Обработчик вызова, который будет вызван после перехвата.
   * @returns {Observable<any>} Возвращает наблюдаемый объект, который будет использоваться для обработки запроса.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return this.apimeIntegrationService.getApimeToken().pipe(
    //   switchMap((token) => {
    //     if (token) {
    //       // Если токен доступен, добавляем его к запросу
    //       const request = context.switchToHttp().getRequest();
    //       request.headers['Authorization'] = `Bearer ${token.access_token}`;
    //     }
    //     return next.handle();
    //   }),
    // );
    return next.handle();
  }
}
