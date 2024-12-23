import { useState } from 'react';
import CarouselOrdersProducts from './carousel';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Spinner } from '../../spinner';
import PriceDisplayOrder from '../../displayPrice/PriceDisplayOrder';
export default function OrderCard({ order }: { order: any }) {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!isExpanded);

  const totalItems = order.products.reduce((acc: number, product: any) => {
    return acc + product.quantity;
  }, 0);

  return (
    <div key={order.id} className="border shadow-md p-4 mt-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            Заказ №{order.currentID} от {order.registred}
          </h3>
          <p className="text-sm text-gray-500">{order.address}</p>
          <p className="text-sm text-gray-500">Сумма: {order.total} руб.</p>
          <p className="mt-1 py-2 border-gray-300 shadow-sm cursor-default">
            Статус: {order.state}
          </p>
          {order.hrefForInvoice ? (
            <p className="text-xl">
              <Link
                href={`${order.hrefForInvoice}`}
                target="_blank"
                className="font-bold"
              >
                Скачать счет на оплату
              </Link>
              .
            </p>
          ) : (
            <div className="flex items-center space-x-2">
              <Spinner />{' '}
              <p className="text-xl text-pink-400">
                Счет формируется, ожидайте.
              </p>
            </div>
          )}
        </div>
        <button
          className="text-rose-500 hover:underline flex items-center"
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <BarsArrowUpIcon width={24} />
          ) : (
            <BarsArrowDownIcon width={24} />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-6 bg-white shadow-md ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <p className="text-lg font-medium text-gray-700 py-2 cursor-default">
                На сумму: <PriceDisplayOrder price={order.totalAmount} />
              </p>
              <p className="text-lg font-medium text-gray-700 py-2 cursor-default">
                Скидка: <PriceDisplayOrder price={order.discount} />
              </p>
              <p className="text-lg font-medium text-gray-900 py-2 cursor-default whitespace-nowrap">
                Итого: <PriceDisplayOrder price={order.total} />
              </p>
            </div>
            <div className="md:col-span-2 mt-4 md:mt-0">
              <CarouselOrdersProducts
                key={order.id}
                products={order.products}
                options={{
                  dragFree: true,
                  active: true,
                  slidesToScroll: window.innerWidth >= 640 ? 3 : 1,
                  loop: true,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
