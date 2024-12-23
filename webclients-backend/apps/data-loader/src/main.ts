import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { DlModule } from './app/dl.module';
import { Transport } from '@nestjs/microservices';
import { ConfigurationBroker } from '@web-clients-backend/shared';

async function bootstrap() {
  const app = await NestFactory.create(DlModule);
  const broker = app.get(ConfigService).get<ConfigurationBroker>('broker');
  if (!broker) {
    throw new Error('Configuration for "broker" is missing DL');
  }
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${broker.url}${broker.vhost}`],
      queue: broker.queues.dl,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
}

bootstrap();
