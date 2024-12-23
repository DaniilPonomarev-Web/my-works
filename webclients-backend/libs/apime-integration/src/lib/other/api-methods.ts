import {
  escapePercent,
  ISearchUnlinkedMsisdnsPayload,
} from '@web-clients-backend/shared';

/**
 * Константы и переменные для определения префиксов путей API
 */
const prefix = {
  api_v1: '/v1', // Путь к версии API v1
  api_v1_search: '/v1/search', // Путь к разделу поиска API v1
  api_v1_dictionary: '/v1/search/dictionary', // Путь к словарю API v1
  api_v2: '//v2', // Путь к версии API v2
};

/**
 * Эндпоинты методов для работы через API.
 */
export const webClientsApiMethods = {
  health: {
    apime_check: '/health',
  },
  client: {
    getClientById: (id: string) => `${prefix.api_v1}/client/${id}`,
  },
  search: {
    clients: {
      byAccount: `${prefix.api_v1_search}/clients/account`, // Номер лицевого счета
      byName: `${prefix.api_v1_search}/clients/name`, // ФИО
      byContract: `${prefix.api_v1_search}/clients/contract`, // Номер договора
      byDocument: `${prefix.api_v1_search}/clients/document`, // Серия и номер паспорта
      byMsisdn: `${prefix.api_v1_search}/clients/msisdn`, // Абонентский номеру
      additionalPhoneNumber: `${prefix.api_v1_search}/clients/additional-phone-number`, // Дополнительный городской номер
      byEquipment: `${prefix.api_v1_search}/clients/equipment`, // Номер Sim-карты ICC ID
      byTitle: `${prefix.api_v1_search}/clients/name`, // Наименованию TODO допустить другое название метода
    },
    freeMsisdns: (payload: ISearchUnlinkedMsisdnsPayload) => {
      // Поиск свободных номеров MSISDN генерация строки с костылем в виде escapePercent экранизации
      const { msisdn, categoryId, regionId } = payload.input;
      let query = `${
        prefix.api_v1_search
      }/unlinked-msisdns?msisdn=${escapePercent(msisdn)}`;
      if (categoryId && categoryId.length > 0) {
        query += categoryId
          .map((id) => `&categoryId=${encodeURIComponent(id)}`)
          .join('');
      }
      if (regionId && regionId.length > 0) {
        query += regionId
          .map((id) => `&regionId=${encodeURIComponent(id)}`)
          .join('');
      }

      return query;
    },
  },
  dictionary: {
    client: {
      clientType: `${prefix.api_v1_dictionary}/client/clientType`, // Тип клиента
      juridicalType: `${prefix.api_v1_dictionary}/client/juridicalType`, // Тип юридического лица
      documentType: `${prefix.api_v1_dictionary}/client/documentType`, // Тип документа клиента
      addressType: `${prefix.api_v1_dictionary}/client/addressType`, // Тип адреса клиента
      billingDeliveryType: `${prefix.api_v1_dictionary}/client/billingDeliveryType`, // Тип доставки счета клиента
    },
    address: {
      country: `${prefix.api_v1_dictionary}/address/country`, // Словарь стран
      regionType: `${prefix.api_v1_dictionary}/address/regionType`, // Тип региона
      districtType: `${prefix.api_v1_dictionary}/address/districtType`, // Тип района
      cityType: `${prefix.api_v1_dictionary}/address/cityType`, // Тип города
      streetType: `${prefix.api_v1_dictionary}/address/streetType`, // Тип улицы
    },
  },
};
