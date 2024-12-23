import React from 'react';

interface FormattedPriceProps {
  amount: number;
}

const FormattedPrice: React.FC<FormattedPriceProps> = ({ amount }) => {
  const formattedAmount = amount.toLocaleString('ru-RU');

  return <span>{formattedAmount} ₽</span>;
};

export default FormattedPrice;
