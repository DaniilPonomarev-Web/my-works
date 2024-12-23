import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { CustomerSeedService } from '@erist-opt/customer';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppLoggerLoki } from '@erist-opt/logs';

const vhost = process.env['RMQ_VHOST'] || '';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(graphqlUploadExpress({ maxFileSize: 10 * 1024 * 1024, maxFiles: 1 }));
  app.enableCors({
    origin: '*', //TODO сделать админку
    credentials: true,
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env['RMQ_URL']}${vhost}`],
      queue: process.env['RMQ_QUEUE'],
      queueOptions: {
        durable: true,
      },
    },
  });

  const port = process.env.PORT || 3000;

  await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = [];

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

  const seedService = app.get(CustomerSeedService);
  await seedService.seedCustomer();

  await app.listen(port);
  const appLogger = app.get(AppLoggerLoki);
  app.useLogger(appLogger);
  Logger.log(`🚀 Ok on старт успешный порт=${port}`);
}

bootstrap();
