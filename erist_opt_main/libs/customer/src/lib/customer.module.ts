import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { Customer } from '@erist-opt/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService, CustomerResolver, CustomerSeedService],
  exports: [CustomerService],
})
export class CustomerModule {}
