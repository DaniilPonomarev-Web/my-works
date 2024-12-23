import {
  JuridicalTypeClientEnum,
  MarketSegmentEnum,
  StateClientEnum,
} from '../enums';
import { IEnum, ISearchClientPayload } from '../interfaces';

/**
 * @function generatePaginationArray
 * @description Генерирует массив для пагинации из указанного массива.
 * @param {any[]} array - Исходный массив, который необходимо разбить на страницы.
 * @param {number} paginationPage - Номер страницы (1-базовый индекс), которую нужно вернуть.
 * @param {number} paginationPerPage - Количество элементов на странице.
 * @returns {{ arraySlice: any[], total: number }} - Объект, содержащий:
 * - `arraySlice`: Срез массива для текущей страницы.
 * - `total`: Общее количество элементов в исходном массиве.
 */
export const generatePaginationArray = async (
  array: any,
  paginationPage: number,
  paginationPerPage: number
) => {
  const total = array.length;
  const startIndex = (paginationPage - 1) * paginationPerPage;
  const endIndex = startIndex + paginationPerPage;
  const arraySlice = array.slice(startIndex, endIndex);
  return {
    arraySlice,
    total,
  };
};

/**
 * @function generateTokenContext
 * @description Генерирует токен из контекста gql
 * @param {context} контекст токена //TODO interface
 * @returns token - токен для прокида дальше
 */
export const generateTokenContext = async (context: any): Promise<string> => {
  const token = context.req.headers.authorization?.replace('Bearer ', '');
  return token;
};

/**
 * @function generateDocumentPassport
 * @description Генерирует серию и номер паспорта
 * @param {passport}  строка с серией номером паспорта
 * @returns token - токен для прокида дальше
 */
export const generateDocumentPassport = async (
  passport: string
): Promise<{ typeId: number; series: string; number: string }> => {
  return {
    typeId: 1,
    series: passport.slice(0, 4),
    number: passport.slice(4, 10),
  };
};

/**
 * Генерация объекта значений на основе перечислений.
 *
 * @param enumObj - Объект перечислений (тип `T`).
 * @returns Массив объектов, где каждый объект имеет свойства `value` и `label` для соответствующего ключа и значения.
 */
export function createEnumMap<T extends Record<string, string>>(
  enumObj: T
): IEnum<T[keyof T]>[] {
  // Преобразуем перечисление в массив объектов
  return Object.entries(enumObj).map(([key, value]) => ({
    // `value` сохраняет оригинальное значение из перечисления.
    value: value as T[keyof T],
    // `label` задается ключом, который используется в пользовательском интерфейсе.
    label: key,
  }));
}

/**
 * Преобразует строковое значение юридического типа в соответствующий тип перечисления.
 *
 * @param type - Строковое значение юридического типа (например, 'Физ. лицо', 'Юр. лицо', 'ИП', 'ЧП').
 * @returns Тип юридического клиента из перечислений `JuridicalTypeClientEnum`.
 * @throws {Error} Если передано неизвестное значение юридического типа.
 */
export function mapJuridicalType(type: string): JuridicalTypeClientEnum {
  switch (type) {
    case 'Физ. лицо':
      return JuridicalTypeClientEnum.INDIVIDUAL;
    case 'Юр. лицо':
      return JuridicalTypeClientEnum.LEGAL_ENTITY;
    case 'ИП':
      return JuridicalTypeClientEnum.ENTREPRENEUR;
    case 'ЧП':
      return JuridicalTypeClientEnum.PRIVATEEENTERPRISE;
    default:
      throw new Error(`Неизвестный юридический тип: ${type}`);
  }
}

/**
 * Преобразует строковое значение рыночного сегмента в соответствующий тип перечисления.
 *
 * @param type - Строковое значение рыночного сегмента (например, 'Массовый рынок', 'Дилер', 'VIP', 'TEST-клиент').
 * @returns Тип рыночного сегмента из перечисления `MarketSegmentEnum`.
 * @throws {Error} Если передано неизвестное значение рыночного сегмента.
 */
export function mapMarketSegment(type: string): MarketSegmentEnum {
  switch (type) {
    case 'Массовый рынок':
      return MarketSegmentEnum.MASSMARKET;
    case 'Дилер':
      return MarketSegmentEnum.DEALER;
    case 'VIP':
      return MarketSegmentEnum.VIP;
    case 'TEST-клиент':
      return MarketSegmentEnum.TEST_CLIENT;
    case 'Пустой контракт':
      return MarketSegmentEnum.EMPTY_CONTRACT;
    case 'Роуминговый партнер':
      return MarketSegmentEnum.ROAMING_PARTNER;
    case 'Служебный':
      return MarketSegmentEnum.SERVICE;
    case 'Корпоративный/Кредит':
      return MarketSegmentEnum.CORPORATE_CREDIT;
    case 'Клиент-шаблон для саморегистрации':
      return MarketSegmentEnum.TEMPLATE_CLIENT;
    case 'Линия Бизнеса':
      return MarketSegmentEnum.BUSINESS_LINE;
    case 'ТиЛиДа':
      return MarketSegmentEnum.TILIDA;
    case 'ГУИН':
      return MarketSegmentEnum.GUIN;
    case 'Организации принимающие платежи':
      return MarketSegmentEnum.PAYMENT_ORGANIZATIONS;
    case 'Не отключать':
      return MarketSegmentEnum.DO_NOT_DISABLE;
    default:
      throw new Error(`Неизвестный сегмент: ${type}`);
  }
}

