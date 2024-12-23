import React from 'react';

interface PriceDisplayProps {
  price: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price }) => {
  return <> {Math.ceil(price).toLocaleString('ru-RU')} ₽</>;
};

export default PriceDisplay;
