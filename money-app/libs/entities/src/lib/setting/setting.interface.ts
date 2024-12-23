import { IBaseEntity } from '../base/entity.interface';

export interface ISetting extends IBaseEntity {
  key: string;
  value: any;
}
