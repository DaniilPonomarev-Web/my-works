import { Test, TestingModule } from '@nestjs/testing';
import { SearchAreaEnum } from '@web-clients-backend/shared';
import { SearchAreasService } from '../search-areas.service';

/**
 Подсказать области поиска в зависимости от поискового запроса, сразу после ввода трех символов:
Если ввели 5 букв, 5 букв со спецсимволами: ФИО, Наименование, Процессы, Услуги, Тарифы
Если ввели 5 цифр или 5 цифр со спецсимволами: Серия и номер паспорта, Номер договора, Номер лицевого счета, Абонентский номер телефона MSISDN, Свободный номер, Дополнительный городской номер, Номер sim-карты ICC
Если ввели больше 5 символов, и это буквы и цифры со спецсимволами или без:  Наименование, Процессы, Услуги, Тарифы
Если ввели меньше 5 букв или цифр без спецсимволов или со спецсимволами, показать текст: "Укажите хотя бы пять букв или цифр искомого параметра"
 */
describe('SearchAreasService', () => {
  let service: SearchAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchAreasService],
    }).compile();

    service = module.get<SearchAreasService>(SearchAreasService);
  });

  it('следует вернуть FIO и связанные области для 5+ букв с символами', async () => {
    const result = await service.getSearchAreas('Вася Пупки%');
    expect(result.areas).toEqual([
      { area: SearchAreaEnum.FIO, label: 'ФИО' },
      { area: SearchAreaEnum.TITLE, label: 'Название' },
      { area: SearchAreaEnum.PROCESSES, label: 'Процессы' },
      { area: SearchAreaEnum.SERVICES, label: 'Услуги' },
      { area: SearchAreaEnum.TARIFFS, label: 'Тарифы' },
    ]);
  });

  it('следует возвращать области, связанные с паспортом, для 5+ цифр с символами', async () => {
    const result = await service.getSearchAreas('12345');
    expect(result.areas).toEqual([
      { area: SearchAreaEnum.PASSPORT, label: 'Паспорт' },
      { area: SearchAreaEnum.CONTRACT_NUMBER, label: 'Номер договора' },
      { area: SearchAreaEnum.ACCOUNT_NUMBER, label: 'Номер лицевого счета' },
      {
        area: SearchAreaEnum.MSISDN,
        label: 'Номер телефона (свободный номер)',
      },
      { area: SearchAreaEnum.SUBSCRIBER_NUMBER, label: 'Абонентский номер' },
      { area: SearchAreaEnum.DGN, label: 'ДГН' },
      { area: SearchAreaEnum.ICC, label: 'Номер sim-карты ICC' },
    ]);
  });

  it('следует возвращать смешанные области для 5+ смешанных енамок', async () => {
    const result = await service.getSearchAreas('Вася 322');
    expect(result.areas).toEqual([
      { area: SearchAreaEnum.PASSPORT, label: 'Паспорт' },
      { area: SearchAreaEnum.CONTRACT_NUMBER, label: 'Номер договора' },
      { area: SearchAreaEnum.ACCOUNT_NUMBER, label: 'Номер лицевого счета' },
      {
        area: SearchAreaEnum.MSISDN,
        label: 'Номер телефона (свободный номер)',
      },
      { area: SearchAreaEnum.SUBSCRIBER_NUMBER, label: 'Абонентский номер' },
      { area: SearchAreaEnum.DGN, label: 'ДГН' },
      { area: SearchAreaEnum.ICC, label: 'Номер sim-карты ICC' },
    ]);
  });

  it('должен возвращать пустой массив для менее чем 5 символов', async () => {
    const result = await service.getSearchAreas('abc');
    expect(result.areas).toEqual([]);
  });
});
