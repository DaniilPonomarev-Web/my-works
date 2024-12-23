import { Transaction } from '@money-app/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionPgService } from './transaction-pg.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionPgService],
  exports: [TransactionPgService],
})
export class TransactionPgModule {}
