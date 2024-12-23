export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  tz: process.env.TZ,
  broker: {
    url: process.env.RMQ_URL,
    vhost: process.env.RMQ_VHOST,
    queues: {
      orders: process.env.RMQ_QUEUE_ORDER,
      sync: process.env.RMQ_QUEUE,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    psw: process.env.REDIS_PASS,
  },
});

export interface Configuration {
  port: number;
  tz: string;
  broker: ConfigurationBroker;
  redis: ConfigurationRedis;
}

export interface ConfigurationBroker {
  url: string;
  vhost: string;
  queues: ConfigurationBrokerQueue;
}

export interface ConfigurationBrokerQueue {
  /**
   * Новые заказы
   */
  orders: string;

  /**
   * Синхронизация
   */
  sync: string;
}

export interface ConfigurationRedis {
  host: string;
  port: number;
  psw: string;
}
