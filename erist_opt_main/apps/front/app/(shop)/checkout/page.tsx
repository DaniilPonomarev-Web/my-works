import { Suspense } from 'react';
import CheckoutCartForm from '../../ui/checkout/cart-form';
import ContactDetailsForm from '../../ui/checkout/contact-details-form';
import { CartSkeleton, ContactDetailsSkeleton } from '../../ui/skeletons';

export const revalidate = 0;

export default function CheckoutPage() {
  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-6xl p-4 order-last">
        <div className="w-full md:w-1/2 p-4 md:order-1">
          <h2 className="text-xl font-semibold mb-4">Корзина</h2>
          <Suspense key="checkout-cart" fallback={<CartSkeleton />}>
            <CheckoutCartForm />
          </Suspense>
        </div>

        <Suspense key="checkout-page" fallback={<ContactDetailsSkeleton />}>
          <ContactDetailsForm />
        </Suspense>
      </div>
    </div>
  );
}
