import { IAccessTokenInput } from '../apimeInputs';

/**
 * Интерфейс для входных данных метода поиска свободных номеров (MSISDN).
 */
export interface SearchUnlinkedMsisdnsInput {
  /**
   * Номер MSISDN для поиска.
   * Может быть частично маскированным, где символ '%' означает любое количество любых символов.
   * Обязательных символов, помимо '%', должно быть не менее пяти.
   * Пример: "95021%" или "%12345".
   */
  msisdn: string;

  /**
   * Идентификаторы регионов для фильтрации номеров.
   * Массив чисел, где каждый элемент — ID региона.
   * Поле необязательное.
   */
  regionId?: number[];

  /**
   * Идентификаторы категорий номеров для фильтрации.
   * Массив чисел, где каждый элемент — ID категории.
   * Поле необязательное.
   */
  categoryId?: number[];
}

export interface ISearchUnlinkedMsisdnsPayload {
  tokenInput: IAccessTokenInput;
  input: SearchUnlinkedMsisdnsInput;
}
