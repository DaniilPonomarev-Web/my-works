import { ICategory } from '../category';
import { ITransformedProduct } from '../product';

export interface IProductsAndCategories {
  products: ITransformedProduct[];
  categories: ICategory[];
}
