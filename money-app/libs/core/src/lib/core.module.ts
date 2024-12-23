import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { configuration } from './configuration';
import { validationSchema } from './validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: getMetadataArgsStorage().tables.map((tbl) => {
            return tbl.target;
          }),
        }),
    }),
    LoggerModule.forRoot(),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class CoreModule {}
