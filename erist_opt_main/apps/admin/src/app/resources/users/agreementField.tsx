import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const AgreementField = ({ record }) => {
  if (!record) return <CloseIcon color="error" />;

  return record.agreement ? (
    <CheckIcon color="primary" />
  ) : (
    <CloseIcon color="error" />
  );
};

export default AgreementField;
