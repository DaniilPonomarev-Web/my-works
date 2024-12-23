import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  ImageField,
  BooleanField,
  FunctionField,
} from 'react-admin';

// Кастомное поле для отображения имен дочерних категорий
const ChildrenCategoriesField = ({ record }) => {
  if (!record || !record.children) return null;

  // Получаем имена всех дочерних категорий
  const childrenNames = record.children
    .map((child) => child.descriptions[0]?.name)
    .join(', ');

  return <span>{childrenNames}</span>;
};

const CategoryList = (props) => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" sortable={false} />
      <TextField source="descriptions[0].name" label="Название" />
      <TextField source="price" label="Цена" />
      <TextField source="quantity" label="Количество" />
      <TextField source="sort_order" label="Порядок сортировки" />
      <BooleanField source="status" label="Статус" />
      <FunctionField
        label="Дочерние категории"
        render={(record) => <ChildrenCategoriesField record={record} />}
      />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default CategoryList;
