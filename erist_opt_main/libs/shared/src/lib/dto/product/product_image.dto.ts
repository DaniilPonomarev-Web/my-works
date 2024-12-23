import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IProductImage } from '../../interfaces';

@ObjectType({ description: 'Изображение продукта' })
export class ProductImageDTO implements IProductImage {
  @Field(() => ID, { description: 'ID изображения' })
  id: string;

  @Field(() => ID, { description: 'ID продукта' })
  productId: string;

  @Field({ description: 'Название изображения в minio' })
  imageNameMinio: string;

  @Field({ description: 'URL изображения в minio', nullable: true })
  image: string;

  @Field({ description: 'BASE64 изображения', nullable: true })
  blurDataURL: string | null;

  @Field({ description: 'Порядок сортировки' })
  sortOrder: number;

  constructor(
    id: string,
    productId: string,
    imageNameMinio: string,
    image: string,
    sortOrder: number
  ) {
    this.id = id;
    this.productId = productId;
    this.imageNameMinio = imageNameMinio;
    this.image = image;
    this.sortOrder = sortOrder;
  }
}
