import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  TZ: Joi.string().default('Asia/Yekaterinburg'),
  PORT: Joi.number().default(3000),
  RMQ_URL: Joi.string().required(),
  RMQ_VHOST: Joi.string().default(''),
  RMQ_QUEUE: Joi.string().required(),
  RMQ_QUEUE_ORDER: Joi.string().required(),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASS: Joi.string().required(),
});
