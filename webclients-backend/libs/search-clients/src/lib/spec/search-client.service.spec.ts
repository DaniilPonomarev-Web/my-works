import { TestingModule, Test } from '@nestjs/testing';
import { LogsAndJournalsService } from '@web-clients-backend/logs';
import { RabbitMQService } from '@web-clients-backend/rabbit';
import {
  IClientSearch,
  IClientSearchResult,
  IDataClientSearchResponse,
  JuridicalTypeClientEnum,
  MarketSegmentEnum,
  SEARCH_CLIENT_BY_FIO,
  SearchAreaEnum,
  StateClientEnum,
} from '@web-clients-backend/shared';
import { SearchClientsService } from '../search-clients.service';
import { SortInput } from '../other/clients.dto';

describe('SearchClientsService', () => {
  let service: SearchClientsService;
  let rabbitService: RabbitMQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchClientsService,
        {
          provide: RabbitMQService,
          useValue: {
            sendMessageSearch: jest.fn(),
          },
        },
        {
          provide: LogsAndJournalsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SearchClientsService>(SearchClientsService);
    rabbitService = module.get<RabbitMQService>(RabbitMQService);
  });

  describe('searchClientsByArea', () => {
    const mockClients: IDataClientSearchResponse = {
      query: { unstructured: 'Де Алмейда Жайм%' },
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
      ],
    };
    const mockPayload = {
      tokenInput: {
        access_token:
          'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0X3owZE02MlM0WnFEcURzOTBCa0V1ZnRQbkhURV94TEhtbVJNaE9jTFY0In0.eyJleHAiOjE3MzE5MzI1NjcsImlhdCI6MTczMTkzMjI2NywianRpIjoiZjViZjZhNDEtYmYzYS00ODc4LTg1NjUtNDAzYjBmNjIzZTEwIiwiaXNzIjoiaHR0cHM6Ly93ZWItY2xpZW50cy1rZXljbG9hay50ZXN0LmNvcnAubW90aXYvYXV0aC9yZWFsbXMvd2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDk0N2JhM2ItMThjYy00MGUyLWI1NzEtYmZjMWEyNmUyOTAyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2MiLCJzaWQiOiJjZGNkZDdlMy02YjRiLTQ3OWItOTdiOS1hZGM2MmJhNjhkYmIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXdjIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsid2MiOnsicm9sZXMiOlsid2Nfc2hvdyIsImJhbl9zZXJ2X3Byb21vIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaW52b2ljZV9sb2dpbiI6ImFzcl92bGFkIiwibmFtZSI6ItCS0LvQsNC0INCR0YPQu9GD0YjQtdCyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidmxhZCIsImdpdmVuX25hbWUiOiLQktC70LDQtCIsImZhbWlseV9uYW1lIjoi0JHRg9C70YPRiNC10LIiLCJlbWFpbCI6ImJ1bHVzaGV2dmFAaXRlYW15LnBybyJ9.dvg5IZrTOT24ZHYuxaKPzpOStrDPpEuO2JlVDH5TcUPoGfEP0RTPmHbND0oP9Fn815K8qrbYkMCkrhTFkJb9oWYW9oYjP6MQzQpOEWoqlqUyO7Aky-10_fSf2BNDTFA20nJM8hjzYlRwWHjNOgASTCGZ9O7mHyQe-CDGEpETh6eiISonpZCmNMxVHfANwNM-H7bzuMufZIOvWPIEhTw42GBf0rTIEDVQ-Zd9Sc_S9EXAa1tLRZfJKBJsKLGjB5jW00wwvyvXjoraUxRj4QXTs5KW_KiCll0xiJp6x1E-p2SLzs4okqixRGKQ83tBjj18tn4VYMHY_p50LVlDVtb6AA',
        traceId: { traceID: 'df4698da-0c85-4311-9fec-e9e86c7da242' },
      },
      input: 'Де Алмейда Жайм%',
    };

    it('searchClientsByArea', async () => {
      // Мокация метода sendMessageSearch
      (rabbitService.sendMessageSearch as jest.Mock).mockResolvedValue(
        mockClients
      );
      const result = await service.searchClientsByArea(
        mockPayload,
        SearchAreaEnum.FIO
      );
      // Проверка вызова с правильными параметрами
      expect(rabbitService.sendMessageSearch).toHaveBeenCalledWith(
        SEARCH_CLIENT_BY_FIO,
        mockPayload
      );
      // Проверка результата
      expect(result).toEqual(mockClients);
    });
  });

  describe('normalizeClient', () => {
    const mockPayload: IClientSearchResult[] = [
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
    ];
    const mockResult: IClientSearch[] = [
      {
        fio: 'Де Алмейда Жайме',
        msisdn: null,
        balance: 0,
        birthDate: '1980-01-01',
        passport: {
          serialNumber: '9908 501559',
          date: '1980-01-01',
        },
        additionalPhone: null,
        region: null,
        iccId: null,
        account: 3410263,
        contractNumber: '24-650727',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Закрыт',
      },
      {
        fio: 'Де Алмейда Жайме',
        msisdn: null,
        balance: 0,
        birthDate: '1980-01-01',
        passport: {
          serialNumber: '9906 524991',
          date: '1980-01-01',
        },
        additionalPhone: null,
        region: null,
        iccId: null,
        account: 12434308,
        contractNumber: '66-380901',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Закрыт',
      },
      {
        fio: 'Де Алмейда Жайме',
        msisdn: 9045459178,
        balance: 56.14,
        birthDate: '1980-01-01',
        passport: {
          serialNumber: '9902 932888',
          date: '1980-01-01',
        },
        additionalPhone: null,
        region: 'Свердловская область',
        iccId: 250350011513633,
        account: 5116058,
        contractNumber: '34-206210',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Активен',
      },
    ];
    it('should normalizeClient', async () => {
      const result = await service.normalizeClient(mockPayload);
      expect(result).toEqual(mockResult);
    });
  });

  // describe('filterClients', () => {
  //   const mockPayload: IClientSearch[] = [
  //     {
  //       fio: 'Де Алмейда Жайме',
  //       msisdn: null,
  //       balance: 0,
  //       birthDate: '1980-01-01',
  //       passport: {
  //         serialNumber: '9908 501559',
  //         date: '1980-01-01',
  //       },
  //       additionalPhone: null,
  //       region: null,
  //       iccId: null,
  //       account: 3410263,
  //       contractNumber: '24-650727',
  //       segment: 'Массовый рынок',
  //       juridicalType: 'Физ. лицо',
  //       state: 'Закрыт',
  //     },
  //     {
  //       fio: 'Де Алмейда Жайме',
  //       msisdn: null,
  //       balance: 0,
  //       birthDate: '1980-01-01',
  //       passport: {
  //         serialNumber: '9906 524991',
  //         date: '1980-01-01',
  //       },
  //       additionalPhone: null,
  //       region: null,
  //       iccId: null,
  //       account: 12434308,
  //       contractNumber: '66-380901',
  //       segment: 'Массовый рынок',
  //       juridicalType: 'Физ. лицо',
  //       state: 'Закрыт',
  //     },
  //     {
  //       fio: 'Де Алмейда Жайме',
  //       msisdn: 9502082022,
  //       balance: 366.92,
  //       birthDate: '1980-01-01',
  //       passport: {
  //         serialNumber: '9908 181563',
  //         date: '1980-01-01',
  //       },
  //       additionalPhone: null,
  //       region: 'Свердловская область',
  //       iccId: 250350012106362,
  //       account: 3594377,
  //       contractNumber: '24-835601',
  //       segment: 'Массовый рынок',
  //       juridicalType: 'Физ. лицо',
  //       state: 'Активен',
  //     },
  //     {
  //       fio: 'Де Алмейда Жайме',
  //       msisdn: 9533807174,
  //       balance: 19.5,
  //       birthDate: '1980-01-01',
  //       passport: {
  //         serialNumber: '9908 787631',
  //         date: '1980-01-01',
  //       },
  //       additionalPhone: null,
  //       region: 'Свердловская область',
  //       iccId: 250350011206850,
  //       account: 9552015,
  //       contractNumber: '84-250021',
  //       segment: 'Массовый рынок',
  //       juridicalType: 'Физ. лицо',
  //       state: 'Блокирован',
  //     },
  //   ];
  //   const mockResult: IClientSearch[] = [
  //     {
  //       fio: 'Де Алмейда Жайме',
  //       msisdn: 9533807174,
  //       balance: 19.5,
  //       birthDate: '1980-01-01',
  //       passport: {
  //         serialNumber: '9908 787631',
  //         date: '1980-01-01',
  //       },
  //       additionalPhone: null,
  //       region: 'Свердловская область',
  //       iccId: 250350011206850,
  //       account: 9552015,
  //       contractNumber: '84-250021',
  //       segment: 'Массовый рынок',
  //       juridicalType: 'Физ. лицо',
  //       state: 'Блокирован',
  //     },
  //   ];
  //   it('should normalizeClient', async () => {
  //     const result = await service.filterClients(
  //       mockPayload,
  //       MarketSegmentEnum.MASSMARKET,
  //       JuridicalTypeClientEnum.INDIVIDUAL,
  //       StateClientEnum.BLOCKED
  //     );
  //     expect(result).toEqual(mockResult);
  //   });

  //   it('should normalizeClient', async () => {
  //     const result = await service.filterClients(
  //       mockPayload,
  //       MarketSegmentEnum.DEALER,
  //       JuridicalTypeClientEnum.ENTREPRENEUR,
  //       StateClientEnum.CLOSED
  //     );
  //     expect(result).toEqual([]);
  //   });
  // });

  /**
  * Сценарии:
	- Сценарий 1: Фильтрация клиентов по сегменту “Массовый рынок”, физическим лицам и активному состоянию.
	- Сценарий 2: Фильтрация клиентов по VIP-сегменту, юридическим лицам и состоянию “Блокирован”.
	- Сценарий 3: Фильтрация клиентов по сегменту “Массовый рынок”, ИП и состоянию “Закрыт”.
	- Сценарий 4: Сценарий с неподходящими критериями, где ожидается пустой массив.
   */
  describe('filterClients', () => {
    const mockPayload: IClientSearch[] = [
      {
        fio: 'Иванов Иван',
        msisdn: 9501234567,
        balance: 100,
        birthDate: '1990-05-15',
        passport: {
          serialNumber: '1234 567890',
          date: '2015-06-01',
        },
        additionalPhone: null,
        region: 'Свердловская область',
        iccId: 123456789012345,
        account: 101010,
        contractNumber: '01-100001',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Активен',
      },
      {
        fio: 'Петров Петр',
        msisdn: 9512345678,
        balance: -50,
        birthDate: '1985-03-10',
        passport: {
          serialNumber: '9876 543210',
          date: '2010-09-20',
        },
        additionalPhone: null,
        region: 'Курганская область',
        iccId: 987654321098765,
        account: 202020,
        contractNumber: '02-200002',
        segment: 'VIP',
        juridicalType: 'Юр. лицо',
        state: 'Блокирован',
      },
      {
        fio: 'Сидоров Сидор',
        msisdn: 9523456789,
        balance: 300,
        birthDate: '1975-12-25',
        passport: {
          serialNumber: '1357 246801',
          date: '2005-04-15',
        },
        additionalPhone: null,
        region: 'Свердловская область',
        iccId: 135724680135724,
        account: 303030,
        contractNumber: '03-300003',
        segment: 'Массовый рынок',
        juridicalType: 'ИП',
        state: 'Закрыт',
      },
      {
        fio: 'Кузнецов Николай',
        msisdn: 9534567890,
        balance: 500,
        birthDate: '1995-07-05',
        passport: {
          serialNumber: '2468 135702',
          date: '2020-01-01',
        },
        additionalPhone: null,
        region: 'Курганская область',
        iccId: 246813570246813,
        account: 404040,
        contractNumber: '04-400004',
        segment: 'VIP',
        juridicalType: 'Физ. лицо',
        state: 'Активен',
      },
    ];

    it('should filter by Mass Market, Individual, and Active state', async () => {
      const result = await service.filterClients(
        mockPayload,
        MarketSegmentEnum.MASSMARKET,
        JuridicalTypeClientEnum.INDIVIDUAL,
        StateClientEnum.ACTIVE
      );

      const expected = [
        {
          fio: 'Иванов Иван',
          msisdn: 9501234567,
          balance: 100,
          birthDate: '1990-05-15',
          passport: {
            serialNumber: '1234 567890',
            date: '2015-06-01',
          },
          additionalPhone: null,
          region: 'Свердловская область',
          iccId: 123456789012345,
          account: 101010,
          contractNumber: '01-100001',
          segment: 'Массовый рынок',
          juridicalType: 'Физ. лицо',
          state: 'Активен',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('should filter by VIP segment, Legal Entity, and Blocked state', async () => {
      const result = await service.filterClients(
        mockPayload,
        MarketSegmentEnum.VIP,
        JuridicalTypeClientEnum.LEGAL_ENTITY,
        StateClientEnum.BLOCKED
      );

      const expected = [
        {
          fio: 'Петров Петр',
          msisdn: 9512345678,
          balance: -50,
          birthDate: '1985-03-10',
          passport: {
            serialNumber: '9876 543210',
            date: '2010-09-20',
          },
          additionalPhone: null,
          region: 'Курганская область',
          iccId: 987654321098765,
          account: 202020,
          contractNumber: '02-200002',
          segment: 'VIP',
          juridicalType: 'Юр. лицо',
          state: 'Блокирован',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('should filter by Mass Market, Entrepreneur, and Closed state', async () => {
      const result = await service.filterClients(
        mockPayload,
        MarketSegmentEnum.MASSMARKET,
        JuridicalTypeClientEnum.ENTREPRENEUR,
        StateClientEnum.CLOSED
      );

      const expected = [
        {
          fio: 'Сидоров Сидор',
          msisdn: 9523456789,
          balance: 300,
          birthDate: '1975-12-25',
          passport: {
            serialNumber: '1357 246801',
            date: '2005-04-15',
          },
          additionalPhone: null,
          region: 'Свердловская область',
          iccId: 135724680135724,
          account: 303030,
          contractNumber: '03-300003',
          segment: 'Массовый рынок',
          juridicalType: 'ИП',
          state: 'Закрыт',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('should return an empty array for unmatched criteria', async () => {
      const result = await service.filterClients(
        mockPayload,
        MarketSegmentEnum.TEMPLATE_CLIENT,
        JuridicalTypeClientEnum.PRIVATEEENTERPRISE,
        StateClientEnum.SUSPENDED
      );

      expect(result).toEqual([]);
    });
  });

  /**
    - Сортировка по passport.serialNumber (преобразование строки к числу).
    -	Сортировка по числовому полю balance.
    -	Сортировка по строковому полю state.
    **
    - Проверяем, что массив клиентов возвращается в правильном порядке для каждого из тестовых случаев.
    ** 
    - Сценарии на работу с разными типами данных (числа, строки).
   */
  describe('sortClients', () => {
    const mockPayload: IClientSearch[] = [
      {
        fio: 'Де Алмейда Жайме',
        msisdn: null,
        balance: 0,
        birthDate: '1980-01-01',
        passport: {
          serialNumber: '9908 501559',
          date: '1980-01-01',
        },
        additionalPhone: null,
        region: null,
        iccId: null,
        account: 3410263,
        contractNumber: '24-650727',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Закрыт',
      },
      {
        fio: 'Де Алмейда Жайме',
        msisdn: null,
        balance: 0,
        birthDate: '1980-01-01',
        passport: {
          serialNumber: '9906 524991',
          date: '1980-01-01',
        },
        additionalPhone: null,
        region: null,
        iccId: null,
        account: 12434308,
        contractNumber: '66-380901',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Закрыт',
      },
      {
        fio: 'Де Алмейда Жайме',
        msisdn: 9502082022,
        balance: 366.92,
        birthDate: '1980-01-01',
        passport: {
          serialNumber: '9908 181563',
          date: '1980-01-01',
        },
        additionalPhone: null,
        region: 'Свердловская область',
        iccId: 250350012106362,
        account: 3594377,
        contractNumber: '24-835601',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Активен',
      },
      {
        fio: 'Де Алмейда Жайме',
        msisdn: 9533807174,
        balance: 19.5,
        birthDate: '1980-01-01',
        passport: {
          serialNumber: '9908 787631',
          date: '1980-01-01',
        },
        additionalPhone: null,
        region: 'Свердловская область',
        iccId: 250350011206850,
        account: 9552015,
        contractNumber: '84-250021',
        segment: 'Массовый рынок',
        juridicalType: 'Физ. лицо',
        state: 'Блокирован',
      },
    ];

    it('should sort clients by passport serialNumber in ascending order', async () => {
      const sortInput: SortInput = {
        field: 'passport.serialNumber',
        direction: 'asc',
      };

      const result = await service.sortClients(mockPayload, sortInput);

      expect(result.map((client) => client.passport.serialNumber)).toEqual([
        '9906 524991',
        '9908 181563',
        '9908 501559',
        '9908 787631',
      ]);
    });

    it('should sort clients by balance in descending order', async () => {
      const sortInput: SortInput = {
        field: 'balance',
        direction: 'desc',
      };

      const result = await service.sortClients(mockPayload, sortInput);

      expect(result.map((client) => client.balance)).toEqual([
        366.92, 19.5, 0, 0,
      ]);
    });

    it('should sort clients by state in ascending order', async () => {
      const sortInput: SortInput = {
        field: 'state',
        direction: 'asc',
      };

      const result = await service.sortClients(mockPayload, sortInput);

      expect(result.map((client) => client.state)).toEqual([
        'Активен',
        'Блокирован',
        'Закрыт',
        'Закрыт',
      ]);
    });
  });
});
