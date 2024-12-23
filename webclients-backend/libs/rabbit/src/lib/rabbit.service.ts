import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  IAccessTokenInput,
  GET_CLIENT,
  ISearchClientPayload,
  ISearchJournal,
  IJournal,
  GET_LOGS,
  IClientApiResult,
  ISearchUnlinkedMsisdnsPayload,
  ISearchUnlinkedMsisdnsResponse,
} from '@web-clients-backend/shared';
import { firstValueFrom } from 'rxjs';
import { SearchService } from './searchСlientService/rabbit.search-client.service';

/**
 * @service RabbitMQService
 * @description Сервис для взаимодействия с RabbitMQ.
 * Позволяет отправлять и получать сообщения через микросервисные клиенты.
 */
@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('WEB_CLIENTS') // Внедрение клиента для работы с API клиентов
    private readonly webClientsClient: ClientProxy,
    @Inject('JOURNALIZATION') // Внедрение клиента для отправки данных в систему журналирования
    private readonly journalizationClient: ClientProxy,
    private readonly searchService: SearchService
  ) {}

  /**
   * Получает данные клиента через API /clients.
   * @param payload - Данные для запроса клиента, реализующие интерфейс IAccessTokenInput.
   * @returns {Promise<ClientData | null>} - Возвращает данные клиента или null в случае ошибки.
   */
  async getClient(
    payload: IAccessTokenInput,
    clientId: string
  ): Promise<IClientApiResult | null> {
    return await firstValueFrom(
      this.webClientsClient.send({ cmd: GET_CLIENT }, { payload, clientId })
    );
  }

  /**
   * Отправка сообщения и получение ответа по заданным параметрам.
   *
   * Этот метод отправляет данные в RabbitMQ с указанной командой `cmd` и полезной нагрузкой `payload`,
   * а затем возвращает результат, тип которого ожидается как `R`.
   *
   * @template P - Тип полезной нагрузки (payload), отправляемой в RabbitMQ.
   * @template R - Тип ответа, который возвращается после обработки сообщения RabbitMQ.
   *
   * @param cmd - Команда, определяющая действие, которое должно быть выполнено на стороне RabbitMQ.
   * @param payload - Данные для запроса, соответствующие типу `P`. Это структура, отправляемая в RabbitMQ.
   * @returns {Promise<R | null>} - Возвращает результат типа `R` или `null`, если что-то пошло не так.
   *
   * @remarks
   * Важно понимать, что тип `P` (payload) и тип `R` (результат) не связаны напрямую.
   * В данном методе выполняется приведение типа `payload` к `R` через конструкцию `as unknown as R`,
   * чтобы удовлетворить требования метода `sendMessage`. Это безопасно, потому что:
   * 1. `payload` просто отправляется в RabbitMQ, не изменяя своей структуры.
   * 2. Ответ, возвращаемый RabbitMQ, интерпретируется как `R`, согласно ожиданиям.
   *
   * Используй этот метод, если уверены, что соответствие между запросом `P` и ответом `R` гарантировано
   * логикой работы RabbitMQ.
   */
  async sendMessageSearch<P, R>(cmd: string, payload: P): Promise<R | null> {
    // payload остается типом P
    return await this.searchService.sendMessage<R>(
      cmd,
      payload as unknown as R
    );
  }

  /**
   * Отправляет запрос для получения журналов в систему журналирования.
   * @param payload - Данные для поиска журналов, реализующие интерфейс ISearchJournal.
   * @returns {Promise<IJournal[] | null>} - Возвращает массив журналов или null в случае ошибки.
   */
  async sendToJournalization(
    payload: ISearchJournal
  ): Promise<IJournal[] | null> {
    const data = payload;
    return await firstValueFrom(
      this.journalizationClient.send({ cmd: GET_LOGS }, data)
    );
  }

  /**
   * Отправляет событие в систему журналирования.
   * @param event - Имя события.
   * @param data - Данные события.
   * @returns {Promise<void>} - Возвращает пустое значение при успешной отправке.
   */
  async emitToJournalization(event: string, data: any): Promise<void> {
    return firstValueFrom(this.journalizationClient.emit(event, data));
  }
}
