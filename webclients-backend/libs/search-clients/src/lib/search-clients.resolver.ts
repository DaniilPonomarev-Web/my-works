import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { SearchClientsService } from './search-clients.service';
import {
  ClientDataDTO,
  generatePaginationArray,
  generateTokenContext,
  IAccessTokenInput,
  IClientSearch,
  IDataClientSearchResponse,
  ISearchClientPayload,
  PaginationDTO,
} from '@web-clients-backend/shared';
import {
  ClientFilterInput,
  ClientsSearchedDTO,
  ClientsSearchInputDTO,
  SortInput,
} from './other/clients.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => ClientDataDTO)
export class SearchClientsResolver {
  constructor(private readonly searchClientsService: SearchClientsService) {}

  @Query(() => ClientsSearchedDTO, {
    name: 'getClientsSearch',
    description: 'Поиск клиентов',
  })
  async getClientsSearch(
    @Context() context: any,
    @Args('pagination', {
      nullable: false,
      description: 'Параметры пагинации для поиска клиентов',
    })
    pagination: PaginationDTO,
    @Args('input', {
      nullable: false,
      description: 'Параметры поиска для клиентов',
    })
    areaSearch: ClientsSearchInputDTO,
    @Args('sort', {
      nullable: true,
      description: 'Параметры сортировки для поиска клиентов',
    })
    sort?: SortInput,
    @Args('filter', {
      nullable: true,
      description: 'Фильтры для поиска клиентов',
    })
    filter?: ClientFilterInput
  ): Promise<ClientsSearchedDTO> {
    const { input, area } = areaSearch;
    const tokenInput: IAccessTokenInput = {
      access_token: await generateTokenContext(context),
      traceId: { traceID: uuidv4() },
    };

    const payload: ISearchClientPayload = {
      tokenInput,
      input,
    };

    const clientsSearched: IDataClientSearchResponse | null =
      await this.searchClientsService.searchClientsByArea(payload, area);

    if (!clientsSearched || !clientsSearched.clients) {
      throw new HttpException('ошибка при поиске', HttpStatus.BAD_REQUEST);
    }

    let clientNormalize: IClientSearch[] =
      await this.searchClientsService.normalizeClient(clientsSearched.clients);

    // Применяем фильтры
    if (filter) {
      const { juridicalType, contractState, marketSegment } = filter;
      clientNormalize = await this.searchClientsService.filterClients(
        clientNormalize,
        marketSegment,
        juridicalType,
        contractState
      );
    }

    if (sort) {
      clientNormalize = await this.searchClientsService.sortClients(
        clientNormalize,
        sort
      );
    }

    const sliceArray = await generatePaginationArray(
      clientNormalize,
      pagination.page,
      pagination.perPage
    );

    const data: ClientsSearchedDTO = {
      items: sliceArray.arraySlice,
      total: sliceArray.total,
    };
    return data;
  }
}
