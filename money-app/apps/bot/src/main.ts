import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env['RMQ_URL']}`],
      queue: process.env['RMQ_QUEUE'],
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.listen();
}

bootstrap();
