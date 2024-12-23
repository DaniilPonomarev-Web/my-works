import React from 'react';
import FormattedPrice from './FormattedPrice';

interface CartSummaryProps {
  totalAmount: number;
  discount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalAmount, discount }) => {
  const thresholds = [
    { amount: 80000, discountRate: 0.07 },
    { amount: 150000, discountRate: 0.15 },
  ];

  // Найти текущий порог скидки
  const currentThreshold = thresholds
    .slice()
    .reverse()
    .find((threshold) => totalAmount >= threshold.amount);

  // Найти следующий порог скидки
  const nextThreshold = thresholds.find(
    (threshold) => totalAmount < threshold.amount
  );

  // Если есть следующий порог, вычисляем сумму до него и процент скидки
  const amountToNextThreshold = nextThreshold
    ? nextThreshold.amount - totalAmount
    : 0;

  // Скидка для следующего порога
  const nextDiscountRate = nextThreshold
    ? (nextThreshold.discountRate * 100).toFixed(0) // Округление до целого числа
    : 0;

  return (
    <div>
      <div className="flex justify-between text-base text-gray-900 mb-2">
        {discount !== 0 && (
          <>
            <p className="font-bold">Скидка</p>
            <FormattedPrice amount={discount} />
          </>
        )}
      </div>
      {amountToNextThreshold > 0 && (
        <div className="flex justify-between text-base text-gray-900 mb-2">
          <p className="font-bold">
            Добавьте еще на {<FormattedPrice amount={amountToNextThreshold} />}{' '}
            чтобы получить скидку {nextDiscountRate}%
          </p>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
