import * as promClient from 'prom-client';
import promBundle from 'express-prom-bundle';

/**
 * @module metrics
 * @description Модуль для сбора и управления метриками с использованием prom-client и express-prom-bundle.
 */

/**
 * @middleware metricsMiddleware
 * @description Промежуточное ПО для сбора метрик HTTP-запросов с использованием express-prom-bundle.
 * @returns {Object} Объект промежуточного ПО для использования в Express приложении.
 * @properties
 *   @property {boolean} includeMethod - Включает метод HTTP в метрики.
 *   @property {Object} promClient - Настройки клиента prom-client.
 *     @property {Object} collectDefaultMetrics - Собирает стандартные метрики.
 */
export const metricsMiddleware = promBundle({
  includeMethod: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

/**
 * @client metricsClient
 * @description Клиент prom-client для работы с метриками.
 * @returns {Object} Объект prom-client для сбора и управления метриками.
 */
export const metricsClient = promClient;

/**
 * @counter graphqlRequestsTotal
 * @description Счетчик для общего количества запросов GraphQL.
 * @type {Counter}
 * @properties
 *   @property {string} name - Имя счетчика, 'graphql_requests_total'.
 *   @property {string} help - Описание счетчика, 'Total GraphQL requests'.
 *   @property {Array<string>} labelNames - Имена меток для счетчика, включая метод, путь и статус.
 */
export const graphqlRequestsTotal = new promClient.Counter({
  name: 'graphql_requests_total',
  help: 'Total GraphQL requests',
  labelNames: ['method', 'path', 'status'],
});
