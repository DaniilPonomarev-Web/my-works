import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Product } from './product.entity';
import { IProductImage } from '../../interfaces';

@Entity({ name: 'product_image' })
export class ProductImage extends BaseEntity implements IProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column({
    nullable: false,
    comment: 'Название изображения в minio',
    default: 'no_image_product.webp',
  })
  imageNameMinio: string;

  @Column({ nullable: true, comment: 'Ссылка на изображение в minio' })
  image: string;

  @Column({ nullable: true, comment: 'blurDataURL изображения' })
  blurDataURL: string;

  @Column('int')
  sortOrder: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  productIdOneC: string;

  constructor(
    id: string,
    productId: string,
    imageNameMinio: string,
    image: string,
    sortOrder: number,
    product: Product,
    productIdOneC: string
  ) {
    super();
    this.id = id;
    this.productId = productId;
    this.imageNameMinio = imageNameMinio;
    this.image = image;
    this.sortOrder = sortOrder;
    this.product = product;
    this.productIdOneC = productIdOneC;
  }
}
