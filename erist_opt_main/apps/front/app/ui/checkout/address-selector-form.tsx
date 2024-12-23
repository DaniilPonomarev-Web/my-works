'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@erist-opt/shadcn/components/ui/select';
import { useEffect, useState } from 'react';
import { WhoIAmQuery } from '@erist-opt/meta-graphql';
import { useFormState, useFormStatus } from 'react-dom';
import { createOrder, getCart } from '../../lib/actions';
import { ButtonCheckout } from '../button';
// import AgreementDrawer from './AgreementModal';
import Link from 'next/link';

export default function AddressSelectorForm({
  isAgreementSigned,
}: {
  isAgreementSigned: boolean;
}) {
  const initialState = { success: false, message: null, errors: null } as any;
  const [state, dispatch] = useFormState(createOrder, initialState);
  const [isCheckboxChecked, setCheckboxChecked] = useState(isAgreementSigned);
  const [cart, setCart] = useState<any>();
  // const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const cart = await getCart();
      setCart(cart);
    };
    fetcher();
  }, []);

  useEffect(() => {
    setCheckboxChecked(isAgreementSigned);
  }, [isAgreementSigned]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxChecked(event.target.checked);
  };

  // const handleOpenModal = () => setModalOpen(true);
  // const handleCloseModal = () => setModalOpen(false);

  return (
    <form action={dispatch} className="relative flex flex-col gap-4">
      <div id="address-error" aria-live="polite" aria-atomic="true">
        {state.errors?.shippingAddressId &&
          state.errors.shippingAddressId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      {!isAgreementSigned && (
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="agreement"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="agreement" className="text-gray-700">
            Я прочитал и согласен с условиями{' '}
            <Link
              className="text-blue-500 underline"
              href="https://static.erist.store/fonts/oferta_eriststore_opt.pdf"
              target="_blank"
            >
              {' '}
              договора
            </Link>
            {/* <button
              type="button"
              onClick={handleOpenModal}
              className="text-blue-500 underline"
            >
              договора
            </button> */}
          </label>
        </div>
      )}

      {cart?.canCheckout && (isAgreementSigned || isCheckboxChecked) ? (
        <div className="flex justify-between z-0 flex-col">
          <CreateOrderButton />
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-md border border-red-300 bg-red-50 px-6 py-3 text-base font-medium text-red-700 shadow-sm">
          {isCheckboxChecked || isAgreementSigned
            ? 'Некоторые товары недоступны для заказа'
            : 'Пожалуйста, подтвердите договор'}
        </div>
      )}

      {/* <AgreementDrawer open={isModalOpen} onClose={handleCloseModal} /> */}
    </form>
  );
}

function CreateOrderButton() {
  const { pending } = useFormStatus();
  return (
    <ButtonCheckout aria-disabled={pending}>Оформление заказа</ButtonCheckout>
  );
}
