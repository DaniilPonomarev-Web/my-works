'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CardProps {
  cartItems: any;
}

const CheckoutCard: React.FC<CardProps> = ({ cartItems }) => {
  const fallbackImage =
    'https://static.erist.store/images/no_image_product.webp';
  const handleImageError = (event: any) => {
    event.target.src = fallbackImage;
  };

  return (
    <div className="flex flex-col  bg-white shadow-xl">
      <div className="flex-1 ">
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {cartItems.map((cartItem: any) => (
                <li key={cartItem.id} className="flex py-2">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
                    <LazyLoadImage
                      src={cartItem.images[0].image}
                      alt={cartItem.description.name}
                      effect="blur"
                      className="h-full w-full object-cover object-center"
                      onError={handleImageError}
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={cartItem.id}>
                            {cartItem.description.name}
                          </Link>
                        </h3>
                        <p className="ml-4">{cartItem.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Количество: {cartItem.quantity}
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-black-600 hover:text-black-500"
                        >
                          <TrashIcon width={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Сумма</p>
          <p>14 426 ₽</p>
        </div>
      </div>
    </div>
  );
};
export default CheckoutCard;
