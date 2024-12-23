import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchAreasService } from './search-areas.service';
import {
  GetSearchAreasInputDTO,
  SearchAreasDTO,
} from './other/searchAreas.dto';

@Resolver(() => SearchAreasDTO)
export class SearchAreasResolver {
  constructor(private readonly searchAreasService: SearchAreasService) {}

  @Query(() => SearchAreasDTO, {
    name: 'getSearchAreas',
    description: 'Получение областей поиска',
  })
  async getSearchAreas(
    @Args('input', {
      description: 'Параметры запроса для получения областей поиска',
    })
    getSearchAreasInput: GetSearchAreasInputDTO
  ): Promise<SearchAreasDTO> {
    const { input } = getSearchAreasInput;
    return await this.searchAreasService.getSearchAreas(input);
  }
}
