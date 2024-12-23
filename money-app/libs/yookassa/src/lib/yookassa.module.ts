import { Module } from '@nestjs/common';
import { YookassaService } from './yookassa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Payment } from '@money-app/entities';
import { RabbitModule } from '@money-app/rabbit';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    HttpModule.register({
      baseURL: 'https://api.yookassa.ru/v3/',
      timeout: 5000,
      maxRedirects: 300,
      // httpsAgent: new https.Agent({
      //   rejectUnauthorized: true,
      // }),
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Idempotence-Key': crypto.randomBytes(16).toString('hex'),
      //   Authorization: `Basic ${getAuthHeader().base64Auth}`,
      // },
    }),
    RabbitModule,
  ],
  providers: [YookassaService],
  exports: [YookassaService],
})
export class YookassaModule {}
