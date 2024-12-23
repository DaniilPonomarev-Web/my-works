import React from 'react';
import {
  BooleanInput,
  Create,
  FileInput,
  ImageField,
  SimpleForm,
  TextInput,
} from 'react-admin';

const BannerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="title" label="Заголовок" />
      <TextInput source="link" label="Ссылка" />

      <FileInput source="attachment_desc" label="Изображение ПК">
        <ImageField source="src" title="title" />
      </FileInput>
      <FileInput source="attachment_mob" label="Изображение мобильное">
        <ImageField source="src" title="title" />
      </FileInput>
      <BooleanInput
        label="Статус (если true, то выключится включенный на данный момент баннер)"
        source="status"
      />
    </SimpleForm>
  </Create>
);

export default BannerCreate;
