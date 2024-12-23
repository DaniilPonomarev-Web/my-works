import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { KeycloakService } from './keycloak.service';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKeycloak } from '@web-clients-backend/shared';

@Injectable()
export class KeycloakTokenGuard implements CanActivate {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const keycloakConfig =
      this.configService.get<ConfigurationKeycloak>('keycloak');

    if (!keycloakConfig) {
      throw new Error('keycloak configuration is missing');
    }

    if (!keycloakConfig.keycloakGuard) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const req = gqlContext.req;

    if (req.url === '/gql/health') {
      return true;
    }
    const token =
      GqlExecutionContext.create(context).getContext().req.headers
        .authorization;
    if (!token) {
      console.warn('Токен не действителен в keycloak');
      throw new UnauthorizedException();
    }
    const access_token = token.replace('Bearer ', '');
    const tokenData = await this.keycloakService.introspectToken(access_token);

    if (!tokenData || !tokenData.active) {
      throw new UnauthorizedException('Токен не действителен в keycloak');
    }
    console.warn('Токен действителен в keycloak ');
    return true;
  }
}
