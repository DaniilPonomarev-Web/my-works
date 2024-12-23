import { IBaseEntity } from '../base/entity.interface';

export interface ICheck extends IBaseEntity {
  chatId: number;
  qrText: string;
  imageUrl?: string;
  uuidCheckData?: string | null;
}
