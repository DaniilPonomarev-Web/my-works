import { IBaseEntity } from '../base/entity.interface';
import { ICategory } from '../category/category.interface';

export interface IGroup extends IBaseEntity {
  /**
   * Наименование
   */
  name: string;

  /**
   * ID аккаунта
   */
  accountId: string;

  /**
   * Статус
   */
  status: boolean;
}

export interface IGroupWithCategory {
  id: string;
  name: string;
  clientId: string;
  status: boolean;
  categories: ICategory[];
}
