import { ObjectType, Field } from '@nestjs/graphql';
import { IProductRelated } from '../../interfaces';
import { ProductDTO } from './product.dto';

@ObjectType({ description: 'Связанные товары' })
export class ProductRelatedDTO implements IProductRelated {
  @Field(() => String, {
    description: 'Уникальный идентификатор записи',
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    description: 'ID связанного товара',
    nullable: true,
  })
  relatedProductId: string;

  @Field(() => ProductDTO, {
    description: 'Связанный товар (основной)',
    nullable: false,
  })
  product: ProductDTO;
}
