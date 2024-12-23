'use client';

import React, { useState } from 'react';

import OrderCard from './order-card';
import Pagination from '../../pagination';
import { OrdersUser } from '../../../lib/types';
import { OrderFilter } from './order-filter';

export default function OrdersInfoForm({
  userOrders,
}: {
  userOrders: OrdersUser;
}) {
  const { orders, total: totalPages } = userOrders;
  const [, setAdd] = useState(false);

  const limit = 10;
  const totalPagesNull = Math.ceil(Number(totalPages) / limit);

  const onAdd = () => setAdd(true);
  const onClose = () => setAdd(false);

  return (
    <div className="px-1 md:px-4">
      <h2 className="text-lg font-bold mb-2 md:text-2xl">Мои заказы</h2>
      <OrderFilter />
      {orders?.length > 0 ? (
        orders.map((order: any, index: number) => (
          <OrderCard key={index} order={order} />
        ))
      ) : (
        <p className="mt-2 text-center md:mt-4">Вы ещё не совершали заказы</p>
      )}
      {totalPages !== 0 && (
        <>
          <div className="mt-5 flex w-full justify-center">
            {totalPages && <Pagination totalPages={totalPagesNull} />}
          </div>
        </>
      )}
    </div>
  );
}
