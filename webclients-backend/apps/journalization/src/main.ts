import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Transport } from '@nestjs/microservices';
import { ConfigurationBroker } from '@web-clients-backend/shared';
import { JournalizationModule } from './app/journalization.module';

async function bootstrap() {
  const app = await NestFactory.create(JournalizationModule);
  const broker = app.get(ConfigService).get<ConfigurationBroker>('broker');

  if (!broker) {
    throw new Error('Configuration for "broker" is missing JZ');
  }

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${broker.url}${broker.vhost}`],
      queue: broker.queues.jz,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
}

bootstrap();
