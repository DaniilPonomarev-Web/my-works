import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

@Injectable()
export class AppLoggerLokiService implements NestLoggerService {
  private readonly lokiLogger: winston.Logger | null = null;

  constructor() {
    this.lokiLogger = winston.createLogger({
      transports: [
        new LokiTransport({
          host: process.env['LOKI_HOST'] ?? 'http://localhost:3100',
          json: false,
          replaceTimestamp: true,
          labels: {
            bot: 'bot',
          },
          onConnectionError: (err) => console.error(err),
        }),
      ],
    });
  }

  log(message: string, label: string) {
    if (this.lokiLogger) {
      this.lokiLogger.info(message, { labels: { [label]: label } });
    } else {
      console.info(message);
    }
  }

  error(message: string, label: string) {
    if (this.lokiLogger) {
      this.lokiLogger.error({ message, labels: { [label]: label } });
    } else {
      // Обработка в случае, если логгер не инициализирован (например, в продакшене)
      console.error(message);
    }
  }

  warn(message: string) {
    if (this.lokiLogger) {
      this.lokiLogger.warn(message);
    } else {
      // Обработка в случае, если логгер не инициализирован (например, в продакшене)
      console.warn(message);
    }
  }
}
