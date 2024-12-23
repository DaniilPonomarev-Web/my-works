import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting, SettingView } from '@money-app/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Setting, SettingView])],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
