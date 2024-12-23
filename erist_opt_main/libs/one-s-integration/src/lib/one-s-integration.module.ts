import { Module } from '@nestjs/common';
import { OneSService } from './one-s-integration.service';
import { FileStoreService } from './file-storage.service';

@Module({
  providers: [OneSService, FileStoreService],
  exports: [OneSService],
})
export class OneSIntegrationModule {}
