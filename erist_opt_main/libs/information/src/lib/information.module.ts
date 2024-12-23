import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { Information } from './entity/information.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationAdminResolver } from './informationAdmin.resolver';
import { InformationUserResolver } from './informationUser.resolver';
import { LogsModule } from '@erist-opt/logs';

@Module({
  imports: [TypeOrmModule.forFeature([Information]), LogsModule],
  providers: [
    InformationService,
    InformationAdminResolver,
    InformationUserResolver,
  ],
  exports: [InformationService],
})
export class InformationModule {}
