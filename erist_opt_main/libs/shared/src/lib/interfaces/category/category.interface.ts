export interface ICategory {
  id: string;
  image: string | null;
  parent_id: string | null;
  sort_order: number;
  status: boolean;
  onHomePage: boolean;
  descriptions: ICategoryDescription[];
  children: ICategory[];
}

export interface ICategoryDescription {
  id: string;
  name: string;
  description: string | null;
  meta_title: string | null;
  meta_h1: string | null;
  meta_description: string | null;
  meta_keyword: string | null;
}

export interface ICreateCategoryWithDescription {
  image: string;
  parent_id: string;
  sort_order: number;
  status: boolean;
  descriptions: ICategoryDescriptionInput[];
}

export interface ICreateCategoryOneC {
  parent_id: string | null;
  sort_order: number;
  status: boolean;
  id1c: string;
  descriptions: ICategoryDescriptionInputOneC[];
}

export interface ICategoryDescriptionInputOneC {
  catIdOneC: string;
  name: string;
  description: string;
}

export interface IUpdateCategoryOneC {
  parent_id: string | null;
  sort_order: number;
  id1c: string;
  status: boolean;
  descriptions: ICategoryDescriptioUpdate[];
}

export interface ICategoryDescriptionInput {
  name: string;
  description: string;
  meta_title: string;
  meta_h1: string;
  meta_description: string;
  meta_keyword: string;
}

export interface ICategoryDescriptioUpdate {
  catIdOneC: string;
  name: string;
  description: string;
}

export interface IUpdateCategory {
  id: string;
  image: string;
  parent_id: string;
  sort_order: number;
  status: boolean;
  descriptions: IUpdateCategoryDescription[];
}
export interface IUpdateCategoryDescription {
  id: string;
  name: string;
  description: string;
  meta_title: string;
  meta_h1: string;
  meta_description: string;
  meta_keyword: string;
}
