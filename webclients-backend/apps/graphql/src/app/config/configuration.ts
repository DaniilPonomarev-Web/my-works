/**
 * @config
 * @name DefaultConfig
 * @description Конфигурация приложения, получаемая из переменных окружения.
 * @returns {Object} Объект конфигурации с параметрами приложения.
 * @properties
 *   @property {number} port - Порт для GraphQL сервера. Значение по умолчанию: 3015.
 *   @property {string} tz - Часовой пояс приложения.
 *   @property {Object} broker - Конфигурация брокера RabbitMQ.
 *     @property {string} broker.url - URL для RabbitMQ.
 *     @property {string} broker.vhost - Виртуальный хост RabbitMQ.
 *     @property {Object} broker.queues - Очереди RabbitMQ.
 *       @property {string} broker.queues.gq - Имя очереди для GraphQL сообщений.
 *       @property {string} broker.queues.dl - Имя очереди для загрузчика данных.
 *       @property {string} broker.queues.jz - Имя очереди для журнализации.
 *   @property {Object} redis - Конфигурация Redis.
 *     @property {string} redis.host - Хост Redis.
 *     @property {number} redis.port - Порт Redis.
 *     @property {string} redis.pass - Пароль Redis.
 *   @property {Object} kafka - Конфигурация Kafka.
 *     @property {string} kafka.address - Брокер Kafka.
 *     @property {string} kafka.clientID - Идентификатор клиента Kafka.
 *     @property {string} kafka.groupID - Идентификатор группы Kafka.
 *   @property {string} lokiHost - URI для Loki.
 *   @property {boolean} playgroundGQL - Включение GraphQL Playground.
 */
export default (): object => ({
  port: process.env.PORT_GQL ? parseInt(process.env.PORT_GQL) : 3015,
  tz: process.env.TZ,
  broker: {
    url: process.env.RMQ_URL,
    vhost: process.env.RMQ_VHOST,
    queues: {
      gq: process.env.RMQ_QUEUE_GQL,
      dl: process.env.RMQ_QUEUE_DATA_LOADER,
      jz: process.env.RMQ_QUEUE_JOURNALIZATION,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASS,
  },
  kafka: {
    address: process.env.KAFKA_BROKER,
    clientID: process.env.KAFKA_CLIENT_ID,
    groupID: process.env.KAFKA_GROUP_ID,
  },
  keycloak: {
    keycloakGuard: process.env.KEYCLOAK_GUARD === 'true',
    host: process.env.KEYCLOAK_HOST_PORT,
    realm: process.env.KEYCLOAK_REALM,
    client_id: process.env.KEYCLOAK_CLIENT_ID,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
  },
  // lokiHost: process.env.LOKI_HOST,
  // openSearchHost: process.env.OPENSEARCHHOST,
  playgroundGQL: process.env.PLAYGROUND_GQL,
});
