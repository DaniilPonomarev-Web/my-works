import { Test, TestingModule } from '@nestjs/testing';
import { SearchAreasService } from '../search-areas.service';
import { SearchAreasResolver } from '../search-areas.resolver';
import { SearchAreaEnum } from '@web-clients-backend/shared';
describe('SearchAreasResolver', () => {
  let resolver: SearchAreasResolver;
  let service: SearchAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchAreasResolver,
        {
          provide: SearchAreasService,
          useValue: {
            getSearchAreas: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SearchAreasResolver>(SearchAreasResolver);
    service = module.get<SearchAreasService>(SearchAreasService);
  });

  it('Вызов из сервиса и вернуть данные', async () => {
    const mockResult = {
      areas: [
        {
          area: SearchAreaEnum.FIO,
          label: 'ФИО',
        },
      ],
    };
    jest.spyOn(service, 'getSearchAreas').mockResolvedValue(mockResult);
    const result = await resolver.getSearchAreas({ input: 'пример' });
    expect(service.getSearchAreas).toHaveBeenCalledWith('пример');
    expect(result).toEqual(mockResult);
  });
});
