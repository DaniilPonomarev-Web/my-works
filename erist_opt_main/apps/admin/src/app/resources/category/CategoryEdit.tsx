import { useState, useEffect } from 'react';
import {
  useNotify,
  useRedirect,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  useUpdate,
  useGetOne,
  SaveButton,
  Toolbar,
  TextField,
  FormDataConsumer,
  required,
  NumberInput,
} from 'react-admin';
import { useParams } from 'react-router-dom';

const CategoryEdit = (props) => {
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const notify = useNotify();
  const redirect = useRedirect();
  const [update] = useUpdate();

  const { data: record, isLoading } = useGetOne('category', { id });

  useEffect(() => {
    if (record && record.categories) {
      setCategories(record.categories);
    }
  }, [record]);

  const handleSave = async (data) => {
    try {
      await update(
        'category',
        { id: data.id, data: { ...data, categories } },
        {
          onSuccess: () => {
            notify('Категория успешно обновлена');
            redirect('/category');
          },
          onError: (error) => {
            console.error('Ошибка при обновлении категории:', error);
            notify('Ошибка при обновлении категории', { type: 'warning' });
          },
        }
      );
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
    }
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const CustomToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton label="Сохранить" onClick={() => handleSave(props.record)} />
    </Toolbar>
  );

  return (
    <Edit {...props} record={record} mutationMode="pessimistic">
      <SimpleForm
        toolbar={<CustomToolbar />}
        onSubmit={handleSave}
        redirect="list"
      >
        <TextField source="id" label="ID" />
        <TextInput source="descriptions[0].id" label="id описания" />
        <TextInput
          source="descriptions[0].name"
          label="Название"
          validate={required()}
        />
        <TextInput
          source="descriptions[0].description"
          label="Описание"
          multiline
        />
        <TextInput source="descriptions[0].meta_title" label="Мета тайтл" />
        <TextInput source="descriptions[0].meta_h1" label="Мета заголовок" />
        <TextInput
          source="descriptions[0].meta_description"
          label="Мета описание"
        />
        <TextInput
          source="descriptions[0].meta_keyword"
          label="Мета ключевые слова"
        />
        <NumberInput source="sort_order" label="Порядок сортировки" />
        <BooleanInput source="status" label="Статус" />
        <TextInput source="image" label="Ссылка на изображение" />
        Пример: https://static.erist.store/images/'НАЗВАНИЕ ИЗОБРАЖЕНИЯ'
        <BooleanInput source="onHomePage" label="На главную в плитку" />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.parent_id ? (
              <TextField
                source="parent_id"
                label="ID Родительской Категории"
                {...rest}
              />
            ) : null
          }
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};

export default CategoryEdit;
