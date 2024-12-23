import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  generateDocumentPassport,
  IAddressTypesResponse,
  IBillingDeliveryTypesResponse,
  ICityTypesResponse,
  IClientTypesResponse,
  ICountryTypesResponse,
  IDistrictTypesResponse,
  IDocumentTypesResponse,
  IJuridicalTypesResponse,
  IRegionTypesResponse,
  ISearchClientPayload,
  IStreetTypesResponse,
} from '@web-clients-backend/shared';
import { webClientsApiMethods } from '../other/api-methods';

interface IRequestParams {
  data: Record<string, any>;
}

@Injectable()
export class SearchDictionaryService {
  constructor(private readonly httpService: HttpService) {}

  private async requestHandler<T>(
    payload: ISearchClientPayload,
    url: string,
    { data }: IRequestParams
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
      return null;
    }
  }

  async searchClientJuridicalType(
    payload: ISearchClientPayload
  ): Promise<IJuridicalTypesResponse | null> {
    return this.requestHandler<IJuridicalTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.client.juridicalType,
      {
        data: { unstructured: payload.input },
      }
    );
  }

  async searchClientType(
    payload: ISearchClientPayload
  ): Promise<IClientTypesResponse | null> {
    return this.requestHandler<IClientTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.client.clientType,
      {
        data: { msisdn: payload.input },
      }
    );
  }

  async searchClientDocumentType(
    payload: ISearchClientPayload
  ): Promise<IDocumentTypesResponse | null> {
    return this.requestHandler<IDocumentTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.client.documentType,
      {
        data: { msisdn: payload.input },
      }
    );
  }

  async searchClientAddressType(
    payload: ISearchClientPayload
  ): Promise<IAddressTypesResponse | null> {
    return this.requestHandler<IAddressTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.client.addressType,
      {
        data: { document: generateDocumentPassport(payload.input.toString()) },
      }
    );
  }

  async searchClientBillingDeliveryType(
    payload: ISearchClientPayload
  ): Promise<IBillingDeliveryTypesResponse | null> {
    return this.requestHandler<IBillingDeliveryTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.client.billingDeliveryType,
      {
        data: { account: payload.input },
      }
    );
  }

  async searchAddressCountry(
    payload: ISearchClientPayload
  ): Promise<ICountryTypesResponse | null> {
    return this.requestHandler<ICountryTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.address.country,
      {
        data: { contractNumber: payload.input },
      }
    );
  }

  async searchAddressRegionType(
    payload: ISearchClientPayload
  ): Promise<IRegionTypesResponse | null> {
    return this.requestHandler<IRegionTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.address.regionType,
      {
        data: { contractNumber: payload.input },
      }
    );
  }

  async searchAddressDistrictType(
    payload: ISearchClientPayload
  ): Promise<IDistrictTypesResponse | null> {
    return this.requestHandler<IDistrictTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.address.districtType,
      {
        data: { additionalPhoneNumber: payload.input },
      }
    );
  }

  async searchAddressCityType(
    payload: ISearchClientPayload
  ): Promise<ICityTypesResponse | null> {
    return this.requestHandler<ICityTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.address.cityType,
      {
        data: {
          sim: { iccId: payload.input, imsi: null },
        },
      }
    );
  }

  async searchAddressStreetType(
    payload: ISearchClientPayload
  ): Promise<IStreetTypesResponse | null> {
    return this.requestHandler<IStreetTypesResponse>(
      payload,
      webClientsApiMethods.dictionary.address.streetType,
      {
        data: {
          sim: { iccId: payload.input, imsi: null },
        },
      }
    );
  }
}