/**
 * Преобразует строковое значение состояния клиента в соответствующий тип перечисления.
 *
 * @param type - Строковое значение состояния клиента (например, 'Активен', 'Блокирован', 'Закрыт').
 * @returns Тип состояния клиента из перечисления `StateClientEnum`.
 * @throws {Error} Если передано неизвестное значение состояния клиента.
 */
export function mapStateClient(type: string): StateClientEnum {
  switch (type) {
    case 'Активен':
      return StateClientEnum.ACTIVE;
    case 'Блокирован':
      return StateClientEnum.BLOCKED;
    case 'Закрыт':
      return StateClientEnum.CLOSED;
    case 'Приостановлен':
      return StateClientEnum.SUSPENDED;
    case 'Заморожен':
      return StateClientEnum.FROZEN;
    case 'Подготовлен':
      return StateClientEnum.PREPARED;
    default:
      throw new Error(`Неизвестный статус: ${type}`);
  }
}

/**
 * Генерирует заголовки для HTTP-запросов на основе переданных данных клиента.
 *
 * @param payload - Объект типа `ISearchClientPayload`, содержащий данные для формирования заголовков.
 * @returns Объект заголовков, включающий `Content-Type`, `TRACE_ID` и `Authorization`.
 *
 * @remarks
 * - Заголовок `Content-Type` всегда устанавливается как `application/json`.
 * - `TRACE_ID` извлекается из `payload.tokenInput.traceId.traceID`, если оно присутствует, или принимает значение `not-trace` по умолчанию.
 * - `Authorization` формируется на основе токена из `payload.tokenInput.access_token` в формате `Bearer <токен>`.
 */
export const getHeaders = (payload: ISearchClientPayload) => {
  return {
    'Content-Type': 'application/json',
    TRACE_ID: payload.tokenInput.traceId?.traceID || 'not-trace',
    Authorization: `Bearer ${payload.tokenInput.access_token}`,
  };
};

/*
 * @function generateStringFromDate
 * @description Генерирует строку из даты формата 2042-01-01T11:17:32
 * @param {dateString}
 * @returns {string
 * */
export const generateStringFromDate = async (
  dateString: string
): Promise<string> => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Mock контекст для тестирования, включающий заголовки HTTP-запроса.
 *
 * @remarks
 * - `authorization`: Заголовок, содержащий Bearer токен для аутентификации.
 * - `traceId`: Идентификатор трассировки для отслеживания запросов и их маршрутизации.
 */
export const mockContext = {
  req: {
    headers: {
      authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0X3owZE02MlM0WnFEcURzOTBCa0V1ZnRQbkhURV94TEhtbVJNaE9jTFY0In0.eyJleHAiOjE3MzE5MzI1NjcsImlhdCI6MTczMTkzMjI2NywianRpIjoiZjViZjZhNDEtYmYzYS00ODc4LTg1NjUtNDAzYjBmNjIzZTEwIiwiaXNzIjoiaHR0cHM6Ly93ZWItY2xpZW50cy1rZXljbG9hay50ZXN0LmNvcnAubW90aXYvYXV0aC9yZWFsbXMvd2MiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDk0N2JhM2ItMThjYy00MGUyLWI1NzEtYmZjMWEyNmUyOTAyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2MiLCJzaWQiOiJjZGNkZDdlMy02YjRiLTQ3OWItOTdiOS1hZGM2MmJhNjhkYmIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXdjIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsid2MiOnsicm9sZXMiOlsid2Nfc2hvdyIsImJhbl9zZXJ2X3Byb21vIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaW52b2ljZV9sb2dpbiI6ImFzcl92bGFkIiwibmFtZSI6ItCS0LvQsNC0INCR0YPQu9GD0YjQtdCyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidmxhZCIsImdpdmVuX25hbWUiOiLQktC70LDQtCIsImZhbWlseV9uYW1lIjoi0JHRg9C70YPRiNC10LIiLCJlbWFpbCI6ImJ1bHVzaGV2dmFAaXRlYW15LnBybyJ9.dvg5IZrTOT24ZHYuxaKPzpOStrDPpEuO2JlVDH5TcUPoGfEP0RTPmHbND0oP9Fn815K8qrbYkMCkrhTFkJb9oWYW9oYjP6MQzQpOEWoqlqUyO7Aky-10_fSf2BNDTFA20nJM8hjzYlRwWHjNOgASTCGZ9O7mHyQe-CDGEpETh6eiISonpZCmNMxVHfANwNM-H7bzuMufZIOvWPIEhTw42GBf0rTIEDVQ-Zd9Sc_S9EXAa1tLRZfJKBJsKLGjB5jW00wwvyvXjoraUxRj4QXTs5KW_KiCll0xiJp6x1E-p2SLzs4okqixRGKQ83tBjj18tn4VYMHY_p50LVlDVtb6AA',
    },
  },
};

/**
 * Экранирование символов `%` в строке, заменяя их на `%25`.
 *
 * @param msisdn - Исходная строка (типа номер телефона:D), которая может содержать символы `%`.
 * @returns Строка с экранированными символами `%`.
 */
export const escapePercent = (msisdn: string): string => {
  return msisdn.replace(/%/g, '%25');
};
