import { pricesMappingResult, pricesMock } from './mock/prices';
import { balancesMappingResult, balancesMock } from './mock/balances';
import { Test } from '@nestjs/testing';
import { NomenclatureService } from './../nomenclature.service';

import { products as productsMock, productMappingResult } from './mock/product';
import {
  categories as categoriesMock,
  categoriesMappingResult,
} from './mock/categories';
import {
  optionTypesMappingResult,
  option_types as optionTypesMock,
} from './mock/option_types';
import { optionsMappingResult, options as optionsMock } from './mock/options';
import { BrokerService } from '../../broker/broker.service';
import { SendingStrategy } from '../nomenclature.interface';

const sendFn = jest.fn();

describe('Сервис Номеклатуру', () => {
  let service: NomenclatureService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        NomenclatureService,
        {
          provide: BrokerService,
          useFactory: () => ({
            sendSyncNomenclature: sendFn,
          }),
        },
      ],
    }).compile();

    service = app.get<NomenclatureService>(NomenclatureService);
  });

  describe('Подготовка данных', () => {
    it('Должно обработать продукты', async () => {
      const data: any = {
        products: productsMock as any,
      };

      const res = await service.readData(data);

      expect(res).toEqual([
        {
          key: 'products',
          result: productMappingResult,
        },
      ]);
    });

    it('Должно обработать категории', async () => {
      const data: any = {
        categories: categoriesMock as any,
      };

      const res = await service.readData(data);

      expect(res).toEqual([
        {
          key: 'categories',
          result: categoriesMappingResult,
        },
      ]);
    });
    it('Должно обработать типы опций', async () => {
      const data: any = {
        option_types: optionTypesMock as any,
      };

      const res = await service.readData(data);

      expect(res).toEqual([
        {
          key: 'option_types',
          result: optionTypesMappingResult,
        },
      ]);
    });
    it('Должно обработать опции', async () => {
      const data: any = {
        options: optionsMock as any,
      };

      const res = await service.readData(data);

      expect(res).toEqual([
        {
          key: 'options',
          result: optionsMappingResult,
        },
      ]);
    });

    it('Должно обработать баланс', async () => {
      const data = {
        balances: balancesMock,
      } as any;

      const res = await service.readData(data);
      expect(res).toEqual([
        {
          key: 'balances',
          result: balancesMappingResult,
        },
      ]);
    });

    it('Должно обработать цены', async () => {
      const data = {
        prices: pricesMock,
      } as any;

      const res = await service.readData(data);
      expect(res).toEqual([
        {
          key: 'prices',
          result: pricesMappingResult,
        },
      ]);
    });
  });

  describe('Отправка обновлений', () => {
    it('Должно отправится один раз, номенклатура', async () => {
      const data: any = {
        products: productsMock as any,
        categories: categoriesMock as any,
        option_types: optionTypesMock as any,
        options: optionsMock as any,
        prices: pricesMock,
        balances: balancesMock,
      };
      await service.processe(SendingStrategy.group, data, 'products');

      expect(sendFn).toHaveBeenCalledTimes(1);
      expect(sendFn.mock.calls[0]).toEqual([
        'products',
        [
          { key: 'products', result: productMappingResult },
          { key: 'categories', result: categoriesMappingResult },
          { key: 'option_types', result: optionTypesMappingResult },
          { key: 'options', result: optionsMappingResult },
        ],
      ]);
    });

    it('Должно отправится 4 раза, номенклатура', async () => {
      sendFn.mockClear();
      const data: any = {
        products: productsMock as any,
        categories: categoriesMock as any,
        option_types: optionTypesMock as any,
        options: optionsMock as any,
      };
      await service.processe(SendingStrategy.one, data);

      expect(sendFn).toHaveBeenCalledTimes(4);

      expect(sendFn.mock.calls[0]).toEqual([
        'products',
        { key: 'products', result: productMappingResult },
      ]);
      expect(sendFn.mock.calls[1]).toEqual([
        'categories',
        { key: 'categories', result: categoriesMappingResult },
      ]);
      expect(sendFn.mock.calls[2]).toEqual([
        'option_types',
        { key: 'option_types', result: optionTypesMappingResult },
      ]);
      expect(sendFn.mock.calls[3]).toEqual([
        'options',
        { key: 'options', result: optionsMappingResult },
      ]);
    });

    it('Должно отправиться 2 раза, обновление баланса и цены', async () => {
      sendFn.mockClear();
      const data: any = {
        balances: balancesMock,
        prices: pricesMock,
      };
      await service.processe(SendingStrategy.one, data);

      expect(sendFn).toHaveBeenCalledTimes(2);

      expect(sendFn.mock.calls[0]).toEqual([
        'balances',
        { key: 'balances', result: balancesMappingResult },
      ]);

      expect(sendFn.mock.calls[1]).toEqual([
        'prices',
        { key: 'prices', result: pricesMappingResult },
      ]);
    });
  });
});
