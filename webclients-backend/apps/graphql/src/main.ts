import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GqlModule } from './app/gql.module';
import { Transport } from '@nestjs/microservices';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppLoggerLoki } from '@web-clients-backend/logs';
import { ConfigService } from '@nestjs/config';
import { ConfigurationBroker } from '@web-clients-backend/shared';

async function bootstrap() {
  const app = await NestFactory.create(GqlModule);
  const port = app.get(ConfigService).get<string>('port');
  if (!port) {
    throw new Error('Configuration for "port" is missing');
  }
  const globalPrefix = 'gql';

  app.setGlobalPrefix(globalPrefix);
  app.use(graphqlUploadExpress({ maxFileSize: 10 * 1024 * 1024, maxFiles: 1 }));
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const broker = app.get(ConfigService).get<ConfigurationBroker>('broker');

  if (!broker) {
    throw new Error('Configuration for "broker" is missing GQL');
  }

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${broker.url}${broker.vhost}`],
      queue: broker.queues.gq,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Это удалит любые лишние поля, не определенные в DTO
      forbidNonWhitelisted: true, // Эта опция вызывает ошибку, если передано лишнее поле
      exceptionFactory: (errors) => {
        const formattedErrors: any[] = [];

        errors.forEach((error) => {
          if (error.children && error.children.length > 0) {
            // Если есть вложенные ошибки, обрабатываем их
            error.children.forEach((childError) => {
              formattedErrors.push({
                property: `${error.property}.${childError.property}`,
                constraints: childError.constraints,
              });
            });
          } else {
            // Если нет вложенных ошибок, добавляем ошибку для текущего свойства
            formattedErrors.push({
              property: error.property,
              constraints: error.constraints,
            });
          }
        });

        return new BadRequestException(formattedErrors);
      },
    })
  );

  await app.listen(port);
  const appLogger = app.get(AppLoggerLoki);
  app.useLogger(appLogger);
  Logger.log(`🚀 Ok GQL on ${port}`);
}

bootstrap();
