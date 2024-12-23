import { Module } from '@nestjs/common';
import { SearchSynonymsService } from './search-synonyms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SynonymGroup } from '@erist-opt/shared';
import { SearchSynonymsResolver } from './search-synonyms.resolver';
import { LogsModule } from '@erist-opt/logs';

@Module({
  imports: [LogsModule, TypeOrmModule.forFeature([SynonymGroup])],
  providers: [SearchSynonymsService, SearchSynonymsResolver],
  exports: [SearchSynonymsService],
})
export class SearchSynonymsModule {}
