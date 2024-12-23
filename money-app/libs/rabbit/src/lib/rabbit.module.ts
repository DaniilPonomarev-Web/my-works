import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MONEY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env['RMQ_URL']}`],
          queue: process.env['RMQ_QUEUE_DATA_LOADER'],
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}
