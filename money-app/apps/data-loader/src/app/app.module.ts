import { Module } from '@nestjs/common';

import { AppService } from './app.service';
// import { ClickhouseClientModule } from '@money-app/clickhouse-client';
import { BotMessagePattern } from './rabbit.message';
import { TransactionPgModule } from '@money-app/transaction-pg';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    TransactionPgModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: getMetadataArgsStorage().tables.map((tbl) => {
            return tbl.target;
          }),
        }),
    }),
  ], //ClickhouseClientModule,
  controllers: [BotMessagePattern],
  providers: [AppService],
})
export class AppModule {}
