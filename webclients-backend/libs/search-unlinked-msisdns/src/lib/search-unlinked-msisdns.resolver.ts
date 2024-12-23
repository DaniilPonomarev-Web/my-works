import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { SearchUnlinkedMsisdnsService } from './search-unlinked-msisdns.service';
import {
  MsisdnFilterDTO,
  SearchUnlinkedMsisdnsQueryDto,
  SortInputDTO,
} from './dto/payload.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  generatePaginationArray,
  generateTokenContext,
  IAccessTokenInput,
  ISearchUnlinkedMsisdnsPayload,
  ISearchUnlinkedMsisdnsResponse,
  PaginationDTO,
  SearchUnlinkedMsisdnsDTO,
  UnlinkedMsisdnsDto,
} from '@web-clients-backend/shared';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class SearchUnlinkedMsisdnsResolver {
  constructor(
    private readonly searchUnlinkedMsisdnsService: SearchUnlinkedMsisdnsService
  ) {}

  @Query(() => SearchUnlinkedMsisdnsDTO, {
    name: 'searchUnlinkedMsisdns',
    description: 'Поиск свободных номеров',
  })
  async searchUnlinkedMsisdns(
    @Context() context: any,
    @Args('input', {
      nullable: false,
      description: 'Параметры запроса на поиск свободных номеров',
    })
    input: SearchUnlinkedMsisdnsQueryDto,

    @Args('pagination', {
      nullable: false,
      description:
        'Параметры для пагинации результатов поиска свободных номеров',
    })
    pagination: PaginationDTO,

    @Args('sort', {
      nullable: true,
      description:
        'Параметры для сортировки результатов поиска свободных номеров',
    })
    sort?: SortInputDTO,

    @Args('filter', {
      nullable: true,
      description:
        'Параметры для фильтрации результатов поиска свободных номеров',
    })
    filter?: MsisdnFilterDTO
  ): Promise<SearchUnlinkedMsisdnsDTO> {
    const tokenInput: IAccessTokenInput = {
      access_token: await generateTokenContext(context),
      traceId: { traceID: uuidv4() },
    };

    const payload: ISearchUnlinkedMsisdnsPayload = {
      tokenInput,
      input,
    };

    const dataSearch: ISearchUnlinkedMsisdnsResponse | null =
      await this.searchUnlinkedMsisdnsService.searchUnlinkedMsisdns(payload);

    // console.log('dataSearch:', dataSearch);
    if (!dataSearch) {
      throw new HttpException(
        'ошибка при поиске свободных номеров',
        HttpStatus.BAD_REQUEST
      );
    }
    if (!Array.isArray(dataSearch)) {
      throw new HttpException(
        'msisdns должен быть массивом',
        HttpStatus.BAD_REQUEST
      );
    }

    const normalizedData: UnlinkedMsisdnsDto[] =
      await this.searchUnlinkedMsisdnsService.normalizedMsisdns(dataSearch);

    const filteredDataSearch: UnlinkedMsisdnsDto[] =
      await this.searchUnlinkedMsisdnsService.filter(normalizedData, filter);

    const sortedData: UnlinkedMsisdnsDto[] =
      await this.searchUnlinkedMsisdnsService.sort(filteredDataSearch, sort);

    const sliceArray = await generatePaginationArray(
      sortedData,
      pagination.page,
      pagination.perPage
    );

    const data: SearchUnlinkedMsisdnsDTO = {
      items: sliceArray.arraySlice,
      total: sliceArray.total,
    };

    return data;
  }
}
