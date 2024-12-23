import { Module } from '@nestjs/common';
import { ProverkachekaService } from './proverkacheka.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecksData } from '@money-app/entities';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([ChecksData])],
  providers: [ProverkachekaService],
  exports: [ProverkachekaService],
})
export class ProverkachekaModule {}
