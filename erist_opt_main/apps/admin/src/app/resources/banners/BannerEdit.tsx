import React from 'react';
import {
  BooleanInput,
  Create,
  Edit,
  FileInput,
  ImageField,
  ImageInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

const BannerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Название" />
      <TextInput source="title" label="Заголовок" />
      <TextInput source="link" label="Ссылка" />

      <TextField
        source="image"
        title="Название пк изображения"
        label="Название пк изображения"
      />
      <ImageField source="image_href" title="title" label="Изображение пк" />
      <TextField
        source="image_mob"
        title="title"
        label="Название мобильного изображения"
      />
      <ImageField
        source="image_mob_href"
        title="title"
        label="Изображение мобильное"
      />

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
  </Edit>
);

export default BannerEdit;
