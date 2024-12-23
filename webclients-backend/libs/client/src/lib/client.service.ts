import { Injectable } from '@nestjs/common';
import { LogsAndJournalsService } from '@web-clients-backend/logs';
import { RabbitMQService } from '@web-clients-backend/rabbit';
import {
  IAccessTokenInput,
  IClientApiResult,
  IOptionalPropertyClient,
  PassportVerificationStatus,
} from '@web-clients-backend/shared';

@Injectable()
export class ClientService {
  constructor(
    private readonly rabbitService: RabbitMQService,
    private readonly logsAdminService: LogsAndJournalsService
  ) {}

  async getClient(
    payload: IAccessTokenInput,
    clientId: string
  ): Promise<IClientApiResult | null> {
    const clientData = await this.rabbitService.getClient(payload, clientId);
    if (!clientData) {
      return null;
    }
    this.logsAdminService.createLog(
      'SynonymsGroup',
      'admin',
      `Запросил данные клиента по ID`,
      clientData
    );

    console.warn(clientData);

    return clientData;
  }

  async normalizeClient(payload: IClientApiResult): Promise<any> {
    const client: any = {
      fio: payload.clientName,
      inn: payload.contract.inn,
      juridicalType: payload.juridicalType.name,
      document: payload.documents,
      email: payload.email,
      esia: this.calculateEsiaStatus(payload.optionalProperties),
      subscriberInformation: {
        state: {
          state: payload.state,
          describe: payload.state,
        },
        sim: payload.equipment.iccId,
        switch: payload.equipment.type,
        dateFirstCall: '11.11.2024',
      },
    };

    return client;
  }

  /**
  1.	Проверяются дополнительные параметры по id:
	•	254 — “Запрос на проверку паспорта”.
	•	255 — “Дата проверки паспорта”.
	•	256 — “Результат проверки”.
	•	258 — “Статус обработки”.
	2.	На основе значений этих параметров определяется статус из PassportVerificationStatus.
	3.	Логика соблюдает порядок проверки, указанный в таблице:
	•	Если параметр 254 отсутствует или не заполнен, статус — NOT_SENT.
	•	Если 254 = "да", статус — AWAITING_VERIFICATION.
	•	Статусы обработки (258) меняют статус на REQUEST_CREATED, FAILED_TO_SEND, UNDER_REVIEW, INFO_NOT_FOUND, INVALID, или VALID в зависимости от значений.
   * @param payload 
   * @returns 
   */
  async calculateEsiaStatus(
    payload: IOptionalPropertyClient[]
  ): Promise<PassportVerificationStatus> {
    let esiaStatus: PassportVerificationStatus =
      PassportVerificationStatus.NOT_SENT;

    if (payload) {
      // Проверка параметра 254 ("Запрос на проверку паспорта")
      const passportRequestParam = payload.find((param) => param.id === 254);
      // Проверка параметра 255 ("Дата проверки паспорта")
      const passportVerificationDateParam = payload.find(
        (param) => param.id === 255
      );
      // Проверка параметра 256 ("Результат проверки")
      const passportResultParam = payload.find((param) => param.id === 256);
      // Проверка параметра 258 ("Статус обработки")
      const processingStatusParam = payload.find((param) => param.id === 258);

      if (!passportRequestParam || !passportRequestParam.value) {
        // Если "Запрос на проверку паспорта" не заполнен
        esiaStatus = PassportVerificationStatus.NOT_SENT;
      } else if (passportRequestParam.value === 'да') {
        // Если "Запрос на проверку паспорта" = "да"
        esiaStatus = PassportVerificationStatus.AWAITING_VERIFICATION;
      }

      if (processingStatusParam?.value === '0') {
        // Если статус обработки = "создана заявка"
        esiaStatus = PassportVerificationStatus.REQUEST_CREATED;
      } else if (processingStatusParam?.value === '1') {
        // Если статус обработки = "не удалось отправить"
        esiaStatus = PassportVerificationStatus.FAILED_TO_SEND;
      } else if (processingStatusParam?.value === '2') {
        // Если статус обработки = "Обработка СМЭВ"
        esiaStatus = PassportVerificationStatus.UNDER_REVIEW;
      } else if (
        processingStatusParam?.value === '3' &&
        passportVerificationDateParam?.value &&
        passportResultParam?.value === '2'
      ) {
        // Если статус обработки = "завершено" и результат проверки = "информация не найдена"
        esiaStatus = PassportVerificationStatus.INFO_NOT_FOUND;
      } else if (
        processingStatusParam?.value === '3' &&
        passportVerificationDateParam?.value &&
        passportResultParam?.value === '1'
      ) {
        // Если статус обработки = "завершено" и результат проверки = "Не действителен"
        esiaStatus = PassportVerificationStatus.INVALID;
      } else if (
        processingStatusParam?.value === '3' &&
        passportVerificationDateParam?.value &&
        passportResultParam?.value === '0'
      ) {
        // Если статус обработки = "завершено" и результат проверки = "Действителен"
        esiaStatus = PassportVerificationStatus.VALID;
      }
    }

    return esiaStatus;
  }
}
