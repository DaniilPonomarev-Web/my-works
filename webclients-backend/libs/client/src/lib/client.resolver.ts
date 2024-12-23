import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { ClientService } from './client.service';
import {
  EXCEPTIONMSGQL,
  generateTokenContext,
  IAccessTokenInput,
  IClientApiResult,
} from '@web-clients-backend/shared';
// import { KeycloakTokenGuard } from '@web-clients-backend/keycloak';

// @UseGuards(KeycloakTokenGuard)
@Resolver(() => ClientApiMeDTO)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query(() => ClientApiMeDTO, {
    name: 'getClient',
    description: 'Получение данных клиента',
    complexity: 2,
  })
  async getClientData(
    @Args('input', { nullable: false }) clientId: string,
    @Context() context: any
  ): Promise<ClientApiMeDTO> {
    const tokenInput: IAccessTokenInput = {
      access_token: await generateTokenContext(context),
      traceId: { traceID: uuidv4() },
    };

    const userData: IClientApiResult | null =
      await this.clientService.getClient(tokenInput, clientId);
    if (!userData) {
      throw new HttpException(EXCEPTIONMSGQL.apime, HttpStatus.NOT_FOUND);
    }

    const clientData: any = await this.clientService.normalizeClient(userData);

    return userData;
  }
}
