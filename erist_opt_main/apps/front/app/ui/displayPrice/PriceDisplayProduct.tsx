import React from 'react';

interface PriceDisplayProps {
  price: number;
}

const PriceDisplayProduct: React.FC<PriceDisplayProps> = ({ price }) => {
  return (
    <>
      <p className="text-xs text-gray-400 ">Оптовая цена</p>
      <p className="text-gray-700 text-xl  whitespace-nowrap">
        {Math.ceil(price).toLocaleString('ru-RU')} ₽
      </p>
    </>
  );
};

export default PriceDisplayProduct;
