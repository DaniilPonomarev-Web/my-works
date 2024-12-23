import { RichTextInput } from 'ra-input-rich-text';
import React, { useEffect, useState } from 'react';
import {
  Edit,
  SimpleForm,
  NumberInput,
  SaveButton,
  Toolbar,
  FileInput,
  ImageField,
  TextField,
  useDataProvider,
  ImageInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  required,
  BooleanInput,
} from 'react-admin';
import { useParams } from 'react-router-dom';
import ProductSelectInput from './ProductSelectInput';

const ProductEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const ProductEdit = (props) => {
  const [record, setRecord] = useState(null);
  const [optionsList, setOptionsList] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [currentOptionValues, setCurrentOptionValues] = useState([]);
  const dataProvider = useDataProvider();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await dataProvider.getOne('products', { id });

        setRecord(data);
        if (data.options && data.options.length > 0) {
          setSelectedOptionId(data.options[0].id);
        }
      } catch (error) {
        console.error('Ошибка при получении данных товара:', error);
      }
    };

    const fetchOptions = async () => {
      try {
        const { data } = await dataProvider.getList('option', {
          pagination: { page: 1, perPage: 1000 },
        });
        setOptionsList(data);
      } catch (error) {
        console.error('Ошибка при получении данных опций:', error);
      }
    };

    if (id) {
      fetchProduct();
      fetchOptions();
    }
  }, [id, dataProvider]);

  useEffect(() => {
    if (selectedOptionId) {
      const option = optionsList.find((opt) => opt.name === 'Цвет');
      setCurrentOptionValues(option ? option.values : []);
    }
  }, [selectedOptionId, optionsList]);

  if (!record || optionsList.length === 0) {
    return <p>Загрузка...</p>;
  }

  // Преобразуем optionsList в удобный формат для SelectInput
  const formattedOptionsList = optionsList.map((option) => ({
    id: option.id,
    name: option.name,
    values: option.values
      ? option.values.map((value) => ({
          id: value.id,
          name: value.name,
        }))
      : [],
  }));

  return (
    <Edit {...props} record={record}>
      <SimpleForm toolbar={<ProductEditToolbar />}>
        <TextField source="description.name" label="Название" />
        <TextField source="maincategory" label="Главная категория товара" />
        <TextInput source="hrefCloudPhotos" label="Ссылка на архив фото" />
        <ImageInput
          source="images"
          label="Существующие изображения"
          multiple
          sx={{
            '& .RaFileInput-dropZone': {
              display: 'none',
            },
          }}
        >
          <ImageField source="image" title="title" />
        </ImageInput>

        <FileInput
          source="attachments"
          label="Добавить новые изображения"
          multiple
        >
          <ImageField source="src" title="title" />
        </FileInput>

        <RichTextInput source="description.description" label="Описание" />
        <RichTextInput source="description.compound" label="Состав" />
        <RichTextInput
          source="description.model_parameters"
          label="Параметры модели"
        />
        <RichTextInput source="description.care" label="Уход" />
        <RichTextInput
          source="description.parameters"
          label="Параметры изделия"
        />
        <NumberInput source="sortOrder" label="Порядок сортировки" />
        <BooleanInput source="status" label="Статус (АВТО)" />
        {/* <TextField source="status" label="Статус" /> */}

        {/* ArrayInput for products */}
        <ArrayInput
          source="productsRelated"
          label="Связанные товары (Рекомендуемые) АВТОМАТИЧЕСКАЯ СВЯЗКА!!!!"
        >
          <SimpleFormIterator>
            <ProductSelectInput label="Выберите товар" source="id" />
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput
          source="otherColorsProducts"
          label="ТОВАРЫ С ДРУГИМ ЦВЕТОМ АВТОМАТИЧЕСКАЯ СВЯЗКА!!!!"
        >
          <SimpleFormIterator>
            <ProductSelectInput
              label="Выберите товар с другим цветом"
              source="id"
            />
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput source="options" label="Опции">
          <SimpleFormIterator>
            <SelectInput
              source="id"
              choices={formattedOptionsList}
              optionText="name"
              optionValue="id"
              label="Опция"
              validate={required()}
              onChange={(event) => setSelectedOptionId(event.target.value)}
            />
            <ArrayInput
              source="values"
              label="Значения (у размеров не отображается)"
            >
              <SimpleFormIterator>
                <SelectInput
                  source="value.id"
                  choices={currentOptionValues}
                  optionText="name"
                  optionValue="id"
                  label="Значение"
                  validate={required()}
                />
                <NumberInput source="price" label="Цена" />
                <NumberInput source="quantity" label="Количество" />
                <TextInput
                  source="href"
                  defaultValue={'/product/'}
                  label="Ссылка (/product/id)"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
