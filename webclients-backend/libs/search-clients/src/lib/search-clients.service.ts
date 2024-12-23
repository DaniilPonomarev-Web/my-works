import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@web-clients-backend/rabbit';
import { LogsAndJournalsService } from '@web-clients-backend/logs';
import {
  IClientSearch,
  IClientSearchResult,
  IDataClientSearchResponse,
  IMonetaryClient,
  ISearchClientPayload,
  JuridicalTypeClientEnum,
  MarketSegmentEnum,
  SEARCH_CLIENT_ACCOUNT_NUMBER,
  SEARCH_CLIENT_BY_FIO,
  SEARCH_CLIENT_BY_PROCESSES,
  SEARCH_CLIENT_BY_SERVICES,
  SEARCH_CLIENT_BY_TARIFFS,
  SEARCH_CLIENT_BY_TITLE,
  SEARCH_CLIENT_CONTRACT_NUMBER,
  SEARCH_CLIENT_DGN,
  SEARCH_CLIENT_ICC,
  SEARCH_CLIENT_MSISDN,
  SEARCH_CLIENT_PASSPORT,
  SEARCH_CLIENT_SUBSCRIBER_NUMBER,
  SearchAreaEnum,
  StateClientEnum,
} from '@web-clients-backend/shared';
import { SortInput } from './other/clients.dto';

@Injectable()
export class SearchClientsService {
  constructor(
    private readonly rabbitService: RabbitMQService,
    private readonly logsAdminService: LogsAndJournalsService
  ) {}

  // async searchClientsByArea(
  //   payload: ISearchClientPayload,
  //   area: SearchAreaEnum
  // ): Promise<IDataClientSearchResponse | null> {
  //   switch (area) {
  //     /* Буквы */
  //     case SearchAreaEnum.FIO:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_BY_FIO,
  //         payload
  //       );
  //     case SearchAreaEnum.TITLE:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_BY_TITLE,
  //         payload
  //       );
  //     /* Наши данные */
  //     case SearchAreaEnum.PROCESSES:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_BY_PROCESSES,
  //         payload
  //       );
  //     case SearchAreaEnum.SERVICES:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_BY_SERVICES,
  //         payload
  //       );
  //     case SearchAreaEnum.TARIFFS:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_BY_TARIFFS,
  //         payload
  //       );

  //     /* Цифры */
  //     case SearchAreaEnum.SUBSCRIBER_NUMBER:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_SUBSCRIBER_NUMBER,
  //         payload
  //       );
  //     case SearchAreaEnum.MSISDN:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_MSISDN,
  //         payload
  //       );
  //     case SearchAreaEnum.PASSPORT:
  //       if (payload.input.toString().length < 10) {
  //         throw new HttpException(
  //           'Введите корректный номер документа',
  //           HttpStatus.BAD_REQUEST
  //         );
  //       }
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_PASSPORT,
  //         payload
  //       );
  //     case SearchAreaEnum.ACCOUNT_NUMBER:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_ACCOUNT_NUMBER,
  //         payload
  //       );
  //     case SearchAreaEnum.CONTRACT_NUMBER:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_CONTRACT_NUMBER,
  //         payload
  //       );
  //     case SearchAreaEnum.DGN:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_DGN,
  //         payload
  //       );
  //     case SearchAreaEnum.ICC:
  //       return await this.rabbitService.sendMessageSearch(
  //         SEARCH_CLIENT_ICC,
  //         payload
  //       );

  //     default:
  //       return null;
  //   }
  // }

