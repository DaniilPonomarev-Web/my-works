import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EquipmentClientSearchDTO } from './equipment.dto';
import { ISubscriberClientSearch } from '../../interfaces';
/**
 * `SubscriberClientSearchDTO` - объектный тип для представления абонента клиента.
 */
@ObjectType({
  description: 'Объектный тип для представления абонента клиента.',
})
export class SubscriberClientSearchDTO implements ISubscriberClientSearch {
  @Field(() => Int, { description: 'Идентификатор абонента' })
  id: number;

  @Field(() => String, { description: 'Номер телефона абонента (MSISDN)' })
  msisdn: string;

  @Field(() => String, { description: 'Регион абонента' })
  region: string;

  @Field(() => String, {
    description: 'Состояние абонента (например, Активен или Блокирован)',
  })
  state: string;

  @Field(() => String, {
    nullable: true,
    description: 'Дополнительный номер телефона абонента',
  })
  additionalPhoneNumber?: string;

  @Field(() => EquipmentClientSearchDTO, {
    description: 'Оборудование абонента',
  })
  equipment: EquipmentClientSearchDTO;

  constructor(
    id: number,
    msisdn: string,
    region: string,
    state: string,
    equipment: EquipmentClientSearchDTO,
    additionalPhoneNumber?: string
  ) {
    this.id = id;
    this.msisdn = msisdn;
    this.region = region;
    this.state = state;
    this.equipment = equipment;
    this.additionalPhoneNumber = additionalPhoneNumber;
  }
}
