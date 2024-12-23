import { Module } from '@nestjs/common';
import * as https from 'https';
import { HttpModule } from '@nestjs/axios';
import { DadataService } from './dadata.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://suggestions.dadata.ru/',
      timeout: 10000,
      maxRedirects: 300,
      httpsAgent: new https.Agent({
        rejectUnauthorized: true,
      }),
      headers: {
        Authorization: `Token ${process.env['DADATA_API_KEY']}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }),
  ],
  providers: [DadataService],
  exports: [DadataService],
})
export class DadataModule {}
