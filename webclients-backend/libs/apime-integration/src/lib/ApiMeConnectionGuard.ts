import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ApimeIntegrationService } from './apime-integration.service';
import { EXCEPTIONMSGQL } from '@web-clients-backend/shared';

@Injectable()
export class ApimeConnectionGuard implements CanActivate {
  constructor(
    private readonly apimeIntegrationService: ApimeIntegrationService
  ) {}

  // async canActivate(context: ExecutionContext): Promise<any> {
  //   const graphqlContext = context.getArgs()[2]; // Получаем третий элемент из массива args, который представляет собой контекст GraphQL
  //   const { req } = graphqlContext;

  //   if (!req || !req.user) {
  //     throw new UnauthorizedException(HttpExceptionMessagesGraphQL.errorAuthApiMe);
  //     // throw new HttpException(HttpExceptionMessagesGraphQL.errorAuthApiMe, HttpStatus.UNAUTHORIZED);
  //   }
  //   const phone = req.user.phone;
  //   const apiResponse = await this.apimeIntegrationService.getApimeToken(phone);

  //   if (apiResponse) {
  //     return true;
  //   }
  //   throw new UnauthorizedException(HttpExceptionMessagesGraphQL.errorAuthApiMe);
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const apiHealth = await this.apimeIntegrationService.healthCheck();
    if (!apiHealth) {
      throw new HttpException(
        EXCEPTIONMSGQL.apime.errorHealthApiMe,
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }
}
