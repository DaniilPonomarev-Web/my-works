import { Injectable, Logger } from '@nestjs/common';

import { BrokerService } from './../broker/broker.service';
import { InsertNomenclatureDto } from './dto/insert.dto';
import { BalanceNomenclatureDto } from './dto/balance.dto';

import mappingJson from './mapping.config.json';
import { SendingStrategy } from './nomenclature.interface';

type ModsType = 'products';

@Injectable()
export class NomenclatureService {
  private directory;
  private logger = new Logger(NomenclatureService.name);
  private Collection = {};

  constructor(private readonly brokerService: BrokerService) {
    this.directory = this.load();
  }

  async processe(
    strategy: SendingStrategy,
    data: InsertNomenclatureDto | BalanceNomenclatureDto,
    mods?: ModsType
  ) {
    const result = await this.readData(data);

    if (mods === 'products') {
      this.modificationProducts(result);
    }
    this.sendingUpdateData(strategy, result);
  }

  private sendingUpdateData(strategy: SendingStrategy, data: any) {
    const actions = {
      group: () => {
        const key = data[0].key;
        this.logger.log(`Send: nomenclature, strategy:${strategy}`);
        this.brokerService.sendSyncNomenclature(key, data);
        return;
      },
      one: () => {
        for (const r of data) {
          if (r.error) {
            this.logger.error(`key: ${r.key}, send: false, error:${r.error}`);
            continue;
          }
          this.logger.log(`Send: ${r.key}, strategy:${strategy}`);
          this.brokerService.sendSyncNomenclature(r.key, r);
        }
      },
      default: () => {
        this.logger.error('not found strategy sended');
        return;
      },
    };

    return (actions[strategy] || actions['default'])();
  }

  async readData(data: InsertNomenclatureDto | BalanceNomenclatureDto) {
    const keys = Object.keys(data);

    const promises = [];
    for (const key of keys) {
      promises.push(this.mapping(key, data[key]));
    }

    const result = await Promise.all(promises);

    return result;
  }

  private load() {
    return mappingJson;
  }

  private async mapping(name: string, data: any) {
    try {
      const result = [];
      data.forEach((d) => {
        const keys = Object.keys(d);
        const _ = {};
        for (const k of keys) {
          if (!this.directory[name][k] || !d[k]) continue;
          _[this.directory[name][k]] = d[k];
        }
        result.push(_);
      });

      return { key: name, result };
    } catch (error) {
      return { key: name, result: [], error };
    }
  }

  modificationProducts(entities: any[]) {
    let prodictIndex: number;
    const onStore = new Set(['prices', 'balances']);

    let index = 0;
    while (index < entities.length) {
      const entity = entities[index];

      if (onStore.has(entity.key)) {
        this.loadStore(entity.key, entity.result);
        entities.splice(index, 1);
        continue;
      }

      if (entity.key === 'products') prodictIndex = index;

      index++;
    }

    const products = entities[prodictIndex];
    const categories = entities.find((entity) => entity.key === 'categories');
    this.loadStore('categories', categories.result);

    for (const product of products.result) {
      const options = [];

      const price = this.Collection['prices'].get(product.id1c);
      product.categoryId1C = this.createHierarchyCategories(
        product.categoryId1C
      );
      for (const optionId of product.optionIds1C) {
        const key = `${product.id1c}:${optionId}`;
        const balances = this.Collection['balances'].get(key);
        options.push({
          optionId,
          price: price?.price ?? null,
          href: null,
          quantity: balances?.balance ?? null,
        });
      }

      product.options = options;
    }

    this.Collection = {};
  }

  private createHierarchyCategories(id: string) {
    const categories: string[] = [id];
    let currentId = id;

    while (currentId) {
      const _id = this.Collection['categories'].get(currentId);
      if (!_id) break;

      categories.push(_id);
      currentId = _id;
    }

    return categories;
  }

  private loadStore(key: string, collections: any[]) {
    const store = new Map();

    const actions = {
      prices: (row) => store.set(row.productId, row),
      balances: (row) => store.set(`${row.productId}:${row.optionId}`, row),
      categories: (row) => store.set(row.id1c, row.categoryId),
    };

    collections.forEach((row) => actions[key](row));

    this.Collection[key] = store;
  }
}
