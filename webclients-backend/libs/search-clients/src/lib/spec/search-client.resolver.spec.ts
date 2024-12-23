import { Test, TestingModule } from '@nestjs/testing';
import { SearchClientsService } from '../search-clients.service';
import { SearchClientsResolver } from '../search-clients.resolver';
import {
  IClientSearch,
  JuridicalTypeClientEnum,
  MarketSegmentEnum,
  mockContext,
  SearchAreaEnum,
} from '@web-clients-backend/shared';

describe('SearchClientsResolver', () => {
  let resolver: SearchClientsResolver;
  let service: SearchClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchClientsResolver,
        {
          provide: SearchClientsService,
          useValue: {
            getSearchAreas: jest.fn(),
            normalizeClient: jest.fn(),
            filterClients: jest.fn(),
            sortClients: jest.fn(),
            searchClientsByArea: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SearchClientsResolver>(SearchClientsResolver);
    service = module.get<SearchClientsService>(SearchClientsService);
  });

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
      birthDate: '1975-01-01',
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
      msisdn: 9502091895,
      balance: 95.13,
      birthDate: '1980-01-01',
      passport: {
        serialNumber: '9903 574173',
        date: '1980-01-01',
      },
      additionalPhone: null,
      region: 'Свердловская область',
      iccId: 250350011197755,
      account: 10832547,
      contractNumber: '94-110609',
      segment: 'Массовый рынок',
      juridicalType: 'Физ. лицо',
      state: 'Активен',
    },
  ];

  it('Вызов из сервиса и вернуть данные normalizeClient', async () => {
    jest.spyOn(service, 'searchClientsByArea').mockResolvedValue({
      query: {
        unstructured: 'Де Алмейда Жайм%',
      },
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
    });

    jest.spyOn(service, 'normalizeClient').mockResolvedValue(mockResult);

    jest.spyOn(service, 'filterClients').mockResolvedValue(mockResult);

    jest.spyOn(service, 'sortClients').mockResolvedValue(mockResult);

    const result = await resolver.getClientsSearch(
      mockContext,
      { page: 1, perPage: 10 },
      { input: 'Де Алмейда Жайм%', area: SearchAreaEnum.FIO },
      { field: 'fio', direction: 'asc' },
      { juridicalType: JuridicalTypeClientEnum.INDIVIDUAL }
    );
    expect(result).toEqual({
      items: mockResult,
      total: 3,
    });
  });

  it('Вызов из сервиса и вернуть данные normalizeClient с фильтром по линии бизнеса', async () => {
    jest.spyOn(service, 'searchClientsByArea').mockResolvedValue({
      query: {
        unstructured: 'Де Алмейда Жайм%',
      },
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
          birthDate: '1975-01-01',
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
      ],
    });
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
        segment: 'Линия Бизнеса',
        juridicalType: 'Физ. лицо',
        state: 'Закрыт',
      },
    ];

    jest.spyOn(service, 'normalizeClient').mockResolvedValue(mockResult);

    jest.spyOn(service, 'filterClients').mockResolvedValue(mockResult);

    jest.spyOn(service, 'sortClients').mockResolvedValue(mockResult);

    const result = await resolver.getClientsSearch(
      mockContext,
      { page: 1, perPage: 10 },
      { input: 'Де Алмейда Жайм%', area: SearchAreaEnum.FIO },
      { field: 'fio', direction: 'asc' },
      {
        juridicalType: JuridicalTypeClientEnum.INDIVIDUAL,
        marketSegment: MarketSegmentEnum.BUSINESS_LINE,
      }
    );
    expect(result).toEqual({
      items: mockResult,
      total: 1,
    });
  });
});