  /**
   * Производит поиск клиентов по заданной области.
   *
   * @param payload - Параметры запроса для поиска клиентов (`ISearchClientPayload`).
   * @param area - Область поиска клиента, например, FIO, TITLE, PROCESSES и так далее (`SearchAreaEnum`).
   * @returns {Promise<IDataClientSearchResponse | null>} - Возвращает результат поиска в виде данных клиента (`IDataClientSearchResponse`) или `null`, если поиск не дал результатов.
   *
   * @remarks
   * - Для выполнения поиска используется карта `searchMap`, которая связывает `SearchAreaEnum` с соответствующей командой в `rabbitService`.
   * - Если поиск возвращает `null`, значит, клиентов не найдено.
   * - Функция отправляет сообщение через `rabbitService` с указанной командой и полученными данными, затем обрабатывает результаты.
   */
  async searchClientsByArea(
    payload: ISearchClientPayload,
    area: SearchAreaEnum
  ): Promise<IDataClientSearchResponse | null> {
    const searchMap = {
      [SearchAreaEnum.FIO]: SEARCH_CLIENT_BY_FIO,
      [SearchAreaEnum.TITLE]: SEARCH_CLIENT_BY_TITLE,
      [SearchAreaEnum.PROCESSES]: SEARCH_CLIENT_BY_PROCESSES,
      [SearchAreaEnum.SERVICES]: SEARCH_CLIENT_BY_SERVICES,
      [SearchAreaEnum.TARIFFS]: SEARCH_CLIENT_BY_TARIFFS,
      [SearchAreaEnum.SUBSCRIBER_NUMBER]: SEARCH_CLIENT_SUBSCRIBER_NUMBER,
      [SearchAreaEnum.MSISDN]: SEARCH_CLIENT_MSISDN,
      [SearchAreaEnum.PASSPORT]: SEARCH_CLIENT_PASSPORT,
      [SearchAreaEnum.ACCOUNT_NUMBER]: SEARCH_CLIENT_ACCOUNT_NUMBER,
      [SearchAreaEnum.CONTRACT_NUMBER]: SEARCH_CLIENT_CONTRACT_NUMBER,
      [SearchAreaEnum.DGN]: SEARCH_CLIENT_DGN,
      [SearchAreaEnum.ICC]: SEARCH_CLIENT_ICC,
    };
    const data = await this.rabbitService.sendMessageSearch<
      ISearchClientPayload,
      IDataClientSearchResponse
    >(searchMap[area], payload);

    if (!data) {
      return null;
    }
    return data;
  }

  /**
   * Нормализует данные о клиентах для упрощенной модели.
   *
   * @param clients - Массив объектов результатов поиска клиентов (`IClientSearchResult[]`).
   * @returns {Promise<IClientSearch[]>} - Преобразованные данные о клиентах в упрощенном формате (`IClientSearch[]`).
   *
   * @remarks
   * - Функция преобразует каждый объект `IClientSearchResult` в объект `IClientSearch`.
   * - Основной баланс клиента ищется в массиве `client.balance.monetary` и возвращается `null`, если не найден.
   * - Если у клиента есть подписчики, то сначала пытается получить основной номер `msisdn`. Если он отсутствует, то возвращает `null`.
   * - Данные паспорта собираются из полей `client.document`.
   * - Ожидается, что у клиента может отсутствовать информация о подписчиках, дополнительном телефоне и ICCID.
   */
  async normalizeClient(
    clients: IClientSearchResult[]
  ): Promise<IClientSearch[]> {
    const data = clients.map((client: IClientSearchResult) => {
      let mainBalance = null;

      if (client.balance?.monetary?.length) {
        mainBalance =
          (client.balance.monetary as IMonetaryClient[]).find(
            (monetary) => monetary.name === 'Основной баланс'
          )?.value ?? null;
      }

      //TODO сабскрайберов может быть не быть
      return {
        fio: client.name.unstructured,
        msisdn: client.subscribers?.[0]?.msisdn
          ? Number(client.subscribers[0].msisdn)
          : null,
        balance: mainBalance,
        birthDate: client.birthDate || null,
        passport: {
          serialNumber:
            client.document && client.document.series && client.document.number
              ? client.document.series + ' ' + client.document.number
              : null,
          date: client.document ? client.document.issueDate : null,
        },
        additionalPhone: client.subscribers?.[0]?.additionalPhoneNumber
          ? Number(client.subscribers[0].additionalPhoneNumber)
          : null,
        region: client.subscribers?.[0]?.region ?? null,
        iccId: client.subscribers?.[0]?.equipment?.iccId
          ? Number(client.subscribers[0].equipment.iccId)
          : null,
        account: client.account,
        juridicalType: client.juridicalType,
        contractNumber: client.contractNumber,
        segment: client.clientType,
        state: client.state,
      };
    });

    return data;
  }

