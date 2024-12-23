import { Module } from '@nestjs/common';

import { NomenclatureController } from './nomenclature.controller';
import { NomenclatureService } from './nomenclature.service';
import { BrokerModule } from '../broker/broker.module';

@Module({
  imports: [BrokerModule],
  controllers: [NomenclatureController],
  providers: [NomenclatureService],
})
export class NomenclatureModule {}
