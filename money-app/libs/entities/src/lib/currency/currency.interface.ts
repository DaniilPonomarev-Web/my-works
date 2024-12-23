import { IBaseEntity } from '../base/entity.interface';

export interface ICurrency extends IBaseEntity {
  id: string;
  name: string;
  symbol: string;
}
