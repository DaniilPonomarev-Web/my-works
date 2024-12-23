import { Module } from '@nestjs/common';
import { AuthCustomerService } from './auth-customer.service';
import { CustomerModule } from '@erist-opt/customer';
import { LocalStrategyCustomer } from './strategy/local.strategy';
import { JwtStrategyCustomer } from './strategy/jwt.strategy';
import { AuthCustomerResolver } from './auth-customer.resolver';
import { JwtCustomerModule } from '@erist-opt/jwt-customer';
import { MinioLocalModule } from '@erist-opt/minio';
import { JwtKeyService } from './JwtKeyService';

@Module({
  imports: [JwtCustomerModule, MinioLocalModule, CustomerModule],
  providers: [
    AuthCustomerService,
    AuthCustomerResolver,
    LocalStrategyCustomer,
    JwtStrategyCustomer,
    JwtKeyService,
  ],
  exports: [LocalStrategyCustomer, JwtStrategyCustomer],
})
export class AuthCustomerModule {}
