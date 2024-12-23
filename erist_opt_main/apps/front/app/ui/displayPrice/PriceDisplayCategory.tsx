import React from 'react';

interface PriceDisplayProps {
  price: number;
}

const PriceDisplayCategory: React.FC<PriceDisplayProps> = ({ price }) => {
  return (
    <p className="text-gray-700 text-xl mt-3 whitespace-nowrap">
      Цена {Math.ceil(price)} ₽ <br />
      {/* Розница {Math.ceil(price)} ₽ */}
    </p>
  );
};

export default PriceDisplayCategory;
