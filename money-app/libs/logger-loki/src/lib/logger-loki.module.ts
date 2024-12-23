import { Module } from '@nestjs/common';
import { AppLoggerLokiService } from './logger-loki.service';

@Module({
  providers: [AppLoggerLokiService],
  exports: [AppLoggerLokiService],
})
export class LoggerLokiModule {}
