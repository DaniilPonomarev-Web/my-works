import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  generateDocumentPassport,
  IDataClientSearchResponse,
  ISearchClientPayload,
  ISearchUnlinkedMsisdnsPayload,
  ISearchUnlinkedMsisdnsResponse,
} from '@web-clients-backend/shared';
import { webClientsApiMethods } from '../other/api-methods';

@Injectable()
export class SearchApimeService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Метод для поиска клиента по ФИО.
   * @param payload - Данные запроса, содержащие входные данные для поиска.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientByFIO(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return await this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.byName,
      { unstructured: payload.input }
    );
  }

  /**
   * Метод для поиска клиента по номеру абонента.
   * @param payload - Данные запроса, содержащие входной номер абонента.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientBySubscriberNumber(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return await this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.byMsisdn,
      { msisdn: payload.input }
    );
  }

  /**
   * Метод для поиска клиента по номеру MSISDN.
   * @param payload - Данные запроса, содержащие входной номер MSISDN.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientByMsisdn(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return await this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.byMsisdn,
      { msisdn: payload.input }
    );
  }

  /**
   * Метод для поиска клиента по паспорту.
   * @param payload - Данные запроса, содержащие входной паспорт.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientByPassport(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return await this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.byDocument,
      await generateDocumentPassport(payload.input.toString())
    );
  }

  /**
   * Метод для поиска клиента по номеру счета.
   * @param payload - Данные запроса, содержащие входной номер счета.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientByAccount(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return await this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.byAccount,
      { account: payload.input }
    );
  }

  /**
   * Метод для поиска клиента по номеру договора.
   * @param payload - Данные запроса, содержащие входной номер договора.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientByContract(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return await this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.byContract,
      { contractNumber: payload.input }
    );
  }

  /**
   * Метод для поиска клиента по дополнительному номеру телефона (DGN).
   * @param payload - Данные запроса, содержащие входной дополнительный номер телефона.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientByDGN(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return await this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.additionalPhoneNumber,
      { additionalPhoneNumber: payload.input }
    );
  }

  /**
   * Метод для поиска клиента по ICC.
   * @param payload - Данные запроса, содержащие входной ICC.
   * @returns - Результат поиска клиента или `null` если клиент не найден.
   */
  async searchClientIcc(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    return this.requestHandler<IDataClientSearchResponse>(
      payload,
      webClientsApiMethods.search.clients.byEquipment,
      {
        sim: { iccId: payload.input, imsi: null },
      }
    );
  }

  /**
   * Обрабатывает запрос на основе переданных параметров, отправляя HTTP POST-запрос и возвращая результат.
   *
   * @param payload - Параметры запроса, содержащие токены для авторизации (`ISearchClientPayload`).
   * @param url - URL для выполнения HTTP-запроса.
   * @param data - Данные для отправки в теле запроса.
   * @returns {Promise<T | null>} - Возвращает данные типа `T` или `null` в случае ошибки.
   *
   * @remarks
   * - Функция выполняет POST-запрос к переданному URL с заголовками для Content-Type и авторизации.
   * - При возникновении ошибки, например, если сервер недоступен, возвращает `null` и логирует ошибку в консоль.
   */
  private async requestHandler<T>(
    payload: ISearchClientPayload,
    url: string,
    data: Record<string, any>
  ): Promise<T | null> {
    try {
      const response = await this.httpService.axiosRef.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
          Authorization: `Bearer ${payload.tokenInput.access_token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error during API request to ${url}`);
      console.warn(error);

      return null;
    }
  }

  /**
   * Производит поиск свободных номеров по заданным параметрам с использованием HTTP GET-запроса.
   *
   * @param payload - Параметры запроса, содержащие токены для авторизации и данные для поиска (`ISearchUnlinkedMsisdnsPayload`).
   * @returns {Promise<T | null>} - Возвращает список свободных номеров (`T`), или `null` в случае ошибки.
   *
   * @remarks
   * - Функция выполняет GET-запрос к эндпоинту для поиска свободных номеров.
   * - Заголовки включают `TRACE_ID` и `Authorization` для аутентификации запроса.
   * - Если данные в ответе пусты или произошла ошибка подключения, функция возвращает `null`.
   */
  async searchUnlinkedMsisdns<T = ISearchUnlinkedMsisdnsResponse>(
    payload: ISearchUnlinkedMsisdnsPayload
  ): Promise<T | null> {
    try {
      const response = await this.httpService.axiosRef.get(
        webClientsApiMethods.search.freeMsisdns(payload),
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
          },
        }
      );
      // console.warn(response);

      if (response.data.msisdns.length === 0) {
        return null;
      }
      return response.data.msisdns;
    } catch (error) {
      // console.warn(error);
      if ((error as NodeJS.ErrnoException).code === 'ENOTFOUND') {
        return null;
      }
      return null;
    }
  }
}
