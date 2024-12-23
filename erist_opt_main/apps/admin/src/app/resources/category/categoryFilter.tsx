import React from 'react';
import { BooleanInput, Filter, TextInput } from 'react-admin';

const CategoryFilter = ({ onChange, ...props }) => {
  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newFilter = {
      [name]: type === 'checkbox' ? checked : value,
    };
    onChange(newFilter);
  };

  return (
    <Filter {...props}>
      <BooleanInput
        label="Статус"
        source="filterStatus"
        onChange={handleFilterChange}
        defaultValue={true}
      />
      <TextInput
        label="Название"
        source="filterName"
        onChange={handleFilterChange}
      />
      <TextInput
        label="Описание"
        source="filterDescription"
        onChange={handleFilterChange}
      />
    </Filter>
  );
};

export default CategoryFilter;
