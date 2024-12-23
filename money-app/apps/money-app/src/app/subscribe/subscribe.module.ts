import { Module } from '@nestjs/common';
import { SubscribeApiController } from './subscribe.controller';
import { UserModule } from '@money-app/user';
import { YookassaModule } from '@money-app/yookassa';
import { AccountModule } from '@money-app/account';
import { RabbitModule } from '@money-app/rabbit';

@Module({
  imports: [UserModule, YookassaModule, AccountModule, RabbitModule],
  controllers: [SubscribeApiController],
  providers: [],
})
export class SubscribeApiModule {}