  /**
   * Фильтрует клиентов по заданным критериям сегмента, юридического типа и состояния контракта.
   *
   * @param clients - Массив клиентов для фильтрации (`IClientSearch[]`).
   * @param segmentType - Тип сегмента клиента (`MarketSegmentEnum`).
   * @param juridicalType - Тип клиента (юридический или физический) (`JuridicalTypeClientEnum`).
   * @param clientState - Состояние контракта клиента (`StateClientEnum`).
   * @returns {Promise<IClientSearch[]>} - Фильтрованный массив клиентов, соответствующих заданным критериям.
   *
   * @remarks
   * - Функция фильтрует клиентов по трем параметрам: тип сегмента (`segmentType`), юридический тип (`juridicalType`) и состояние контракта (`clientState`).
   * - Если какой-либо из параметров не указан, он пропускается при фильтрации.
   * - Вернет клиентов, которые соответствуют всем указанным критериям.
   */
  async filterClients(
    clients: IClientSearch[],
    segmentType?: MarketSegmentEnum,
    juridicalType?: JuridicalTypeClientEnum,
    clientState?: StateClientEnum
  ): Promise<IClientSearch[]> {
    // console.warn(segmentType, juridicalType, clientState);
    return clients.filter((client) => {
      const matchesJuridicalType = juridicalType
        ? client.juridicalType === juridicalType
        : true;

      const matchesContractState = clientState
        ? client.state === clientState
        : true;

      const matchesJuridicalTypeState = segmentType
        ? client.segment === segmentType
        : true;

      return (
        matchesJuridicalType &&
        matchesContractState &&
        matchesJuridicalTypeState
      );
    });
  }

  /**
   * Сортирует клиентов по заданным параметрам.
   *
   * @param clients - Массив клиентов для сортировки (`IClientSearch[]`).
   * @param sort - Объект с параметрами сортировки (`SortInput`), содержащий поле (`field`) и направление (`direction`).
   * @returns {Promise<IClientSearch[]>} - Отсортированный массив клиентов.
   *
   * @remarks
   * - Функция сортирует клиентов в зависимости от заданного поля (`field`) и направления (`direction`).
   * - Для поля `passport.serialNumber` производится приведение строки к числу, удаляя пробелы.
   * - Поддерживаемые типы данных для сортировки: строка (`string`), число (`number`) и дата (`Date`).
   * - Сортировка строки производится с учетом локали (коллекция строк).
   * - Сортировка чисел и дат производится в соответствии с указанным направлением: возрастание или убывание.
   */
  async sortClients(
    clients: IClientSearch[],
    sort: SortInput
  ): Promise<IClientSearch[]> {
    const { field, direction } = sort;

    return clients.sort((a, b) => {
      let valA = a[field as keyof IClientSearch];
      let valB = b[field as keyof IClientSearch];

      // обработка для serialNumber (убираем пробелы и приводим к числу)
      if (field === 'passport.serialNumber') {
        valA = parseInt((a.passport.serialNumber || '').replace(/\s/g, ''), 10);
        valB = parseInt((b.passport.serialNumber || '').replace(/\s/g, ''), 10);
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }

      if (valA instanceof Date && valB instanceof Date) {
        return direction === 'asc'
          ? +new Date(valA) - +new Date(valB)
          : +new Date(valB) - +new Date(valA);
      }

      return 0;
    });
  }
}
