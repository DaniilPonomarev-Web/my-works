import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  // DeleteButton,
  // ImageField,
  BooleanField,
  FunctionField,
} from 'react-admin';
import CategoryFilter from './categoryFilter';

// const ChildrenCategoriesField = ({ record }) => {
//   if (!record || !record.children) return null;

//   // Получаем имена всех дочерних категорий
//   const childrenNames = record.children
//     .map((child) => child.descriptions[0]?.name)
//     .join(', ');

//   return <span>{childrenNames}</span>;
// };
const CategoryStatusField = ({ record }) => {
  if (!record) return null;
  return record.parent_id ? 'Дочерняя категория' : 'Главная категория';
};

const CategoryList = (props) => (
  <List {...props} filters={<CategoryFilter />}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" sortable={false} />
      <TextField source="descriptions[0].name" label="Название" />
      <FunctionField
        label="Тип категории"
        render={(record) => <CategoryStatusField record={record} />}
      />
      <TextField source="sort_order" label="Порядок сортировки" />

      <BooleanField source="status" label="Статус" />
      <BooleanField source="onHomePage" label="На главной странице" />
    </Datagrid>
  </List>
);

export default CategoryList;
{
  /* <FunctionField
        label="Дочерние категории"
        render={(record) => <ChildrenCategoriesField record={record} />}
      /> */
}
