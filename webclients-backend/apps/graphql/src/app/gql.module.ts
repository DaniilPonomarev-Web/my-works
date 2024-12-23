import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from '@web-clients-backend/shared';
import { CoreModule } from '@web-clients-backend/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsAndJournalsModule } from '@web-clients-backend/logs';
import { BrokerMessage } from './app.broker';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
// import { ClientModule } from '@web-clients-backend/client';
import { SearchClientsModule } from '@web-clients-backend/search-clients';
import { AuthModule } from '@web-clients-backend/auth';
import { SearchUnlinkedMsisdnsModule } from '@web-clients-backend/search-unlinked-msisdns';

@Module({
  imports: [
    CoreModule,
    LogsAndJournalsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    // ClientModule,
    AuthModule,
    SearchClientsModule,
    SearchUnlinkedMsisdnsModule,
  ],
  controllers: [AppController, BrokerMessage],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class GqlModule {}
