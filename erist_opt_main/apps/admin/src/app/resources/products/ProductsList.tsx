import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  ImageField,
  BooleanField,
} from 'react-admin';
import ProductsFilter from './productsFilter';
import { DateField } from 'ra-ui-materialui';

const ProductsList = (props) => (
  <List {...props} filters={<ProductsFilter />}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" sortable={false} />
      <TextField source="description.name" label="Название" />
      <TextField source="price" label="Цена" />
      <TextField source="quantity" label="Количество" />
      <TextField source="sortOrder" label="Порядок сортировки" />
      <BooleanField source="status" label="Статус" />
      <ImageField
        source="images[0].image"
        label="Изображение"
        sortable={false}
      />
      {/* <TextField source="dateAdded" label="Дата создания" /> */}
      <DateField
        source="dateAdded"
        label="Дата создания"
        showTime
        options={{
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }}
      />

      <DeleteButton
        undoable={false}
        label="Удалить"
        className="px-4 py-2 border-b border-gray-200 text-red-500 hover:bg-red-100 rounded-md"
      />
    </Datagrid>
  </List>
);

export default ProductsList;
