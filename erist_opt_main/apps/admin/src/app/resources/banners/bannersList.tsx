import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  ImageField,
  BooleanField,
} from 'react-admin';

const BannersList = (props) => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
      <TextField source="title" label="Заголовок" />
      <BooleanField source="status" label="Статус" />
      <TextField source="link" label="Ссылка" sortable={false} />
      <ImageField source="image_href" label="Изображение ПК" sortable={false} />
      <ImageField
        source="image_mob_href"
        label="Изображение МОБ"
        sortable={false}
      />
      <DeleteButton undoable={false} label="Удалить" />
    </Datagrid>
  </List>
);

export default BannersList;
