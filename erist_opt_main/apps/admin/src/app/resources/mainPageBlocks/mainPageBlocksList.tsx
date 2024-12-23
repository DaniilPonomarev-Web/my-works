import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  BooleanField,
} from 'react-admin';

const MainPageBlocksList = (props) => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Заголовок" />
      <TextField source="title" label="Контент" />
      <BooleanField source="status" label="Статус" />
      <TextField source="sort" label="Сортировка" />
      <DeleteButton
        undoable={false}
        label="Удалить"
        className="px-4 py-2 border-b border-gray-200 text-red-500 hover:bg-red-100"
      />
    </Datagrid>
  </List>
);

export default MainPageBlocksList;
