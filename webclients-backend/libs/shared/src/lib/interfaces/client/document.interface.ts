/**
 * Интерфейс для типа документа клиента.
 */
export interface IDocumentTypeClient {
  /**
   * Идентификатор типа документа.
   */
  id: number;

  /**
   * Название типа документа.
   */
  name: string;
}

/**
 * Интерфейс для документа клиента.
 */
export interface IDocumentClient {
  /**
   * Идентификатор документа.
   */
  id: number;

  /**
   * Тип документа.
   */
  type: IDocumentTypeClient;

  /**
   * Серия документа.
   */
  series: string;

  /**
   * Номер документа.
   */
  number: string;

  /**
   * Дата выдачи документа.
   */
  issueDate: string;

  /**
   * Кем выдан документ.
   */
  issueBy: string;

  /**
   * Является ли этот документ основным.
   */
  isMain: boolean;
}
