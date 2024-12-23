import { Module } from '@nestjs/common';
import { GenerateInvoiceController } from './generate-invoice.controller';
import { GenerateInvoiceService } from './generate-invoice.service';
import { MinioLocalModule } from '@erist-opt/minio';
import { LogsModule } from '@erist-opt/logs';

@Module({
  controllers: [GenerateInvoiceController],
  imports: [MinioLocalModule, LogsModule],
  providers: [GenerateInvoiceService],
  exports: [GenerateInvoiceService],
})
export class GenerateInvoiceModule {}
