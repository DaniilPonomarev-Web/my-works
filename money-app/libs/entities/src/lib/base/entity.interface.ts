import { INode } from './node.interface';
import { Maybe } from '@money-app/shared';

export interface IBaseEntityNoConfirm extends INode {
  /**
   * Дата создания
   */
  created?: Date;
  /**
   * Дата последнего обновления
   */
  updated?: Date;

  /**
   * Дата удаления
   */
  deleted?: Maybe<Date>;
}

export interface IBaseEntity extends IBaseEntityNoConfirm {
  /**
   * Дата запроса на удаление
   */
  deleteRequest?: Maybe<Date>;
}
