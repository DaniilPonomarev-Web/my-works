import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * @query
   * @name getData
   * @description Возвращает объект с сообщением. Используется для проверки работы API.
   * @returns {Object} Объект с полем `message`, содержащим приветственное сообщение.
   */
  getData(): { message: string } {
    return { message: 'Hello BACC' };
  }
}
