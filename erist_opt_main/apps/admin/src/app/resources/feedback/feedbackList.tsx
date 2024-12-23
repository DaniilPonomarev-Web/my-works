import React from 'react';
import { List, Datagrid, TextField, BooleanField } from 'react-admin';
import FeedbackFilter from './feedbackFilter';

const FeedbackList = (props) => (
  <List {...props} filters={<FeedbackFilter />}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="text" label="Текст" />
      <BooleanField source="status" label="Статус" />

      <TextField source="user.id" label="ID пользователя" />
      <TextField source="user.company.inn" label="ИНН пользователя" />
      <TextField
        source="user.company.name"
        label="Название компании пользователя"
      />
    </Datagrid>
  </List>
);

export default FeedbackList;
