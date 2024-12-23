/**
 * @description Возвращает объект конфигурации приложения, извлекая значения из переменных окружения.
 * Конфигурация включает настройки таймзоны, брокера сообщений RabbitMQ, подключения к PostgreSQL и узла Elasticsearch.
 */

/**
 * @property {string} tz - Таймзона приложения, извлекается из переменной окружения TZ.
 * @property {object} broker - Конфигурация RabbitMQ.
 * @property {string} broker.url - URL подключения к RabbitMQ, извлекается из переменной окружения RMQ_URL.
 * @property {string} broker.vhost - Виртуальный хост RabbitMQ, извлекается из переменной окружения RMQ_VHOST.
 * @property {object} broker.queues - Названия очередей RabbitMQ.
 * @property {string} broker.queues.jz - Название очереди для журнализации, извлекается из переменной окружения RMQ_QUEUE_JOURNALIZATION.
 * @property {object} postgres - Конфигурация подключения к PostgreSQL.
 * @property {string} postgres.user - Имя пользователя для подключения к PostgreSQL, извлекается из переменной окружения PG_USER.
 * @property {string} postgres.pass - Пароль для подключения к PostgreSQL, извлекается из переменной окружения PG_PASS.
 * @property {string} postgres.database - Название базы данных, извлекается из переменной окружения PG_DB.
 * @property {number} postgres.port - Порт для подключения к PostgreSQL, извлекается из переменной окружения PG_PORT.
 * @property {boolean} postgres.log - Логировать ли запросы к PostgreSQL, извлекается из переменной окружения PG_LOG.
 * @property {boolean} postgres.sync - Синхронизация базы данных, извлекается из переменной окружения DB_SYNC.
 * @property {string} elasticsearchNode - URI узла Elasticsearch, извлекается из переменной окружения ELASTICSEARCH_NODE.
 */
export default () => ({
  tz: process.env.TZ,
  broker: {
    url: process.env.RMQ_URL,
    vhost: process.env.RMQ_VHOST,
    queues: {
      jz: process.env.RMQ_QUEUE_JOURNALIZATION,
    },
  },
  postgres: {
    user: process.env.PG_USER,
    pass: process.env.PG_PASS,
    database: process.env.PG_DB,
    port: process.env.PG_PORT,
    log: process.env.PG_LOG,
    sync: process.env.DB_SYNC,
  },
  elasticsearchNode: process.env.ELASTICSEARCH_NODE,
});
