import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  IAccessTokenInput,
  IClientApiResult,
} from '@web-clients-backend/shared';
import { v4 as uuidv4 } from 'uuid';
import { IApiMeHealth } from './other/static.interface';
import { webClientsApiMethods } from './other/api-methods';

@Injectable()
export class ApimeIntegrationService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Проверяет состояние apime сервиса.
   * @returns `true`, если состояние apime сервиса успешное, иначе `false`.
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.httpService.axiosRef.get(
        webClientsApiMethods.health.apime_check,
        {
          headers: {
            TRACE_ID: uuidv4(),
            'Content-Type': 'application/json',
          },
        }
      );
      const data: IApiMeHealth = response.data;

      // if (!data.ApimeCorePkg) {
      //   this.loggerService.logging(ApimeIntegrationService, `Проверяем коннект к apime - bad`, 'warn');
      //   return false;
      // }
      // this.loggerService.logging(ApimeIntegrationService, `Проверяем коннект к apime - good`, 'debug');
      return true;
    } catch (error) {
      // console.log(error);

      // this.loggerService.logging(ApimeIntegrationService, `Проверяем коннект к apime - bad catch`, 'warn');

      return false;
    }
  }

  /**
   * Получает данные клиента по id абонента.
   * @param payload Входные данные с токеном доступа (`IAccessTokenInput`).
   * @returns Данные клиента (`IClientApiResult`) или `null` в случае ошибки или отсутствия данных.
   */
  async getClientData(
    payload: IAccessTokenInput,
    clientId: string
  ): Promise<IClientApiResult | null> {
    try {
      const response = await this.httpService.axiosRef.get(
        webClientsApiMethods.client.getClientById(clientId),
        {
          headers: {
            Authorization: `Bearer ${payload.access_token}`,
            TRACE_ID: payload.traceId?.traceID,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOTFOUND') {
        return null;
      }
      return null;
    }
  }
}
