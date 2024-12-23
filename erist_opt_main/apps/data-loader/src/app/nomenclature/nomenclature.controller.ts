import { Body, Controller, Logger, Post } from '@nestjs/common';

import { InsertNomenclatureDto } from './dto/insert.dto';
import { UpdateNomenclatureDto } from './dto/update.dto';
import { NomenclatureService } from './nomenclature.service';
import { BalanceNomenclatureDto } from './dto/balance.dto';
import { SendingStrategy } from './nomenclature.interface';

@Controller('nomenclature')
export class NomenclatureController {
  private logger = new Logger(NomenclatureController.name);

  constructor(private readonly nomenclatureService: NomenclatureService) {}

  @Post('insert')
  insertNomenclature(
    @Body()
    dto: InsertNomenclatureDto
  ) {
    this.nomenclatureService.processe(SendingStrategy.group, dto, 'products');
    return {
      status: true,
      message: 'Данные импорта получены',
    };
  }

  @Post('balance')
  syncBalanceProducts(@Body() dto: BalanceNomenclatureDto) {
    this.nomenclatureService.processe(SendingStrategy.one, dto);
    return {
      status: true,
      message: 'Данные импорта получены',
    };
  }

  @Post('update')
  updateNomenclature(@Body() updateNomenclatureDto: UpdateNomenclatureDto) {
    this.logger.log(JSON.stringify(updateNomenclatureDto));
    return true;
  }
}
