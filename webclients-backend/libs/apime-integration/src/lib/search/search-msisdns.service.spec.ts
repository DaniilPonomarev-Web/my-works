import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { SearchApimeService } from './search-apime.service';
import {
  ISearchUnlinkedMsisdnsPayload,
  ISearchUnlinkedMsisdnsResponse,
} from '@web-clients-backend/shared';

describe('SearchApimeService - searchUnlinkedMsisdns', () => {
  let service: SearchApimeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const mockHttpService = {
      axiosRef: {
        get: jest.fn(),
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
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('должен вернуть список MSISDN при успешном запросе', async () => {
    const payload: ISearchUnlinkedMsisdnsPayload = {
      tokenInput: {
        access_token: 'test-token',
        traceId: { traceID: 'test-trace-id' },
      },
      input: {
        msisdn: '95021%',
        regionId: [1, 2],
        categoryId: [3],
      },
    };

    const mockResponse: AxiosResponse<ISearchUnlinkedMsisdnsResponse> = {
      data: {
        msisdns: [
          {
            id: 1,
            msisdn: 9502100000,
            comment: 'Test MSISDN',
            state: { id: 1, name: 'Free', changedAt: '2023-01-01T00:00:00Z' },
            category: { id: 3, name: 'Test Category' },
            region: { id: 1, name: 'Test Region' },
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    };

    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce(mockResponse);

    const result = await service.searchUnlinkedMsisdns(payload);

    const expectedUrl = `/v1/search/unlinked-msisdns?msisdn=95021%25&categoryId=3&regionId=1&regionId=2`;

    expect(result).toEqual(mockResponse.data.msisdns);
    expect(httpService.axiosRef.get).toHaveBeenCalledWith(
      expectedUrl,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${payload.tokenInput.access_token}`,
          TRACE_ID: 'test-trace-id',
        }),
      })
    );
  });

  it('должен вернуть список MSISDN при успешном запросе c двумя %%', async () => {
    const payload: ISearchUnlinkedMsisdnsPayload = {
      tokenInput: {
        access_token: 'test-token',
        traceId: { traceID: 'test-trace-id' },
      },
      input: {
        msisdn: '%5021%',
        categoryId: [3],
        regionId: [2],
      },
    };

    const mockResponse: AxiosResponse<ISearchUnlinkedMsisdnsResponse> = {
      data: {
        msisdns: [
          {
            id: 1,
            msisdn: 9502100000,
            comment: 'Test MSISDN',
            state: { id: 1, name: 'Free', changedAt: '2023-01-01T00:00:00Z' },
            category: { id: 3, name: 'Test Category' },
            region: { id: 2, name: 'Test Region' },
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    };

    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce(mockResponse);

    const result = await service.searchUnlinkedMsisdns(payload);

    const expectedUrl = `/v1/search/unlinked-msisdns?msisdn=%255021%25&categoryId=3&regionId=2`;

    expect(result).toEqual(mockResponse.data.msisdns);
    expect(httpService.axiosRef.get).toHaveBeenCalledWith(
      expectedUrl,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${payload.tokenInput.access_token}`,
          TRACE_ID: 'test-trace-id',
        }),
      })
    );
  });

  it('должен вернуть null, если список MSISDN пуст', async () => {
    const payload: ISearchUnlinkedMsisdnsPayload = {
      tokenInput: {
        access_token: 'test-token',
        traceId: { traceID: 'test-trace-id' },
      },
      input: {
        msisdn: '5021%',
        regionId: [1, 2],
        categoryId: [3],
      },
    };

    const mockResponse: AxiosResponse<ISearchUnlinkedMsisdnsResponse> = {
      data: { msisdns: [] },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    };

    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce(mockResponse);

    const result = await service.searchUnlinkedMsisdns(payload);

    expect(result).toBeNull();
  });

  it('должен вернуть null при ошибке ENOTFOUND', async () => {
    const payload: ISearchUnlinkedMsisdnsPayload = {
      tokenInput: {
        access_token: 'test-token',
        traceId: { traceID: 'test-trace-id' },
      },
      input: {
        msisdn: '95021%',
      },
    };

    jest.spyOn(httpService.axiosRef, 'get').mockRejectedValueOnce({
      code: 'ENOTFOUND',
    });

    const result = await service.searchUnlinkedMsisdns(payload);

    expect(result).toBeNull();
  });

  it('должен вернуть null при любой другой ошибке', async () => {
    const payload: ISearchUnlinkedMsisdnsPayload = {
      tokenInput: {
        access_token: 'test-token',
        traceId: { traceID: 'test-trace-id' },
      },
      input: {
        msisdn: '95021%',
      },
    };

    jest
      .spyOn(httpService.axiosRef, 'get')
      .mockRejectedValueOnce(new Error('Unexpected error'));

    const result = await service.searchUnlinkedMsisdns(payload);

    expect(result).toBeNull();
  });
});
