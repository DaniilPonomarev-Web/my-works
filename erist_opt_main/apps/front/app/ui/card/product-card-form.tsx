'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import {
  getCart,
  removeFromCart,
  revalidateCheckout,
  updateCartItemQuantity,
} from '../../lib/actions';
import { CartSkeleton } from '../skeletons';
import { useAtom } from 'jotai';
import { QuantityCart } from '../../lib/store/cart.store';
import PriceDisplay from '../displayPrice/PriceDisplay';
import CartSummary from './cardSummary';
import FormattedPrice from './FormattedPrice';

export default function ProductCartForm({ onClose }: { onClose: () => void }) {
  const [isLoading, setLoading] = useState(true);
  const [cart, setCart] = useState<any>();
  const [, setQuantity] = useAtom(QuantityCart);

  useEffect(() => {
    const fetcher = async () => {
      const cart = await getCart();
      setCart(cart);
      setLoading(false);
    };
    fetcher();
  }, []);

  const handleRemove = async (itemId: string) => {
    const response = await removeFromCart(itemId);
    if (response.success) {
      typeof response.cart?.quantity === 'number' &&
        setQuantity(response.cart.quantity);
      // Обновляем корзину после удаления товара TODO хз
      const updatedCart = await getCart();
      setCart(updatedCart);
      revalidateCheckout();
    } else {
      console.warn('ошибка удаления товара');
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    const response = await updateCartItemQuantity(itemId, quantity);
    if (response.success) {
      response.cart?.quantity && setQuantity(response.cart.quantity);
      const updatedCart = await getCart();
      setCart(updatedCart);
      revalidateCheckout();
    } else {
      console.warn('ошибка изменения количества товара');
    }
  };

  const handleCheckoutClick = () => {
    revalidateCheckout();
    onClose();
  };
  if (isLoading) return <CartSkeleton />;

  return (
    <>
      {cart?.items?.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-scroll px-4 py-6 sm:px-6">
            <ul role="list" className="divide-y divide-gray-200">
              {cart.items.map((item: any) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-28 w-28 flex-shrink-0 overflow-hidden border border-gray-200">
                    <Image
                      className="w-full h-full object-cover"
                      src={
                        item.product.image ||
                        'https://static.erist.store/images/no_image_product.webp'
                      }
                      alt={item.product.name}
                      blurDataURL={
                        item.product.image ||
                        'https://static.erist.store/images/no_image_product.webp'
                      }
                      layout="responsive"
                      loading="lazy"
                      width={373}
                      height={560}
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          {!item.available && (
                            <p className="col-red bg-red-50 text-red-700 border-r-4 border-transparent">
                              * доступно к заказу{' '}
                              {item.quantity + item.product.availableQuantity}
                            </p>
                          )}
                          <Link href={`/product/${item.product.id}`} passHref>
                            {item.product.name}
                          </Link>
                        </h3>
                        <button
                          type="button"
                          className="font-medium text-black-600 hover:text-black-500"
                          onClick={() => handleRemove(item.id)}
                        >
                          <TrashIcon width={24} />
                        </button>
                      </div>
                    </div>
                    <p>Размер: {item.product.optionName}</p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-300">
                        {item.quantity != 1 && (
                          <button
                            type="button"
                            className="px-3 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.product.availableQuantity < 0
                                  ? item.quantity +
                                      item.product.availableQuantity
                                  : item.quantity - 1
                              )
                            }
                          >
                            -
                          </button>
                        )}
                        <p className="text-gray-500 text-sm mx-8">
                          {item.quantity}
                        </p>
                        {item.product.availableQuantity > 0 && (
                          <button
                            type="button"
                            className="px-3 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        )}
                      </div>
                      <p className="ml-4 whitespace-nowrap">
                        {cart.percentDiscount && cart.percentDiscount !== 0 ? (
                          <>
                            <p className="line-through text-gray-500 text-base">
                              <PriceDisplay
                                price={item.product.price * item.quantity}
                              />
                            </p>
                            <p className=" text-base text-pink-500">
                              <PriceDisplay
                                price={
                                  item.product.price *
                                  item.quantity *
                                  (1 - cart.percentDiscount / 100)
                                }
                              />
                            </p>
                          </>
                        ) : (
                          <p className="text-black text-sm">
                            <PriceDisplay
                              price={item.product.price * item.quantity}
                            />
                          </p>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base text-gray-900">
              <p>Сумма</p>
              <p>
                <FormattedPrice amount={cart.totalAmount} />
              </p>
            </div>

            {cart.canCheckout && (
              <CartSummary
                totalAmount={cart.totalAmount}
                discount={cart.discount}
              />
            )}

            <div className="flex justify-between text-base font-medium text-gray-900">
              <p className="text-xl font-bold">Итого: </p>
              <p className="text-xl font-bold">
                <FormattedPrice amount={cart.total} />
              </p>
            </div>
          </div>

          <div className="m-6">
            {cart.canCheckout ? (
              <Link
                href="/checkout"
                onClick={handleCheckoutClick}
                className="flex items-center justify-center border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black-700"
              >
                Оформление заказа
              </Link>
            ) : (
              <div className="flex items-center justify-center border border-red-300 bg-red-50 px-6 py-3 text-base font-medium text-red-700 shadow-sm">
                {cart.messageError}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-6">
          <p className="text-lg font-medium text-gray-900">
            Ваша корзина пуста
          </p>
        </div>
      )}
    </>
  );
}
