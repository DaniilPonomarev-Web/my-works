import { Injectable } from '@nestjs/common';
import {
  generateStringFromDate,
  IMsisdn,
  ISearchUnlinkedMsisdnsPayload,
  ISearchUnlinkedMsisdnsResponse,
  SEARCH_UNLINKED_MSISDNS,
  UnlinkedMsisdnsDto,
} from '@web-clients-backend/shared';
import { RabbitMQService } from '@web-clients-backend/rabbit';
import { MsisdnFilterDTO, SortInputDTO } from './dto/payload.dto';

@Injectable()
export class SearchUnlinkedMsisdnsService {
  constructor(private readonly rabbitService: RabbitMQService) {}

  /**
   * Выполняет поиск несвязанных MSISDN (номеров) на основе заданных параметров.
   *
   * Этот метод отправляет запрос в RabbitMQ с заданной полезной нагрузкой `payload`
   * и получает ответ, содержащий данные о несвязанных MSISDN.
   *
   * @param payload - Полезная нагрузка типа `ISearchUnlinkedMsisdnsPayload`,
   * содержащая параметры поиска несвязанных MSISDN.
   * @returns {Promise<ISearchUnlinkedMsisdnsResponse | null>} - Возвращает объект ответа типа
   * `ISearchUnlinkedMsisdnsResponse`, содержащий данные о несвязанных MSISDN,
   * или `null`, если данные не были получены.
   *
   * @remarks
   * Этот метод использует `sendMessageSearch` из `rabbitService` для выполнения асинхронного запроса
   * через RabbitMQ. Убедись, что структура запроса и ответа согласована с RabbitMQ.
   */
  async searchUnlinkedMsisdns(
    payload: ISearchUnlinkedMsisdnsPayload
  ): Promise<ISearchUnlinkedMsisdnsResponse | null> {
    const data = await this.rabbitService.sendMessageSearch<
      ISearchUnlinkedMsisdnsPayload,
      ISearchUnlinkedMsisdnsResponse
    >(SEARCH_UNLINKED_MSISDNS, payload);
    if (!data) {
      return null;
    }
    return data;
  }

  /**
   * Нормализует массив MSISDN данных в стандартный формат.
   *
   * Этот метод обрабатывает массив объектов `IMsisdn`, извлекая необходимые поля
   * и преобразуя их в формат, соответствующий DTO `UnlinkedMsisdnsDto`.
   *
   * @param payload - Массив объектов типа `IMsisdn`, которые нужно нормализовать.
   * @returns {Promise<UnlinkedMsisdnsDto[]>} - Возвращает массив нормализованных объектов типа `UnlinkedMsisdnsDto`.
   *
   * @remarks
   * - Убедись, что входной массив `payload` не содержит `null` значений, иначе раскомментируй `.filter`.
   * - Каждое поле объекта проверяется на наличие данных, чтобы избежать ошибок.
   * - Используется вспомогательная функция `generateStringFromDate` для форматирования даты.
   */
  async normalizedMsisdns(payload: IMsisdn[]): Promise<UnlinkedMsisdnsDto[]> {
    return Promise.all(
      payload
        // .filter((data): data is IMsisdn => data !== null) // минус `null` //TODO
        .map(async (data) => ({
          status: data.state.name || null,
          dateStatus:
            (await generateStringFromDate(data.state.changedAt)) || null,
          msisdn: data.msisdn.toString() || null,
          region: data.region.name || null,
          categoryName: data.category.name || null,
          comment: data?.comment || '',
        }))
    );
  }

  /**
   * Сортирует массив объектов `UnlinkedMsisdnsDto` на основе указанных полей и направления.
   *
   * @param data - Массив объектов `UnlinkedMsisdnsDto`, которые нужно отсортировать.
   * @param sort - Объект `SortInputDTO`, содержащий параметры сортировки (поле и направление).
   * @returns {Promise<UnlinkedMsisdnsDto[]>} - Возвращает отсортированный массив объектов `UnlinkedMsisdnsDto`.
   *
   * @remarks
   * - Убедись, что поле сортировки `sort.field` и направление `sort.direction` заданы.
   * - Специальная обработка применяется для следующих полей:
   *   - `dateStatus`: сортируется по времени на основе даты.
   *   - `msisdn`: сортируется как числовое значение.
   * - Для всех остальных полей применяется строковая сортировка с использованием `localeCompare`.
   * - Если значения полей равны `null`, сортировка игнорируется.
   * - Если параметры сортировки не указаны, данные возвращаются без изменений.
   */
  async sort(
    data: UnlinkedMsisdnsDto[],
    sort?: SortInputDTO
  ): Promise<UnlinkedMsisdnsDto[]> {
    if (sort?.field && sort?.direction) {
      return data.sort((a, b) => {
        const field = sort.field as keyof UnlinkedMsisdnsDto;
        const valueA = a[field];
        const valueB = b[field];

        if (valueA === null || valueB === null) return 0;

        switch (sort.field) {
          case 'dateStatus': {
            const dateA = new Date(valueA).getTime();
            const dateB = new Date(valueB).getTime();
            return sort.direction === 'asc' ? dateA - dateB : dateB - dateA;
          }
          case 'msisdn': {
            const numA = parseInt(valueA, 10);
            const numB = parseInt(valueB, 10);
            return sort.direction === 'asc' ? numA - numB : numB - numA;
          }
          default: {
            return sort.direction === 'asc'
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
        }
      });
    }
    return data;
  }

  /**
   * Фильтрует массив объектов `UnlinkedMsisdnsDto` на основе заданных критериев.
   *
   * @param data - Массив объектов `UnlinkedMsisdnsDto`, которые нужно отфильтровать.
   * @param filter - Объект `MsisdnFilterDTO`, содержащий параметры фильтрации (статус, категория, регион).
   * @returns {Promise<UnlinkedMsisdnsDto[]>} - Возвращает массив объектов, соответствующих критериям фильтрации.
   *
   * @remarks
   * - Убедись, что фильтры в `MsisdnFilterDTO` заданы корректно.
   * - Фильтрация осуществляется следующим образом:
   *   - Если указан `filter.status`, данные фильтруются по совпадению статуса `item.status`.
   *   - Если указана `filter.category`, данные фильтруются по совпадению категории `item.categoryName`.
   *   - Если указан `filter.region`, данные фильтруются по совпадению региона `item.region`.
   * - Если ни один из фильтров не задан, возвращаются исходные данные.
   * - Логика фильтрации допускает пропуск критериев, что делает их необязательными.
   */
  async filter(
    data: UnlinkedMsisdnsDto[],
    filter?: MsisdnFilterDTO
  ): Promise<UnlinkedMsisdnsDto[]> {
    if (!filter) return data;

    return data.filter((item) => {
      const matchStatus = filter.status ? item.status === filter.status : true;
      const matchCategory = filter.category
        ? item.categoryName === filter.category
        : true;
      const matchRegion = filter.region ? item.region === filter.region : true;

      return matchStatus && matchCategory && matchRegion;
    });
  }
}
