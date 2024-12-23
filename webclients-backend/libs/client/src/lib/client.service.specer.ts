// import { Test, TestingModule } from '@nestjs/testing';
// import { ClientService } from './client.service';
// import { RabbitMQService } from '@web-clients-backend/rabbit';
// import { LogsAndJournalsService } from '@web-clients-backend/logs';
// import {
//   PassportVerificationStatus,
//   IAccessTokenInput,
//   IClientApiResult,
//   IOptionalPropertyClient,
// } from '@web-clients-backend/shared';

// describe('ClientService', () => {
//   let service: ClientService;
//   let rabbitService: RabbitMQService;
//   let logsService: LogsAndJournalsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ClientService,
//         {
//           provide: RabbitMQService,
//           useValue: {
//             getClient: jest.fn(),
//           },
//         },
//         {
//           provide: LogsAndJournalsService,
//           useValue: {
//             createLog: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     service = module.get<ClientService>(ClientService);
//     rabbitService = module.get<RabbitMQService>(RabbitMQService);
//     logsService = module.get<LogsAndJournalsService>(LogsAndJournalsService);
//   });

//   describe('getClient', () => {
//     it('should return client data and create a log', async () => {
//       const mockPayload: IAccessTokenInput = {
//         traceId: {
//           traceID: 'test-trace-id',
//         },
//         access_token: 'test-token',
//       };
//       const clientId = '12345';
//       const mockClientData: IClientApiResult = {
//         clientName: {
//           firstName: 'test',
//           middleName: 'middleName',
//           lastName: 'client',
//         },
//         contract: { inn: '1234567890' },
//         juridicalType: { name: 'Test Type' },
//         documents: [],
//         email: 'test@example.com',
//         optionalProperties: [],
//         state: 'active',
//         equipment: { iccId: '12345', type: 'type1' },
//       };

//       jest.spyOn(rabbitService, 'getClient').mockResolvedValue(mockClientData);

//       const result = await service.getClient(mockPayload, clientId);

//       expect(result).toEqual(mockClientData);
//       expect(logsService.createLog).toHaveBeenCalledWith(
//         'SynonymsGroup',
//         'admin',
//         'Запросил данные клиента по ID',
//         mockClientData
//       );
//     });

//     it('should return null if client data is not found', async () => {
//       const mockPayload: IAccessTokenInput = {
//         traceId: 'trace-123',
//         access_token: 'test-token',
//       };
//       const clientId = '12345';

//       jest.spyOn(rabbitService, 'getClient').mockResolvedValue(null);

//       const result = await service.getClient(mockPayload, clientId);

//       expect(result).toBeNull();
//       expect(logsService.createLog).not.toHaveBeenCalled();
//     });
//   });

//   describe('calculateEsiaStatus', () => {
//     it('should return NOT_SENT if param 254 is missing', async () => {
//       const payload: IOptionalPropertyClient[] = [];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.NOT_SENT);
//     });

//     it('should return AWAITING_VERIFICATION if param 254 is "да"', async () => {
//       const payload: IOptionalPropertyClient[] = [{ id: 254, value: 'да' }];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.AWAITING_VERIFICATION);
//     });

//     it('should return REQUEST_CREATED if param 258 is "0"', async () => {
//       const payload: IOptionalPropertyClient[] = [{ id: 258, value: '0' }];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.REQUEST_CREATED);
//     });

//     it('should return FAILED_TO_SEND if param 258 is "1"', async () => {
//       const payload: IOptionalPropertyClient[] = [{ id: 258, value: '1' }];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.FAILED_TO_SEND);
//     });

//     it('should return UNDER_REVIEW if param 258 is "2"', async () => {
//       const payload: IOptionalPropertyClient[] = [{ id: 258, value: '2' }];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.UNDER_REVIEW);
//     });

//     it('should return INFO_NOT_FOUND if param 258 is "3" and result is "2"', async () => {
//       const payload: IOptionalPropertyClient[] = [
//         { id: 258, value: '3' },
//         { id: 256, value: '2' },
//         { id: 255, value: '2024-12-10' },
//       ];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.INFO_NOT_FOUND);
//     });

//     it('should return INVALID if param 258 is "3" and result is "1"', async () => {
//       const payload: IOptionalPropertyClient[] = [
//         { id: 258, value: '3' },
//         { id: 256, value: '1' },
//         { id: 255, value: '2024-12-10' },
//       ];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.INVALID);
//     });

//     it('should return VALID if param 258 is "3" and result is "0"', async () => {
//       const payload: IOptionalPropertyClient[] = [
//         { id: 258, value: '3' },
//         { id: 256, value: '0' },
//         { id: 255, value: '2024-12-10' },
//       ];

//       const result = await service.calculateEsiaStatus(payload);

//       expect(result).toBe(PassportVerificationStatus.VALID);
//     });
//   });
// });
