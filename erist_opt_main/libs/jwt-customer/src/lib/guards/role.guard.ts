import { HttpExceptionMessagesGraphQL, ICustomer } from '@erist-opt/shared';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RoleCustomerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  //private readonly logger: LoggerService
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return true; // No roles specified, allow access
    }
    const gqlContext = GqlExecutionContext.create(context);
    const customer: ICustomer = gqlContext.getContext().req.user;
    if (!customer || !customer.role) {
      // this.logger.warn('При проверке роли произошла ошибка - не найден пользователь по токену');
      throw new HttpException(
        HttpExceptionMessagesGraphQL.auth.errorRule,
        HttpStatus.FORBIDDEN
      );
    }
    if (!roles.includes(customer.role)) {
      // this.logger.warn('При проверке роли произошла ошибка - не найден пользователь по токену');
      throw new HttpException(
        HttpExceptionMessagesGraphQL.auth.errorRuler(customer.role, roles),
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }
}
