import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  RMQ_URL: Joi.string().required(),
  TELEGRAM_BOT_TOKEN: Joi.string().required(),
  TELEGRAM_BOT_USERNAME: Joi.string().required(),
});
