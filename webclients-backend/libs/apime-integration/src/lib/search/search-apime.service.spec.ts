import { Test, TestingModule } from '@nestjs/testing';
import { SearchApimeService } from './search-apime.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosHeaders } from 'axios';
import * as Utils from '@web-clients-backend/shared';
import {
  ISearchClientPayload,
  IDataClientSearchResponse,
} from '@web-clients-backend/shared';
import { webClientsApiMethods } from '../other/api-methods';

jest.mock('@web-clients-backend/shared', () => ({
  generateDocumentPassport: jest.fn(), // Создаём глобальный мок для всех тестов
}));

describe('SearchApimeService - Parameterized Tests', () => {
  let service: SearchApimeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const mockHttpService = {
      axiosRef: {
        post: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchApimeService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<SearchApimeService>(SearchApimeService);
    httpService = module.get<HttpService>(HttpService);

    // Мокируем `generateDocumentPassport` перед каждым тестом
    (Utils.generateDocumentPassport as jest.Mock).mockResolvedValue({
      series: '1234',
      number: '567890',
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Очищаем вызовы моков после каждого теста
  });

  const testCases = [
    {
      method: 'searchClientByFIO',
      url: webClientsApiMethods.search.clients.byName,
      requestData: { unstructured: 'Де Алмейда Жайм%' },
      input: 'Де Алмейда Жайм%',
    },
    {
      method: 'searchClientBySubscriberNumber',
      url: webClientsApiMethods.search.clients.byMsisdn,
      requestData: { msisdn: '1234567890' },
      input: '1234567890',
    },
    {
      method: 'searchClientByMsisdn',
      url: webClientsApiMethods.search.clients.byMsisdn,
      requestData: { msisdn: '1234567890' },
      input: '1234567890',
    },
    {
      method: 'searchClientByPassport',
      url: webClientsApiMethods.search.clients.byDocument,
      requestData: { series: '1234', number: '567890' },
      input: '1234 567890',
    },
    {
      method: 'searchClientByAccount',
      url: webClientsApiMethods.search.clients.byAccount,
      requestData: { account: '987654321' },
      input: '987654321',
    },
    {
      method: 'searchClientByContract',
      url: webClientsApiMethods.search.clients.byContract,
      requestData: { contractNumber: 'CONTRACT123' },
      input: 'CONTRACT123',
    },
    {
      method: 'searchClientByDGN',
      url: webClientsApiMethods.search.clients.additionalPhoneNumber,
      requestData: { additionalPhoneNumber: '2141245215215' },
      input: '2141245215215',
    },
    {
      method: 'searchClientIcc',
      url: webClientsApiMethods.search.clients.byEquipment,
      requestData: { sim: { iccId: '421421r214214', imsi: null } },
      input: '421421r214214',
    },
  ];

  type SearchMethod =
    | 'searchClientByFIO'
    | 'searchClientBySubscriberNumber'
    | 'searchClientByMsisdn'
    | 'searchClientByPassport'
    | 'searchClientByAccount'
    | 'searchClientByContract'
    | 'searchClientByDGN'
    | 'searchClientIcc';

  beforeEach(() => {
    jest.resetAllMocks(); // Сброс моков перед каждым тестом
  });

  testCases.forEach(({ method, url, requestData, input }) => {
    it(`${method} следует вызвать правильную конечную точку с правильными данными`, async () => {
      const payload: ISearchClientPayload = {
        input: input,
        tokenInput: {
          access_token: 'test-token',
          traceId: { traceID: 'test-trace-id' },
        },
      };

      const mockResponse: AxiosResponse<IDataClientSearchResponse> = {
        data: {
          clients: [
            {
              id: 4972,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 0,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9908',
                number: '501559',
                issueDate: '1980-01-01',
              },
              account: 3410263,
              contractNumber: '24-650727',
              state: 'Закрыт',
              subscribers: [],
            },
            {
              id: 12849,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 0,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9906',
                number: '524991',
                issueDate: '1980-01-01',
              },
              account: 12434308,
              contractNumber: '66-380901',
              state: 'Закрыт',
              subscribers: [],
            },
            {
              id: 14159,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 56.14,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9902',
                number: '932888',
                issueDate: '1980-01-01',
              },
              account: 5116058,
              contractNumber: '34-206210',
              state: 'Активен',
              subscribers: [
                {
                  id: 1112960,
                  msisdn: '9045459178',
                  region: 'Свердловская область',
                  state: 'Активен',
                  additionalPhoneNumber: null,
                  equipment: {
                    id: 2616851,
                    type: 'GSM',
                    iccId: '250350011513633',
                    imsi: '8970135000111513633',
                    state: 'Активирована',
                  },
                },
              ],
            },
            {
              id: 20202,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 366.92,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9908',
                number: '181563',
                issueDate: '1980-01-01',
              },
              account: 3594377,
              contractNumber: '24-835601',
              state: 'Активен',
              subscribers: [
                {
                  id: 1798799,
                  msisdn: '9502082022',
                  region: 'Свердловская область',
                  state: 'Активен',
                  additionalPhoneNumber: null,
                  equipment: {
                    id: 2398424,
                    type: 'GSM',
                    iccId: '250350012106362',
                    imsi: '8970135000112106362',
                    state: 'Активирована',
                  },
                },
              ],
            },
            {
              id: 33836,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 0,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9903',
                number: '442701',
                issueDate: '1980-01-01',
              },
              account: 3217491,
              contractNumber: '24-504687',
              state: 'Закрыт',
              subscribers: [],
            },
            {
              id: 22403,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 0,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9909',
                number: '121084',
                issueDate: '1980-01-01',
              },
              account: 3183317,
              contractNumber: '24-477801',
              state: 'Закрыт',
              subscribers: [],
            },
            {
              id: 28790,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 0,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9904',
                number: '725662',
                issueDate: '1980-01-01',
              },
              account: 7140697,
              contractNumber: '34-835666',
              state: 'Активен',
              subscribers: [],
            },
            {
              id: 36988,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 0,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9902',
                number: '590316',
                issueDate: '1980-01-01',
              },
              account: 10603634,
              contractNumber: '84-963462',
              state: 'Закрыт',
              subscribers: [],
            },
            {
              id: 49154,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 13.1,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9902',
                number: '369412',
                issueDate: '1980-01-01',
              },
              account: 1950073,
              contractNumber: '14-502884',
              state: 'Активен',
              subscribers: [
                {
                  id: 159130,
                  msisdn: '9045451986',
                  region: 'Свердловская область',
                  state: 'Активен',
                  additionalPhoneNumber: null,
                  equipment: {
                    id: 2339475,
                    type: 'GSM',
                    iccId: '250350010606148',
                    imsi: '8970135000110606148',
                    state: 'Активирована',
                  },
                },
              ],
            },
            {
              id: 62582,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 584.78,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9902',
                number: '841070',
                issueDate: '1980-01-01',
              },
              account: 2245678,
              contractNumber: '14-237480',
              state: 'Активен',
              subscribers: [
                {
                  id: 923080,
                  msisdn: '9086378708',
                  region: 'Свердловская область',
                  state: 'Активен',
                  additionalPhoneNumber: null,
                  equipment: {
                    id: 2301889,
                    type: 'GSM',
                    iccId: '250350011945058',
                    imsi: '8970135000111945058',
                    state: 'Активирована',
                  },
                },
              ],
            },
            {
              id: 64577,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 0,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Линия Бизнеса',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9905',
                number: '911733',
                issueDate: '1980-01-01',
              },
              account: 10338042,
              contractNumber: '65-125520',
              state: 'Закрыт',
              subscribers: [],
            },
            {
              id: 64527,
              balance: {
                monetary: [
                  {
                    name: 'Основной баланс',
                    value: 117.32,
                  },
                  {
                    name: 'Коррекционный баланс',
                    value: 0,
                  },
                ],
              },
              clientType: 'Массовый рынок',
              juridicalType: 'Физ. лицо',
              name: {
                structured: {
                  firstName: 'Де',
                  middleName: 'Алмейда',
                  lastName: 'Жайме',
                  orgName: null,
                },
                unstructured: 'Де Алмейда Жайме',
              },
              birthDate: '1980-01-01',
              document: {
                type: 'Паспорт гражданина РФ',
                series: '9904',
                number: '078587',
                issueDate: '1980-01-01',
              },
              account: 11139179,
              contractNumber: '94-302201',
              state: 'Активен',
              subscribers: [
                {
                  id: 1159215,
                  msisdn: '9000415801',
                  region: 'Свердловская область',
                  state: 'Активен',
                  additionalPhoneNumber: null,
                  equipment: {
                    id: 899003,
                    type: 'GSM',
                    iccId: '250350013261144',
                    imsi: '8970135000113261144',
                    state: 'Активирована',
                  },
                },
              ],
            },
          ],
          query: { unstructured: input },
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: {
          headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
        },
      };

      if (method === 'searchClientByPassport') {
        const generatedDocument = await Utils.generateDocumentPassport(input);
        requestData = generatedDocument; // Обновляем объект данных
      }

      jest
        .spyOn(httpService.axiosRef, 'post')
        .mockResolvedValueOnce(mockResponse);

      const result = await service[method as SearchMethod](payload);

      expect(result).toEqual(mockResponse.data);
      expect(httpService.axiosRef.post).toHaveBeenCalledWith(
        url,
        requestData,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
            TRACE_ID: 'test-trace-id',
          }),
        })
      );
    });
  });
});
