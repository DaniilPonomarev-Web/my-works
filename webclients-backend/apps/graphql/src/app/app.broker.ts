import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BrokerMessage {
  constructor() {}
  private logger = new Logger(BrokerMessage.name);
}
