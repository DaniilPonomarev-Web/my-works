import { Currency } from '@money-app/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyService } from './currency.service';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([Currency])],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
