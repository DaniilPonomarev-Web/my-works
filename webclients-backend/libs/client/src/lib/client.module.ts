import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { RabbitModule } from '@web-clients-backend/rabbit';
import { ClientResolver } from './client.resolver';
import { LogsAndJournalsModule } from '@web-clients-backend/logs';
import { KeycloakModule } from '@web-clients-backend/keycloak';

@Module({
  imports: [RabbitModule, LogsAndJournalsModule, KeycloakModule],
  providers: [ClientService, ClientResolver],
  exports: [ClientService, ClientResolver],
})
export class ClientModule {}
