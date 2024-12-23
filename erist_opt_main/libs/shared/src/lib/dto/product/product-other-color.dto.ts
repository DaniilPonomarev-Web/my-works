import { ObjectType, Field } from '@nestjs/graphql';
import { IOtherColorProduct, IProductRelated } from '../../interfaces';
import { ProductDTO } from './product.dto';

@ObjectType({ description: 'Товары с другими цветами' })
export class OtherColorProductDTO implements IOtherColorProduct {
  @Field(() => String, {
    description: 'Уникальный идентификатор записи',
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    description: 'ID связанного товара',
    nullable: true,
  })
  otherColorProductId: string;

  @Field(() => ProductDTO, {
    description: 'Связанный товар (основной)',
    nullable: false,
  })
  product: ProductDTO;
}
