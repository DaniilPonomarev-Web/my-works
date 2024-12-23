import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @IsString()
  NODE_ENV: string;

  @IsString()
  JWT_TIME: string;
  @IsString()
  LONG_JWT_TIME: string;
  @IsString()
  JWT_TIME_CUSTOMER: string;
  @IsString()
  LONG_JWT_TIME_CUSTOMER: string;
  @IsString()
  JWT_ACCESS_TOKEN_PUBLIC_KEY: string;
  @IsString()
  JWT_ACCESS_TOKEN_PUBLIC_KEY_CUSTOMER: string;

  @IsNumber()
  PG_PORT: number;
  @IsString()
  PG_USER: string;
  @IsString()
  PG_PASS: string;
  @IsString()
  PG_DB: string;

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
  RMQ_URL: string;
  @IsString()
  RMQ_QUEUE: string;
  @IsString()
  RMQ_QUEUE_LOCAL_RMQ: string;

  @IsString()
  MINIO_ENDPOINT: string;
  @IsString()
  MINIO_EXTERNAL_HOST: string;
  @IsString()
  MINIO_ROOT_USER: string;
  @IsString()
  MINIO_ROOT_PASSWORD: string;

  @IsString()
  KAFKA_BROKER: string;
  @IsString()
  KAFKA_CLIENT_ID: string;
  @IsString()
  KAFKA_GROUP_ID: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
