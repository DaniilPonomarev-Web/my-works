import React from 'react';
import {
  ArrayInput,
  BooleanInput,
  Filter,
  NumberInput,
  SimpleFormIterator,
  TextInput,
} from 'react-admin';
import ProductSelectInput from '../mainPageBlocks/ProductSelectInput';
import CategorySelectInput from './CategoriesSelectInput';

const ProductsFilter = (props) => (
  <Filter {...props}>
    <NumberInput label="Цена от" source="priceFrom" />
    <NumberInput label="Цена до" source="priceTo" />
    <TextInput label="Название" source="name" />
    <TextInput label="Цвет" source="colors" />
    <TextInput label="Размер" source="sizes" />
    <BooleanInput label="Статус" source="status" defaultValue={true} />
    <CategorySelectInput label="Категория" source="categoryId" />
  </Filter>
);

export default ProductsFilter;
