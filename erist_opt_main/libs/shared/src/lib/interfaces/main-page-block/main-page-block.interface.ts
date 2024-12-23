import { IProduct } from '../product';

export interface IMainPageBlock {
  id: string;
  name: string;
  title: string;
  link: string;
  sort: number;
  status: boolean;
  products: IProduct[];
}

export interface IMainPageBlockList {
  blocks: IMainPageBlock[];
  total: number;
}
