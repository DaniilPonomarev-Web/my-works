import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DLService } from './dl.service';
import {
  GET_CLIENT,
  IAccessTokenInput,
  IClientApiResult,
  IDataClientSearchResponse,
  ISearchClientPayload,
  ISearchUnlinkedMsisdnsPayload,
  ISearchUnlinkedMsisdnsResponse,
  SEARCH_CLIENT_ACCOUNT_NUMBER,
  SEARCH_CLIENT_BY_FIO,
  SEARCH_CLIENT_BY_TITLE,
  SEARCH_CLIENT_CONTRACT_NUMBER,
  SEARCH_CLIENT_DGN,
  SEARCH_CLIENT_ICC,
  SEARCH_CLIENT_MSISDN,
  SEARCH_CLIENT_PASSPORT,
  SEARCH_CLIENT_SUBSCRIBER_NUMBER,
  SEARCH_UNLINKED_MSISDNS,
} from '@web-clients-backend/shared';
import {
  ApimeIntegrationService,
  SearchApimeService,
} from '@web-clients-backend/apime-integration';

/**
 * @controller DLMessagePattern
 * @description Контроллер для обработки сообщений очереди data-loader
 */
@Controller()
export class DLMessagePattern {
  constructor(
    private readonly dlService: DLService,
    private readonly apimeIntegrationService: ApimeIntegrationService,
    private readonly searchApimeService: SearchApimeService
  ) {}

  /**
   * @method getClientData
   * @description Обрабатывает запрос на получение данных клиента по токену доступа.
   * @param {IAccessTokenInput} payload - Входные данные, содержащие токен доступа для получения данных клиента.
   * @returns {Promise<ClientData | null>} - Возвращает данные клиента или null, если клиент не найден.
   */
  @MessagePattern({ cmd: GET_CLIENT })
  async getClientData(
    @Payload() tokenData: IAccessTokenInput,
    @Payload() clientId: string
  ): Promise<IClientApiResult | null> {
    console.debug('getClientData ' + DLMessagePattern.name);
    const result = await this.dlService.getClientData(tokenData, clientId);
    if (!result) {
      return null;
    }
    return result;
  }

  /**
   * ПОИСК TODO
   */
  @MessagePattern({ cmd: SEARCH_CLIENT_BY_FIO })
  async searchClientByName(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    const result = await this.searchApimeService.searchClientByFIO(payload);
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_CLIENT_BY_TITLE })
  async searchClientByTitle(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientByTitle ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientByFIO(payload); //TOOD я хз почему один метод
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_CLIENT_SUBSCRIBER_NUMBER })
  async searchClientBySubscriberNumber(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientBySubscriberNumber ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientBySubscriberNumber(
      payload
    );
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_CLIENT_MSISDN })
  async searchClientByMsisdn(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientByMsisdn ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientByMsisdn(payload);
    if (!result) {
      return null;
    }
    return result;
  }
  @MessagePattern({ cmd: SEARCH_CLIENT_PASSPORT })
  async searchClientByPassport(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientByPassport ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientByPassport(
      payload
    );
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_CLIENT_ACCOUNT_NUMBER })
  async searchClientByAccount(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientByAccount ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientByAccount(payload);
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_CLIENT_CONTRACT_NUMBER })
  async searchClientByContract(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientByContract ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientByContract(
      payload
    );
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_CLIENT_DGN })
  async searchClientByDGN(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientByDGN ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientByDGN(payload);
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_CLIENT_ICC })
  async searchClientIcc(
    @Payload() payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    console.debug('searchClientIcc ' + DLMessagePattern.name);
    const result = await this.searchApimeService.searchClientIcc(payload);
    if (!result) {
      return null;
    }
    return result;
  }

  @MessagePattern({ cmd: SEARCH_UNLINKED_MSISDNS })
  async searchUnlinkedMsisdns(
    @Payload() payload: ISearchUnlinkedMsisdnsPayload
  ): Promise<ISearchUnlinkedMsisdnsResponse | null> {
    console.debug('searchClientIcc:');
    const result = await this.searchApimeService.searchUnlinkedMsisdns(payload);

    if (!result) {
      return null;
    }
    return result;
  }
}
