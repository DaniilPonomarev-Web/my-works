import { Module } from '@nestjs/common';
import { SearchClientsService } from './search-clients.service';
import { RabbitModule } from '@web-clients-backend/rabbit';
import { LogsAndJournalsModule } from '@web-clients-backend/logs';
import { SearchClientsResolver } from './search-clients.resolver';
import { SearchAreasResolver } from './search-areas.resolver';
import { SearchAreasService } from './search-areas.service';

@Module({
  imports: [RabbitModule, LogsAndJournalsModule],
  providers: [
    SearchClientsService,
    SearchClientsResolver,
    SearchAreasService,
    SearchAreasResolver,
  ],
  exports: [SearchClientsService, SearchAreasService],
})
export class SearchClientsModule {}
