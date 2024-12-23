import React from 'react';
import { BooleanInput, Filter, NumberInput, TextInput } from 'react-admin';

const FeedbackFilter = (props) => (
  <Filter {...props}>
    <BooleanInput label="Статус" source="filterStatus" />
    <TextInput label="Синоним" source="filterText" />
    <TextInput label="ИНН" source="filterUserInn" />
  </Filter>
);

export default FeedbackFilter;
