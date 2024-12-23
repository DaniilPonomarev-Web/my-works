import { Module } from '@nestjs/common';
import { JournalizatingService } from './journalizating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from '@web-clients-backend/shared';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const elasticsearchNode =
          configService.get<string>('elasticsearchNode');
        if (!elasticsearchNode) {
          throw new Error('Elasticsearch node configuration is missing');
        }
        return {
          maxRetries: 10,
          requestTimeout: 60000,
          pingTimeout: 60000,
          sniffOnStart: true,
          node: elasticsearchNode,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    TypeOrmModule.forFeature([Journal]),
  ],
  providers: [JournalizatingService],
  exports: [JournalizatingService],
})
export class JournalizatingModule {}
