import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { RichTextInput } from 'ra-input-rich-text';
import React, { useEffect, useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SaveButton,
  Toolbar,
  useDataProvider,
  useNotify,
  Loading,
  FormDataConsumer,
  ImageField,
  FileInput,
  ImageInput,
  BooleanInput,
} from 'react-admin';
import { useParams } from 'react-router-dom';

const ProductEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const CustomOptionInput = ({
  options,
  optionValues,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleCheckboxChange = (optionId, valueId, isChecked) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: isChecked
        ? {
            ...prev[optionId],
            [valueId]: { quantity: 0, href: '', price: 0 },
          }
        : Object.fromEntries(
            Object.entries(prev[optionId]).filter(([key]) => key !== valueId)
          ),
    }));
  };

  const handleInputChange = (optionId, valueId, field, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: {
        ...prev[optionId],
        [valueId]: {
          ...prev[optionId][valueId],
          [field]: value,
        },
      },
    }));
  };

  return options.map((option) => {
    const choices = optionValues[option.id] || [];
    const selected = selectedOptions[option.id] || {};

    return (
      <div key={option.id}>
        <h4>
          {option.name} {option.id}
        </h4>
        {choices.map((choice) => {
          const selectedChoice = selected[choice.id] || {};
          return (
            <div key={choice.id} style={{ marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={choice.id in selected}
                onChange={(e) =>
                  handleCheckboxChange(option.id, choice.id, e.target.checked)
                }
              />
              <label style={{ marginLeft: '8px' }}>
                {choice.name} {choice.id}
              </label>
              {choice.id in selected && (
                <div style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  <TextInput
                    // source={`options[${option.id}][${choice.id}].href`}
                    source={`options`}
                    label="Ссылка"
                    defaultValue={selectedChoice.href || null}
                    onChange={(e) =>
                      handleInputChange(
                        option.id,
                        choice.id,
                        'href',
                        e.target.value
                      )
                    }
                  />
                  <NumberInput
                    source={`options[${option.id}][${choice.id}].quantity`}
                    label="Количество"
                    defaultValue={selectedChoice.quantity || 0}
                    onChange={(e) =>
                      handleInputChange(
                        option.id,
                        choice.id,
                        'quantity',
                        e.target.value
                      )
                    }
                  />
                  <NumberInput
                    source={`options[${option.id}][${choice.id}].price`}
                    label="Цена"
                    defaultValue={selectedChoice.price || 0}
                    onChange={(e) =>
                      handleInputChange(
                        option.id,
                        choice.id,
                        'price',
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  });
};

const ProductEdit = (props) => {
  const [record, setRecord] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionValues, setOptionValues] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const { id } = useParams();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [expanded, setExpanded] = useState(false);
  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoadingProduct(true);
      try {
        const { data } = await dataProvider.getOne('products', { id });
        setRecord(data);

        const selectedOptionsMap = {};
        data.options.forEach((option) => {
          if (option.values) {
            selectedOptionsMap[option.id] = option.values.reduce((acc, val) => {
              acc[val.value.id] = {
                quantity: val.quantity || 0,
                href: val.href || '',
                price: val.price || 0,
              };
              return acc;
            }, {});
          }
        });
        setSelectedOptions(selectedOptionsMap);
      } catch (error) {
        console.error('Ошибка при получении данных товара:', error);
        notify('Ошибка при получении данных товара');
      } finally {
        setLoadingProduct(false);
      }
    };

    const fetchOptions = async () => {
      setLoadingOptions(true);
      try {
        const { data } = await dataProvider.getList('option', {
          pagination: { page: 1, perPage: 1000 },
        });
        // console.log('Полученные данные опций:', data);

        if (Array.isArray(data)) {
          setOptions(data);

          const fetchedOptionValues = {};
          data.forEach((option) => {
            if (option.values) {
              fetchedOptionValues[option.id] = option.values;
            }
          });
          // console.log('Сформированные значения опций:', fetchedOptionValues);
          setOptionValues(fetchedOptionValues);
        } else {
          console.error('Полученные данные опций не являются массивом');
          notify('Ошибка при получении данных опций');
        }
      } catch (error) {
        console.error('Ошибка при получении опций:', error);
        notify('Ошибка при получении опций');
      } finally {
        setLoadingOptions(false);
      }
    };

    if (id) {
      fetchProduct();
    }
    fetchOptions();
  }, [id, dataProvider, notify]);

  const transformOptionsForSave = (selectedOptions) => {
    return Object.keys(selectedOptions).map((optionId) => {
      const values = Object.keys(selectedOptions[optionId]).map((valueId) => {
        const { quantity, href, price } = selectedOptions[optionId][valueId];
        return {
          value: { id: valueId },
          quantity,
          href: href || null,
          price,
        };
      });
      return { id: optionId, values };
    });
  };

  const handleSave = async (data) => {
    const transformedOptions = transformOptionsForSave(selectedOptions);
    // console.log('Сформированные значения опций:', transformedOptions);

    data.options = transformedOptions;

    try {
      await dataProvider.update('products', { id: data.id, data });
      notify('Товар успешно обновлен');
    } catch (error) {
      console.error('Ошибка при обновлении товара:', error);
      notify('Ошибка при обновлении товара');
    }
  };

  if (loadingProduct || loadingOptions) {
    return <Loading />;
  }

  if (!record) {
    return <p>Данные товара не найдены</p>;
  }

  return (
    <Edit {...props} undoable={false} onSuccess={() => handleSave(record)}>
      <SimpleForm toolbar={<ProductEditToolbar />}>
        <TextInput source="model" label="Модель" />
        <NumberInput source="price" label="Цена" />
        <NumberInput source="quantity" label="Количество" />
        <TextInput source="maincategory" label="Главная категория" />
        {/* <BooleanInput source="status" label="Статус" /> */}

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

        <RichTextInput
          source="description.description"
          defaultValue="description.name"
          label="Описание"
        />
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

        {/* <FormDataConsumer>
          {() => (
            <CustomOptionInput
              options={options}
              optionValues={optionValues}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          )}
        </FormDataConsumer> */}
        <Accordion expanded={expanded} onChange={handleAccordionToggle}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="options-content"
            id="options-header"
          >
            Настройки опций НЕ ТРОГАТЬ ПОКА ЧТО
          </AccordionSummary>
          <AccordionDetails>
            <FormDataConsumer>
              {() => (
                <CustomOptionInput
                  options={options}
                  optionValues={optionValues}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
              )}
            </FormDataConsumer>
          </AccordionDetails>
        </Accordion>
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
