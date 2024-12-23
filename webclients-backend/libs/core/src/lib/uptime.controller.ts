import { Controller, Get } from '@nestjs/common';

@Controller()
export class UptimeController {
  @Get('uptime')
  uptime() {
    return process.uptime();
  }
}
