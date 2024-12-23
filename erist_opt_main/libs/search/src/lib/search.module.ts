import { RabbitModule } from '@erist-opt/rabbit';
import { RedisCacheModule } from '@erist-opt/redis';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { SearchSynonymsModule } from '@erist-opt/search-synonyms';

@Module({
  imports: [RabbitModule, RedisCacheModule, SearchSynonymsModule],
  providers: [SearchService, SearchResolver],
  exports: [SearchService],
})
export class SearchModule {}
