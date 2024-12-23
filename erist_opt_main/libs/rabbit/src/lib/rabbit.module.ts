import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit.service';
import { LogsModule } from '@erist-opt/logs';

const vhost = process.env['RMQ_VHOST'] || '';
@Module({
  imports: [
    LogsModule,
    ClientsModule.register([
      {
        name: 'ERIST_OPT',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env['RMQ_URL']}${vhost}`],
          queue: process.env['RMQ_QUEUE_DATA_LOADER'],
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'ORDER_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env['RMQ_URL']}${vhost}`],
          queue: process.env['RMQ_QUEUE_ORDER'] || 'erist_orders_queue',
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitModule {}
