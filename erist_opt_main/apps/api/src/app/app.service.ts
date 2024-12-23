import { Injectable } from '@nestjs/common';
import { uptime } from 'process';

@Injectable()
export class AppService {
  getData(): number {
    return uptime();
  }
}
