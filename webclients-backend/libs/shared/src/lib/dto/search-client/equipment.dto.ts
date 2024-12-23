import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IEquipmentClientSearch } from '../../interfaces';

/**
 * `EquipmentClientSearchDTO` - объектный тип для представления оборудования клиента.
 */
@ObjectType({
  description: 'Объектный тип для представления оборудования клиента.',
})
export class EquipmentClientSearchDTO implements IEquipmentClientSearch {
  @Field(() => Int, { description: 'Идентификатор оборудования' })
  id: number;

  @Field(() => String, { description: 'Тип оборудования (например, GSM)' })
  type: string;

  @Field(() => String, { description: 'ICC ID сим-карты' })
  iccId: string;

  @Field(() => String, { description: 'IMSI оборудования' })
  imsi: string;

  @Field(() => String, {
    description: 'Состояние оборудования (например, Активирована)',
  })
  state: string;

  constructor(
    id: number,
    type: string,
    icc: string,
    imsi: string,
    state: string
  ) {
    this.id = id;
    this.type = type;
    this.iccId = icc;
    this.imsi = imsi;
    this.state = state;
  }
}
