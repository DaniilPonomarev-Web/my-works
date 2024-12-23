import { IOption, IOptionValue } from '../options';
export interface IProductOptionValue {
  id: string;
  price: number;
  quantity: number;
  href: string;
  option: IOption;
  value: IOptionValue;
}
export interface IProducts {
  data: IProduct[];
  total: number;
}

// export interface IProductForCard {
//   id: string;
//   model: string;
//   price: number;
//   quantity: number;
//   maincategory: string;
//   categories: string[];
//   sortOrder: number;
//   description: IProductDescription;
//   images: IProductImage[];
//   status: boolean;
//   optionName: string;
// }

export interface IProduct {
  id: string;
  model: string;
  price: number;
  quantity: number;
  maincategory: string;
  hrefCloudPhotos: string;
  categories: string[];
  sortOrder: number;
  description: IProductDescription;
  images: IProductImage[];
  optionValues: IProductOptionValue[];
  status: boolean;
  dateAdded: Date;
  id1c: string;
  productsRelated: IProductRelated[];
  otherColorsProducts: IOtherColorProduct[];
}

export interface IProductDescription {
  id: string;
  name: string;
  description: string;
  tag: string;
  meta_title: string;
  meta_h1: string;
  meta_description: string;
  compound: string;
  model_parameters: string;
  care: string;
  parameters: string;
}

export interface IProductImage {
  id: string;
  productId: string;
  imageNameMinio: string;
  blurDataURL: string | null;
  image: string;
  sortOrder: number;
}

export interface IProductOption {
  id: string;
  name: string;
  type: string;
  values: IProductOptionValue[];
}

export interface ITransformedProduct {
  id: string;
  id1c: string;
  model: string;
  price: number;
  quantity: number;
  maincategory: string;
  hrefCloudPhotos: string;
  categories: string[];
  status: boolean;
  sortOrder: number;
  description: IProductDescription;
  images: IProductImage[];
  options: IProductOption[];
  productsRelated: ITransformedProduct[];
  otherColorsProducts: ITransformedProduct[];
  dateAdded: Date;
}

export interface ITransformedProducts {
  data: ITransformedProduct[];
  total: number;
}

export interface IUpdateProductQuantities {
  productId: string;
  newQuantity: number;
  optionValues: {
    valueId: string;
    newQuantity: number;
  };
}

export interface IProductRelated {
  id: string; // Уникальный идентификатор записи
  relatedProductId: string; // ID связанного товара
  product: IProduct; // Связанный товар (основной)
}

export interface IProductsRelated {
  products: IProductRelated[];
}

export interface IOtherColorProduct {
  id: string; // Уникальный идентификатор записи
  otherColorProductId: string; // ID  товара с другим цветом
  product: IProduct; // Связанный товар (основной)
}

export interface IOtherColorProducts {
  products: IOtherColorProduct[];
}
