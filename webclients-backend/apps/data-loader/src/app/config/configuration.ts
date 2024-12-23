/**
 * @function configuration
 * @description Конфигурация приложения. Загружает переменные окружения для настройки различных сервисов и параметров приложения.
 * @returns {Object} - Объект конфигурации с настройками для часового пояса, брокера сообщений и API Me.
 */
export default () => ({
  tz: process.env.TZ,
  broker: {
    url: process.env.RMQ_URL,
    vhost: process.env.RMQ_VHOST,
    queues: {
      dl: process.env.RMQ_QUEUE_DATA_LOADER,
    },
  },
  apime: {
    uri: process.env.APIME_URI,
    pass: process.env.APIME_PASS,
  },
});
