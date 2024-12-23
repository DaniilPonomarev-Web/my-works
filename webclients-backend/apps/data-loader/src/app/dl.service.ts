import { Injectable, Logger } from '@nestjs/common';
import { ApimeIntegrationService } from '@web-clients-backend/apime-integration';
import {
  IAccessTokenInput,
  IClientApiResult,
} from '@web-clients-backend/shared';

/**
 * @service DLService
 * @description Сервис для обработки логики очереди data-loader
 */
@Injectable()
export class DLService {
  private readonly logger = new Logger(DLService.name);

  constructor(
    private readonly apimeIntegrationService: ApimeIntegrationService
  ) {}

  /**
   * @method getClientData
   * @description Получает данные клиента по токену доступа.
   * @param {IAccessTokenInput} payload - Входные данные, содержащие токен доступа для получения данных клиента.
   * @returns {Promise<ClientData | null>} - Возвращает данные клиента или null, если клиент не найден.
   */

  async getClientData(
    payload: IAccessTokenInput,
    clientId: string
  ): Promise<IClientApiResult | null> {
    const result = await this.apimeIntegrationService.getClientData(
      payload,
      clientId
    );
    if (!result) {
      return null;
    }
    return result;
  }
}
