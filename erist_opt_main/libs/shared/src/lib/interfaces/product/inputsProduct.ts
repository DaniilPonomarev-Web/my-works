/* Входные данные для создания изображения товара */
export interface IInputCreateProductImage {
  imageNameMinio: string;
  sortOrder: number;
}

/* Входные данные для создания описания товара */
export interface IInputCreateProductDescription {
  name: string;
  description: string;
  tag: string;
  meta_title: string;
  meta_h1: string;
  meta_description: string;
}

/* Входные данные для создания товара */
export interface IInputCreateProduct {
  model: string;
  price: number;
  quantity: number;
  maincategory: string;
  categories: string[];
  status: boolean;
  sortOrder: number;
  description: IInputCreateProductDescription;
  images: IInputCreateProductImage[];
}

/* Входные данные для создания товара в 1с */
export interface IInputCreateProductOneC {
  id1c: string;
  model: string;
  price: number;
  quantity: number;
  maincategory: string;
  categories: string[];
  status: boolean;
  sortOrder: number;
  description: ICreateProductDescriptionOneC;
  optionValues: ICreateProductOptionValueOneC[];
  images: IInputCreateProductImage[];
}

export interface ICreateProductOptionValueOneC {
  optionId: string;
  valueId: string;
  price: number;
  quantity: number;
  href: string | null;
}

export interface ICreateProductDescriptionOneC {
  name: string;
  description: string;
  compound: string | null;
  model_parameters: string;
  care: string;
  parameters: string;
}

export interface IUpdateProductOneC {
  id: string;
  id1c: string;
  model: string;
  price: number;
  quantity: number;
  maincategory: string;
  categories: string[];
  status: boolean;
  sortOrder: number;
  description: ICreateProductDescriptionOneC;
  optionValues: ICreateProductOptionValueOneC[];
}
