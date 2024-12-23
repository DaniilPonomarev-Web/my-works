import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import SynonymsFilter from './synonymsFilter';

const SynonymsList = (props) => (
  <List
    {...props}
    filters={<SynonymsFilter />}
    // empty={<div>Группы синонимов не найдены</div>}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="synonyms" label="Группа синонимов" />
    </Datagrid>
  </List>
);

export default SynonymsList;
