import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: '*',
  });
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://${process.env['RMQ_URL']}`],
  //     queue: process.env['RMQ_QUEUE'],
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });
  const port = process.env.PORT || 3100;
  await app.startAllMicroservices();
  await app.listen(port);
  Logger.log(`🚀 backend запущен на порту: ${port}`);
}

bootstrap();
