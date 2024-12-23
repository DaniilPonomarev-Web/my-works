import React, { useEffect, useState } from 'react';
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  useDataProvider,
} from 'react-admin';

const CategorySelectInput = (props) => {
  const [categories, setCategories] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    dataProvider.getAll('category', {}).then(({ data }) => setCategories(data));
  }, [dataProvider]);

  return (
    <AutocompleteInput
      {...props}
      choices={categories.map((category) => ({
        id: category.id,
        name: category.descriptions[0].name,
      }))}
      optionText="name"
      optionValue="id"
    />
  );
};

export default CategorySelectInput;
