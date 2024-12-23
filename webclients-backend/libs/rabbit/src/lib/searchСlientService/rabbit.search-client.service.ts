import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(
    @Inject('WEB_CLIENTS')
    private readonly webClientsClient: ClientProxy
  ) {}

  /**
   * Отправляет сообщение через RabbitMQ с заданной командой и полезной нагрузкой.
   *
   * Этот метод используется для отправки команды `cmd` в RabbitMQ с переданными данными `payload`.
   * Возвращает результат, ожидаемый в виде типа `T`.
   *
   * @template T - Тип данных, ожидаемых в ответе от RabbitMQ.
   *
   * @param cmd - Строка, представляющая команду, которая определяет действие на стороне RabbitMQ.
   * @param payload - Полезная нагрузка типа `T`, отправляемая в RabbitMQ. Это структура данных запроса.
   * @returns {Promise<T | null>} - Возвращает результат типа `T`, полученный от RabbitMQ,
   * или `null` в случае ошибки или отсутствия данных.
   *
   * @remarks
   * Этот метод является оберткой над RabbitMQ клиентом. Он отправляет сообщение через метод `send`,
   * который ожидает команду и полезную нагрузку, а затем преобразует потоковый ответ в `Promise`
   * с использованием `firstValueFrom`.
   *
   * Используй этот метод для выполнения операций, требующих асинхронного обмена данными через RabbitMQ.
   * Убедись, что структура запроса и ожидаемого ответа согласована между вашим приложением и RabbitMQ.
   */
  async sendMessage<T>(cmd: string, payload: T): Promise<T | null> {
    return await firstValueFrom(
      this.webClientsClient.send<T>({ cmd }, payload)
    );
  }
}
