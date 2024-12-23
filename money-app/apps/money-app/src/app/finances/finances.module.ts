import { Module } from '@nestjs/common';
import { CategoryModule } from '@money-app/category';
import { UserModule } from '@money-app/user';
import { FinancesApiController } from './finances.controller';
import { RabbitModule } from '@money-app/rabbit';

@Module({
  imports: [UserModule, CategoryModule, RabbitModule],
  controllers: [FinancesApiController],
  providers: [],
})
export class FinancesApiModule {}
