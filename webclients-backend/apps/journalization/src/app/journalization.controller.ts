import { Controller } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_LOG,
  GET_LOGS,
  ISearchJournal,
} from '@web-clients-backend/shared';
import { JournalizatingService } from '@web-clients-backend/journalizating';

@Controller()
export class JournalizationController {
  constructor(private readonly journalizatingService: JournalizatingService) {}

  /**
   * @description Обрабатывает событие создания лога, полученное по шаблону события CREATE_LOG.
   * Журналируется входящее сообщение и вызывается метод для создания лога в сервисе.
   * @param {any} data - Данные, полученные из события для создания лога.
   * @returns {Promise<void>} Возвращает пустое обещание после обработки и создания лога.
   */
  @EventPattern(CREATE_LOG)
  async handleJournalization(@Payload() data: any) {
    console.log('CreateLog data:', data);
    await this.journalizatingService.createLog(data);
  }

  /**
   * @description Обрабатывает сообщение для получения логов по запросу GET_LOGS.
   * Выполняет поиск логов по параметрам, используя переданные фильтры.
   * @param {ISearchJournal} payload - Объект фильтров для поиска логов.
   * @returns {Promise<IJournal[] | null>} Возвращает массив найденных логов или null, если результатов нет.
   */
  @MessagePattern({ cmd: GET_LOGS })
  async handleGetLogs(payload: ISearchJournal) {
    const logs = await this.journalizatingService.searchLogs(payload);
    return logs;
  }
}
