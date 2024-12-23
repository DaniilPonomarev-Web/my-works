import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { webClientsApiMethods } from '../other/api-methods';
import {
  generateDocumentPassport,
  IDataClientSearchResponse,
  ISearchClientPayload,
  ISearchUnlinkedMsisdnsPayload,
  ISearchUnlinkedMsisdnsResponse,
} from '@web-clients-backend/shared';

@Injectable()
export class SearchApimeService {
  constructor(private readonly httpService: HttpService) {}

  async searchClientByFIO(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const data = {
        unstructured: payload.input.toString(),
      };
      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.byName,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

  async searchClientBySubscriberNumber(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const data = {
        msisdn: payload.input.toString(),
      };
      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.byMsisdn,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

  async searchClientByMsisdn(
    //TODO откуда свободный взять
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const data = {
        msisdn: payload.input.toString(),
      };
      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.byMsisdn,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

  async searchClientByPassport(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const document = await generateDocumentPassport(payload.input.toString());
      const data = { document };

      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.byDocument,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

  async searchClientByAccount(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const data = {
        account: payload.input,
      };
      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.byAccount,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

  async searchClientByContract(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const data = {
        contractNumber: payload.input.toString(),
      };
      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.byContract,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

  async searchClientByDGN(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const data = {
        additionalPhoneNumber: payload.input.toString(),
      };
      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.additionalPhoneNumber,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

  async searchClientIcc(
    payload: ISearchClientPayload
  ): Promise<IDataClientSearchResponse | null> {
    try {
      const data = {
        sim: {
          iccId: payload.input.toString(),
          imsi: null,
        },
      };
      const response = await this.httpService.axiosRef.post(
        webClientsApiMethods.search.clients.byEquipment,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Real-Ip': '127.0.0.1',
            TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
            Authorization: `Bearer ${payload.tokenInput.access_token}`,
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

      if (response.data.msisdns.length === 0) {
        return null;
      }
      return response.data.msisdns;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOTFOUND') {
        return null;
      }
      return null;
    }
  }
}
