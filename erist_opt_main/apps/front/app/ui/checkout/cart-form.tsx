import Link from 'next/link';
import { getCart } from '../../lib/actions';
import ProductImageCart from '../card/product-image';
import { DeleteProduct } from './buttons';
import PriceDisplay from '../displayPrice/PriceDisplay';
import CartSummary from '../card/cardSummary';
import FormattedPrice from '../card/FormattedPrice';

export default async function CheckoutCartForm() {
  const cart = await getCart();
  const cartItems = cart?.items.length ? cart?.items.length : 0;
  return (
    <>
      {cart && cartItems > 0 ? (
        <>
          <div className="flex flex-col  bg-white shadow-xl">
            <div className="flex-1 ">
              <div className="md:mt-8">
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200">
                    {cart?.items.map((item) => (
                      <li key={item.id} className="flex py-2">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
                          <ProductImageCart
                            src={
                              item.product.image ||
                              'https://static.erist.store/images/no_image_product.webp'
                            }
                            alt={item.product.name}
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                {!item.available &&
                                  item.product.availableQuantity && (
                                    <p className="col-red bg-red-50 text-red-700 border-r-4 border-transparent">
                                      * доступно к заказу{' '}
                                      {item.quantity +
                                        item.product.availableQuantity}
                                    </p>
                                  )}
                                <Link href={item.id}>{item.product.name}</Link>
                                <p>Размер: {item.product.optionName}</p>
                              </h3>
                              <p className="ml-4 whitespace-nowrap">
                                <PriceDisplay price={item.product.price} />
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Количество: {item.quantity}
                            </p>

                            {/* <DeleteProduct id={item.id} /> */}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base text-gray-900">
                <p>Сумма</p>
                <p>
                  <FormattedPrice amount={cart.totalAmount} />
                </p>
              </div>

              <div className="flex justify-between text-base text-gray-900 ">
                {cart && cart.discount !== 0 && (
                  <>
                    <p className="font-bold">Скидка</p>
                    <FormattedPrice amount={cart.discount || 0} />
                    {/* TODO front */}
                  </>
                )}
              </div>
              <div className="flex justify-between text-base text-gray-900 mb-2">
                <p>Доставка</p>
                <p>Рассчитывается отдельно</p>
              </div>

              <div className="flex justify-between text-base font-medium text-gray-900">
                <p className="text-xl font-bold">Итого:</p>
                <p className="text-xl font-bold">
                  <FormattedPrice amount={cart.total || 0} />
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-6">
          <p className="text-lg font-medium text-gray-900">
            Нет товаров в корзине
          </p>
        </div>
      )}
    </>
  );
}
