import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @IsString()
  NODE_ENV: string;
  @IsString()
  BUILD_FLAG: string;
  @IsNumber()
  PORT: number;
  @IsNumber()
  PORT_DL: number;
  @IsNumber()
  REACT_PORT: number;
  @IsString()
  GQL_API_URL: string;

  @IsString()
  JWT_TIME: string;
  @IsString()
  LONG_JWT_TIME: string;
  @IsString()
  JWT_TIME_CUSTOMER: string;
  @IsString()
  LONG_JWT_TIME_CUSTOMER: string;

  @IsString()
  PG_USER: string;
  @IsString()
  PG_PASS: string;
  @IsString()
  PG_DB: string;
  @IsNumber()
  PG_PORT: number;
  @IsBoolean()
  PG_LOG: boolean;
  @IsBoolean()
  DB_SYNC: boolean;

  @IsString()
  REDIS_HOST: string;
  @IsNumber()
  REDIS_PORT: number;
  @IsString()
  REDIS_PASS: string;

  @IsString()
  RABBITMQ_DEFAULT_USER: string;
  @IsString()
  RABBITMQ_DEFAULT_PASS: string;

  @IsString()
  RMQ_URL: string;
  @IsString()
  RMQ_QUEUE: string;
  @IsString()
  RMQ_QUEUE_DATA_LOADER: string;
  @IsString()
  RMQ_DEF_USER: string;
  @IsString()
  RMQ_DEF_PASS: string;

  @IsString()
  MINIO_ENDPOINT: string;
  @IsBoolean()
  MINIO_USE_SSL: boolean;
  @IsString()
  MINIO_ROOT_USER: string;
  @IsString()
  MINIO_ROOT_PASSWORD: string;
  @IsNumber()
  MINIO_PORT: number;

  @IsString()
  LOKI_HOST: string;
  @IsString()
  UID: string;
  @IsString()
  GF_SECURITY_ADMIN_PASSWORD: string;
  @IsBoolean()
  GF_USERS_ALLOW_SIGN_UP: boolean;
  @IsString()
  GF_SERVER_DOMAIN: string;
  @IsBoolean()
  GF_SMTP_ENABLED: boolean;
  @IsString()
  GF_SMTP_HOST: string;
  @IsString()
  GF_SMTP_USER: string;
  @IsString()
  GF_SMTP_PASSWORD: string;
  @IsString()
  GF_SMTP_FROM_ADDRESS: string;

  @IsString()
  KAFKA_BROKER: string;
  @IsString()
  KAFKA_CLIENT_ID: string;
  @IsString()
  KAFKA_GROUP_ID: string;

  @IsString()
  SEND_EMAIL: string;
  @IsString()
  SEND_EMAIL_TO: string;
  @IsString()
  SMTP_LOGIN: string;
  @IsString()
  SMTP_PASS: string;
  @IsString()
  SMTP_HOST: string;
  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  JWT_ACCESS_TOKEN_PUBLIC_KEY: string;

  @IsString()
  JWT_ACCESS_TOKEN_PUBLIC_KEY_CUSTOMER: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
