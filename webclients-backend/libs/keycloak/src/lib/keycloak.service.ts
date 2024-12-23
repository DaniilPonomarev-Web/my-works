import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { keycloakMethods } from './keycloak-methods';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKeycloak } from '@web-clients-backend/shared';

@Injectable()
export class KeycloakService {
  private keycloakConfig: any;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    //  let keycloakConfig = configService.get<ConfigurationKeycloak>('keycloak');
    this.keycloakConfig =
      this.configService.get<ConfigurationKeycloak>('keycloak');
  }

  async introspectToken(access_token: string): Promise<any> {
    try {
      const { client_id, client_secret } = this.keycloakConfig;
      const response = await this.httpService.axiosRef.post(
        keycloakMethods.introspect,
        new URLSearchParams({
          client_id,
          client_secret,
          token: access_token,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.warn(error);

      if ((error as NodeJS.ErrnoException).code === 'ENOTFOUND') {
        return null;
      }
      return null;
    }
  }
}
