import { IProductOptionValue } from '../product';

export interface IOption {
  id: string;
  name: string;
  type: string;
  sortOrder: number;
  values: IOptionValue[];
}

export interface IOptionValue {
  id: string;
  name: string;
  sortOrder: number;
  colorCode: string | null;
  option: IOption;
  productOptionValues: IProductOptionValue[];
}

export interface ICreateOptionOneC {
  name: string;
  type: string;
  sortOrder: number;
  id1c: string;
  // values: ICreateOptionValueOneC[];
}

export interface ICreateOptionValueOneC {
  optionId: string;
  name: string;
  sortOrder: number;
  colorCode: string | null;
  id1c: string;
}

export interface IUpdateOptionOneC {
  id1c: string;
  name: string;
  type: string;
  sortOrder: number;
}

export interface IUpdateOptionValueOneC {
  id1c: string;
  name: string;
  sortOrder: number;
}
