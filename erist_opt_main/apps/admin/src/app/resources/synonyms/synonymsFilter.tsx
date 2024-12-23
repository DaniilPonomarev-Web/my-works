import React from 'react';
import { Filter, TextInput } from 'react-admin';

const SynonymsFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Синоним" source="synonym" />
  </Filter>
);

export default SynonymsFilter;
