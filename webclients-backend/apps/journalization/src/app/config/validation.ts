import * as Joi from 'joi';
/**
 * @description Определяет схему валидации конфигурационных переменных с использованием Joi.
 * Схема включает обязательные переменные для окружения, подключения к RabbitMQ, PostgreSQL и Elasticsearch.
 */

/**
 * @property {string} NODE_ENV - Среда выполнения приложения, допустимые значения: 'development', 'production', 'test'.
 * @property {string} TZ - Таймзона приложения, по умолчанию 'Asia/Yekaterinburg'.
 * @property {string} RMQ_URL - URL подключения к RabbitMQ.
 * @property {string} RMQ_VHOST - Виртуальный хост RabbitMQ, по умолчанию пустая строка.
 * @property {string} RMQ_QUEUE_JOURNALIZATION - Название очереди RabbitMQ для журнализации.
 * @property {string} PG_USER - Пользователь для подключения к PostgreSQL.
 * @property {string} PG_PASS - Пароль для подключения к PostgreSQL.
 * @property {string} PG_DB - Название базы данных PostgreSQL.
 * @property {number} PG_PORT - Порт для подключения к PostgreSQL, по умолчанию 5432.
 * @property {boolean} PG_LOG - Флаг логирования запросов к PostgreSQL, по умолчанию false.
 * @property {boolean} DB_SYNC - Флаг синхронизации базы данных, по умолчанию false.
 * @property {string} ELASTICSEARCH_NODE - URI узла Elasticsearch, должен быть валидным URI.
 */
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  TZ: Joi.string().default('Asia/Yekaterinburg'),
  RMQ_URL: Joi.string().required(),
  RMQ_VHOST: Joi.string().default(''),
  RMQ_QUEUE_JOURNALIZATION: Joi.string().required(),
  PG_USER: Joi.string().required(),
  PG_PASS: Joi.string().required(),
  PG_DB: Joi.string().required(),
  PG_PORT: Joi.number().default(5432),
  PG_LOG: Joi.boolean().default(false),
  DB_SYNC: Joi.boolean().default(false),
  ELASTICSEARCH_NODE: Joi.string().uri().required(),
});
