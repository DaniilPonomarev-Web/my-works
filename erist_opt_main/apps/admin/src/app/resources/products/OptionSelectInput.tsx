import React, { useEffect, useState } from 'react';
import {
  AutocompleteArrayInput,
  SelectInput,
  useDataProvider,
} from 'react-admin';

const OptionSelect = ({ optionType, source, ...props }) => {
  const [choices, setChoices] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await dataProvider.getList('option', {
          pagination: { page: 1, perPage: 1000 },
        });
        console.log(data);

        const option = data.find((opt) => opt.name === optionType);
        if (option) {
          setChoices(option.values);
        }
      } catch (error) {
        console.error('Ошибка при получении данных опций:', error);
      }
    };

    fetchOptions();
  }, [dataProvider, optionType]);

  return (
    <AutocompleteArrayInput
      {...props}
      choices={choices.map((choice) => ({
        id: choice.id,
        name: choice.name,
      }))}
      optionText="name"
      optionValue="id"
      fullWidth
    />
  );
};

export default OptionSelect;
