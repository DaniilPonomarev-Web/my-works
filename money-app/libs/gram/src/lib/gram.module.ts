import { Module } from '@nestjs/common';
import { GramService } from './gram.service';

@Module({
  providers: [GramService],
  exports: [GramService],
})
export class GramModule {}
