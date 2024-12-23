import { Module } from '@nestjs/common';
import { KeycloakIntegrationService } from './keycloak-integration.service';

@Module({
  controllers: [],
  providers: [KeycloakIntegrationService],
  exports: [KeycloakIntegrationService],
})
export class KeycloakIntegrationModule {}
