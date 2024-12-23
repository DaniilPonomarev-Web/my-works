import React from 'react';
import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';

const FeedbackEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <BooleanInput source="status" label="Статус" />
    </SimpleForm>
  </Edit>
);

export default FeedbackEdit;
