import { Module } from '@nestjs/common';

import { NomenclatureModule } from './nomenclature/nomenclature.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { AppMessage } from './app.message';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    NomenclatureModule,
    OrderModule,
  ],
  controllers: [AppMessage],
  providers: [],
})
export class AppModule {}
