import React from 'react';

interface PriceDisplayProps {
  price: number;
}

const PriceDisplayOrder: React.FC<PriceDisplayProps> = ({ price }) => {
  return (
    <span className="text-pink-600 font-semibold whitespace-nowrap">
      {price ? `${Math.ceil(price)} ₽` : 'Отсутствует'}
    </span>
  );
};

export default PriceDisplayOrder;
