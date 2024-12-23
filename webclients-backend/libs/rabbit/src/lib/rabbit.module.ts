import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationBroker } from '@web-clients-backend/shared';
import { SearchService } from './searchСlientService/rabbit.search-client.service';

/**
 * @module RabbitModule
 * @description Модуль для интеграции RabbitMQ с приложением NestJS.
 * Этот модуль настраивает клиентов для работы с RabbitMQ, используя микросервисную архитектуру.
 */
@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'WEB_CLIENTS',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const config = configService.get<ConfigurationBroker>('broker');
          if (!config) {
            throw new Error('Broker configuration is missing');
          }
          return {
            name: 'WEB_CLIENTS',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${config.url}${config.vhost}`],
              queue: config.queues.dl,
              noAck: true,
              queueOptions: {
                durable: true,
              },
              socketOptions: {
                // rejectUnauthorized: false, // Отключение проверки SSL
              },
            },
          };
        },
        inject: [ConfigService],
      },
      {
        name: 'JOURNALIZATION',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const config = configService.get<ConfigurationBroker>('broker');
          if (!config) {
            throw new Error('Broker JZ configuration is missing');
          }
          return {
            name: 'JOURNALIZATION',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${config.url}${config.vhost}`],
              queue: config.queues.jz,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RabbitMQService, SearchService],
  exports: [RabbitMQService],
})
export class RabbitModule {}
