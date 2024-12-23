import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';

import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ConfigurationBroker } from './app/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<string>('port') || 3015;

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const broker = app.get(ConfigService).get<ConfigurationBroker>('broker');
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${broker.url}${broker.vhost}`],
      queue: broker.queues.orders,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
