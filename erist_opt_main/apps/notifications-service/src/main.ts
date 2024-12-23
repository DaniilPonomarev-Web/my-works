import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env['KAFKA_BROKER']],
        },
        consumer: {
          groupId: process.env['KAFKA_GROUP_ID'],
        },
      },
    }
  );

  await app.listen();
}
bootstrap();
