import React from 'react';

export default function StockInfo({ quantity }: { quantity: number }) {
  return (
    <p
      className={`text-sm ml-auto mr-0 ${
        quantity > 0 ? 'text-green-800' : 'text-red-800'
      }`}
    >
      {quantity > 0 ? `${quantity} в наличии` : 'Нет на складе'}
    </p>
  );
}
