import * as Joi from 'joi';

/**
 * @object validationSchema
 * @description Схема валидации для проверки переменных окружения с использованием Joi.
 * Убедитесь, что все обязательные переменные окружения присутствуют и имеют корректные значения.
 */
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  TZ: Joi.string().default('Asia/Yekaterinburg'),
  RMQ_URL: Joi.string().required(),
  RMQ_VHOST: Joi.string().default(''),
  RMQ_QUEUE_DATA_LOADER: Joi.string().required(),
  APIME_URI: Joi.string().required(),
  APIME_PASS: Joi.string().required(),
});
