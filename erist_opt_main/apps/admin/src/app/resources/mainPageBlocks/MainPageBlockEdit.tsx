import {
  BooleanInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  useDataProvider,
  useNotify,
  useRefresh,
  SaveButton,
  Toolbar,
} from 'react-admin';
import ProductSelectInput from './ProductSelectInput';

const MainPageBlockEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const MainPageBlockEdit = (props) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  // const handleSave = async (data) => {
  //   console.debug('fdfsfdsfdsf');

  //   try {
  //     await dataProvider.update('mainPageBlocks', {
  //       id: data.id,
  //       data,
  //     });
  //     notify('Блок успешно обновлен');
  //     refresh();
  //   } catch (error) {
  //     notify('Ошибка обновления блока', 'warning');
  //   }
  // };

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<MainPageBlockEditToolbar />}>
        <TextInput source="name" label="Название" />
        <TextInput source="title" label="Заголовок" />
        <TextInput source="link" label="Ссылка" />
        <NumberInput source="sort" label="Порядок сортировки" />
        <BooleanInput label="Статус" source="status" />

        {/* ArrayInput for products */}
        <ArrayInput source="products" label="Товары">
          <SimpleFormIterator>
            <ProductSelectInput label="Выберите товар" source="id" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default MainPageBlockEdit;
