import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ClickhouseClientService } from './clickhouse-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLICKHOUSE_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: `${process.env['CH_URL']}`,
          package: 'clickhouse.grpc',
          protoPath: join(__dirname, 'assets/clickhouse.proto'),
        },
      },
    ]),
  ],
  providers: [ClickhouseClientService],
  exports: [ClickhouseClientService],
})
export class ClickhouseClientModule {}
