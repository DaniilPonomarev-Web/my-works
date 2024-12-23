import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ProductDescription } from './product_description.entity';
import { ProductImage } from './product_image.entity';
import { IProduct } from '../../interfaces';
import { ProductOptionValue } from './product_option_value.entity';
import { ProductsRelated } from './products_related.entity';
import { OtherColorProducts } from './products_other_color.entity';

@Entity({ name: 'product' })
@Index(['id'])
@Index(['sortOrder'])
@Index(['status'])
export class Product extends BaseEntity implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, nullable: true })
  model: string;

  @Column('decimal', { default: null, nullable: true })
  price: number;

  @Column('int', { default: 0, nullable: false })
  quantity: number;

  @Column()
  maincategory: string;

  @Column('simple-array')
  categories: string[];

  @Column('int', { default: 0, nullable: true })
  sortOrder: number;

  @OneToOne(() => ProductDescription)
  @JoinColumn()
  description: ProductDescription;

  @OneToMany(() => ProductImage, (image) => image.product)
  @JoinColumn()
  images: ProductImage[];

  @Column({
    comment: 'Ссылка на фотографии gdrive',
    default: null,
    nullable: true,
  })
  hrefCloudPhotos: string;

  @OneToMany(() => ProductOptionValue, (optionValue) => optionValue.product, {
    cascade: true,
  })
  @JoinColumn()
  optionValues: ProductOptionValue[];

  @Column({
    comment: 'дата создания',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateAdded: Date;

  @Column({
    comment: 'ID в 1С',
    nullable: true,
    default: null,
  })
  id1c: string;

  @OneToMany(() => ProductsRelated, (related) => related.product, {
    cascade: true,
    nullable: true,
  })
  productsRelated: ProductsRelated[];

  @OneToMany(
    () => OtherColorProducts,
    (otherColorProduct) => otherColorProduct.product,
    {
      cascade: true,
      nullable: true,
    }
  )
  otherColorsProducts: OtherColorProducts[];

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamptz', comment: 'Дата создания товара' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamptz', comment: 'Дата обновления товара' })
  updated: Date;

  constructor(
    id: string,
    model: string,
    price: number,
    quantity: number,
    maincategory: string,
    hrefCloudPhotos: string,
    categories: string[],
    status: boolean,
    sortOrder: number,
    description: ProductDescription,
    images: ProductImage[],
    optionValues: ProductOptionValue[],
    dateAdded: Date,
    id1c: string,
    productsRelated: ProductsRelated[],
    otherColorsProducts: OtherColorProducts[]
  ) {
    super();
    this.id = id;
    this.model = model;
    this.price = price;
    this.quantity = quantity;
    this.maincategory = maincategory;
    this.hrefCloudPhotos = hrefCloudPhotos;
    this.categories = categories;
    this.status = status;
    this.sortOrder = sortOrder;
    this.description = description;
    this.images = images;
    this.optionValues = optionValues;
    this.dateAdded = dateAdded;
    this.id1c = id1c;
    this.productsRelated = productsRelated;
    this.otherColorsProducts = otherColorsProducts;
  }
}
