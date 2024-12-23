import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @query
   * @name healthCheck
   * @description Проверка состояния сервиса. Возвращает статус "ok", если сервис работает корректно.
   * @returns {Object} Объект с полем `status`, указывающим состояние сервиса.
   */
  @Get('health')
  healthCheck(): object {
    return { status: 'ok' };
  }

  /**
   * @query
   * @name healthCheck2
   * @description Проверка состояния с дополнительным параметром. Принимает параметр `param` через запрос и возвращает его значение.
   * @param {string} param Параметр, переданный через строку запроса.
   * @returns {string} Значение параметра `param`, полученное через запрос.
   */
  @Get('health2')
  healthCheck2(@Query('param') param: string): string {
    return param;
  }
}
