import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RabbitLocalService {
  private readonly logger = new Logger(RabbitLocalService.name);

  constructor() {}
}
