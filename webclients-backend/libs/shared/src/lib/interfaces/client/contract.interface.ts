import { IContactClient } from './contact.interface';
import { IGenderClient } from './gender.interface';

/**
 * Интерфейс для данных договора клиента.
 */
export interface IContractClient {
  /**
   * Идентификатор договора.
   */
  id: number;

  /**
   * Номер договора.
   */
  number: string;

  /**
   * Дата заключения договора.
   */
  signedAt: string;

  /**
   * Формат имени (Фамилия Имя Отчество).
   */
  nameStr: string;

  /**
   * Пол клиента.
   */
  gender: IGenderClient;

  /**
   * Дата рождения клиента.
   */
  birthDate: string;

  /**
   * ИНН клиента.
   */
  inn: string;

  /**
   * Контактное лицо клиента.
   */
  contact: IContactClient;
}
