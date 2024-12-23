import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Option,
  OptionFilter,
  OptionValue,
  ProductOptionValue,
} from '@erist-opt/shared';
import { OptionService } from './options.service';
import { OptionResolver } from './options.resolver';
import { OptionOneCService } from './optionsOneC.service';
import { OptionValuesOneCService } from './optionValuesOneC.service';
import { LogsModule } from '@erist-opt/logs';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Option,
      OptionValue,
      OptionFilter,
      ProductOptionValue,
    ]),
    LogsModule,
  ],

  providers: [
    OptionService,
    OptionResolver,
    OptionOneCService,
    OptionValuesOneCService,
  ],
  exports: [OptionService, OptionOneCService, OptionValuesOneCService],
})
export class OptionModule {}
