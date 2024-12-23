import * as Joi from 'joi';
/**
 * @schema
 * @name validationSchema
 * @description Схема валидации окружения и параметров приложения, используемая для проверки корректности конфигурации.
 * @properties
 *   @property {string} NODE_ENV - Окружение приложения. Допустимые значения: 'development', 'production', 'test'. Обязательное поле.
 *   @property {string} TZ - Часовой пояс приложения. Значение по умолчанию: 'Asia/Yekaterinburg'.
 *   @property {number} PORT_GQL - Порт для GraphQL. Значение по умолчанию: 3015.
 *   @property {string} RMQ_URL - URL для RabbitMQ. Обязательное поле.
 *   @property {string} RMQ_VHOST - Виртуальный хост RabbitMQ. Значение по умолчанию: ''.
 *   @property {string} RMQ_QUEUE_GQL - Имя очереди для обработки GraphQL сообщений. Обязательное поле.
 *   @property {string} RMQ_QUEUE_DATA_LOADER - Имя очереди для загрузчика данных RabbitMQ. Обязательное поле.
 *   @property {string} RMQ_QUEUE_JOURNALIZATION - Имя очереди для журнализации RabbitMQ. Обязательное поле.
 *   @property {string} REDIS_HOST - Хост Redis. Значение по умолчанию: 'localhost'.
 *   @property {number} REDIS_PORT - Порт Redis. Значение по умолчанию: 6379.
 *   @property {string} REDIS_PASS - Пароль Redis. Обязательное поле.
 *   @property {string} KAFKA_BROKER - Брокер Kafka. Обязательное поле.
 *   @property {string} KAFKA_CLIENT_ID - Идентификатор клиента Kafka. Обязательное поле.
 *   @property {string} KAFKA_GROUP_ID - Идентификатор группы Kafka. Обязательное поле.
//  *   @property {string} LOKI_HOST - URI для Loki. Обязательное поле.
 *   @property {boolean} PLAYGROUND_GQL - Включение GraphQL Playground. Значение по умолчанию: false.
 */
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  TZ: Joi.string().default('Asia/Yekaterinburg'),
  PORT_GQL: Joi.number().default(3015),
  RMQ_URL: Joi.string().required(),
  RMQ_VHOST: Joi.string().default(''),
  RMQ_QUEUE_GQL: Joi.string().required(),
  RMQ_QUEUE_DATA_LOADER: Joi.string().required(),
  RMQ_QUEUE_JOURNALIZATION: Joi.string().required(),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASS: Joi.string().required(),
  KAFKA_BROKER: Joi.string().required(),
  KAFKA_CLIENT_ID: Joi.string().required(),
  KAFKA_GROUP_ID: Joi.string().required(),
  // LOKI_HOST: Joi.string().uri().required(),
  PLAYGROUND_GQL: Joi.boolean().default(false),

  KEYCLOAK_HOST_PORT: Joi.string().required(),
  KEYCLOAK_REALM: Joi.string().required(),
  KEYCLOAK_CLIENT_ID: Joi.string().required(),
  KEYCLOAK_CLIENT_SECRET: Joi.string().required(),
});
