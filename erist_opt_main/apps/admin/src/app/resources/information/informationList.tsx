import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  RichTextField,
} from 'react-admin';
import TruncatedRichTextField from './TruncatedRichTextField';

const InformationList = (props) => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="title" label="Заголовок" />
      {/* <TruncatedRichTextField
        source="content"
        label="Содержание"
        length={100}
      /> */}
      <BooleanField source="status" label="Статус" />
    </Datagrid>
  </List>
);

export default InformationList;
