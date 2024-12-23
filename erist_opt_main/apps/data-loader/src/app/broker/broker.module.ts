import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationBroker } from '../config/configuration';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'BROKER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const config = configService.get<ConfigurationBroker>('broker');
          return {
            name: 'ERIST_OPT',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${config.url}${config.vhost}`],
              queue: config.queues.sync,
              noAck: true,
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
  providers: [BrokerService],
  exports: [BrokerService],
})
export class BrokerModule {}
