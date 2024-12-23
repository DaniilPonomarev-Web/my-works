import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

const SocialHrefList = (props) => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="href" label="Ссылка" />
      <TextField source="sortOrder" label="Порядок сортировки" />
    </Datagrid>
  </List>
);

export default SocialHrefList;
