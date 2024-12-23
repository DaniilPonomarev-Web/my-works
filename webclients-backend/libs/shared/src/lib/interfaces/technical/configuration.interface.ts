/**
 * @interface Configuration
 * @description Основная конфигурация приложения.
 */
export interface Configuration {
  /**
   * Порт, на котором будет работать приложение.
   */
  port: number;

  /**
   * Часовой пояс приложения.
   */
  tz: string;

  /**
   * Адрес узла Elasticsearch.
   */
  elasticsearchNode: string;

  /**
   * Адрес узла Loki для логирования.
   */
  lokiHost: string;

  /**
   * Конфигурация брокера сообщений.
   */
  broker: ConfigurationBroker;

  /**
   * Конфигурация Redis.
   */
  redis: ConfigurationRedis;

  /**
   * Конфигурация Kafka.
   */
  kafka: ConfigurationKafka;

  /**
   * Конфигурация PostgreSQL.
   */
  postgres: ConfigurationPostgres;

  /**
   * Конфигурация API Me.
   */
  apime: ConfigurationApiMe;
}

/**
 * @interface ConfigurationBroker
 * @description Конфигурация брокера сообщений.
 */
export interface ConfigurationBroker {
  /**
   * URL брокера сообщений.
   */
  url: string;

  /**
   * Виртуальный хост брокера.
   */
  vhost: string;

  /**
   * Очереди, используемые в брокере.
   */
  queues: ConfigurationBrokerQueue;
}

/**
 * @interface ConfigurationBrokerQueue
 * @description Конфигурация очередей брокера сообщений.
 */
export interface ConfigurationBrokerQueue {
  /**
   * Имя очереди GQ.
   */
  gq: string;

  /**
   * Имя очереди DL.
   */
  dl: string;

  /**
   * Имя очереди JZ.
   */
  jz: string;
}

/**
 * @interface ConfigurationKafka
 * @description Конфигурация Kafka.
 */
export interface ConfigurationKafka {
  /**
   * Адрес Kafka брокера.
   */
  address: string;

  /**
   * Идентификатор клиента.
   */
  clientID: string;

  /**
   * Идентификатор группы.
   */
  groupID: string;
}

/**
 * @interface ConfigurationPostgres
 * @description Конфигурация базы данных PostgreSQL.
 */
export interface ConfigurationPostgres {
  /**
   * Имя пользователя базы данных.
   */
  user: string;

  /**
   * Пароль базы данных.
   */
  pass: string;

  /**
   * Название базы данных.
   */
  database: string;

  /**
   * Порт подключения к базе данных.
   */
  port: string;

  /**
   * Флаг для включения/выключения логирования запросов.
   */
  log: boolean;

  /**
   * Флаг для синхронизации схемы.
   */
  sync: boolean;
}
/**
 * @interface ConfigurationRedis
 * @description Конфигурация Redis.
 */
export interface ConfigurationRedis {
  /**
   * Адрес Redis сервера.
   */
  host: string;

  /**
   * Порт Redis сервера.
   */
  port: number;

  /**
   * Пароль для подключения к Redis.
   */
  pass: string;
}

/**
 * @interface ConfigurationApiMe
 * @description Конфигурация APIMe.
 */
export interface ConfigurationApiMe {
  /**
   * URI APIMe.
   */
  uri: string;

  /**
   * Пароль для доступа к APIMe.
   */
  pass: string;
}

/**
 * @interface ConfigurationKeycloak
 * @description Конфигурация APIMe.
 */
export interface ConfigurationKeycloak {
  /**
   * Флаг активации защиты с помощью Keycloak.
   */
  keycloakGuard: boolean;

  /**
   * Адрес хоста Keycloak.
   */
  host: string;

  /**
   * Имя Realm-а в Keycloak.
   */
  realm: string;

  /**
   * Идентификатор клиента в Keycloak.
   */
  client_id: string;

  /**
   * Секрет клиента в Keycloak.
   */
  client_secret: string;
}
