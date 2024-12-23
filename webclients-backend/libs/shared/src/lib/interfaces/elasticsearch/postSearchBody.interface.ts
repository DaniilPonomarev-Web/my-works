/**
 * @interface PostSearchResult
 * @description Результат поиска постов в Elasticsearch.
 */
export interface PostSearchResult {
  /**
   * Объект с количеством найденных записей и массивом постов.
   */
  hits: {
    /**
     * Общее количество найденных записей.
     */
    total: number;

    /**
     * Массив объектов постов.
     */
    hits: Array<{
      /**
       * Исходные данные поста.
       */
      _source: PostSearchBody;
    }>;
  };
}

/**
 * @interface PostSearchBody
 * @description Тело данных поста в Elasticsearch.
 */
interface PostSearchBody {
  /**
   * Идентификатор поста.
   */
  id: number;

  /**
   * Заголовок поста.
   */
  title: string;

  /**
   * Содержание поста.
   */
  content: string;

  /**
   * Идентификатор автора поста.
   */
  authorId: number;
}
