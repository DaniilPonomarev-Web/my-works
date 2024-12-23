import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DLService } from './dl.service';
import { DLMessagePattern } from './dl.controller';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { ApimeIntegrationModule } from '@web-clients-backend/apime-integration';
import { KeycloakIntegrationModule } from '@web-clients-backend/keycloak-integration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    ApimeIntegrationModule,
    KeycloakIntegrationModule,
  ],
  controllers: [DLMessagePattern, DLService],
  providers: [DLService],
})
export class DlModule {}
