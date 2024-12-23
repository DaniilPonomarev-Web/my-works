import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqMessagePattern } from './rabbit.message';
import { RabbitLocalService } from './rabbit.local.service';
import { ProductModule } from '@erist-opt/product';
import { CategoryModule } from '@erist-opt/category';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions, getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: getMetadataArgsStorage().tables.map((tbl) => {
            return tbl.target;
          }),
        }),
    }),
    ProductModule,
    CategoryModule,
  ],
  controllers: [RmqMessagePattern, RabbitLocalService],
  providers: [RabbitLocalService],
})
export class AppModule {}
