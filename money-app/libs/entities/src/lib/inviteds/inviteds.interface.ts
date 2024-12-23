import { IBaseEntity } from '../base/entity.interface';

export interface IInviteds extends IBaseEntity {
  /**
  ID аккаунта
  */
  accountId: string;

  /**
  Id группы 
  */
  groupId: string;

  /**
  Номер телефона пользователя
  */
  phone: string;

  /**
   * email я отправки приглашения
   */
  email: string;

  /**
  Дата до которой действует инвайт
  */
  validity: Date;

  /**
  Выл ли использован
  */
  used: boolean;

  /**
   * Хеш данных приглашения
   */
  hash: string;
}
