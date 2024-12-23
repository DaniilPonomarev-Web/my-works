import { Module } from '@nestjs/common';
import { SearchUnlinkedMsisdnsService } from './search-unlinked-msisdns.service';
import { SearchUnlinkedMsisdnsResolver } from './search-unlinked-msisdns.resolver';
import { RabbitModule } from '@web-clients-backend/rabbit';
import { LogsAndJournalsModule } from '@web-clients-backend/logs';

@Module({
  imports: [RabbitModule, LogsAndJournalsModule],
  providers: [SearchUnlinkedMsisdnsService, SearchUnlinkedMsisdnsResolver],
  exports: [SearchUnlinkedMsisdnsService, SearchUnlinkedMsisdnsResolver],
})
export class SearchUnlinkedMsisdnsModule {}
