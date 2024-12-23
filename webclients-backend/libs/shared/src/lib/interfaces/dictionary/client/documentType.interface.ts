/**
 * @interface IDocumentType
 * @description Представляет тип документа.
 */
export interface IDocumentType {
  /**
   * Идентификатор типа документа.
   */
  id: number;

  /**
   * Название типа документа.
   */
  name: string;

  /**
   * Описание типа документа.
   */
  description: string;
}

/**
 * @interface IDocumentTypesResponse
 * @description Массив объектов типов документов.
 */
export interface IDocumentTypesResponse {
  /**
   * Массив объектов типов документов.
   */
  documentTypes: IDocumentType[];
}
