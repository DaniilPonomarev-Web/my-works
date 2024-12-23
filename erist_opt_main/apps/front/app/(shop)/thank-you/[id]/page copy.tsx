import { HeartIcon } from '@heroicons/react/24/outline';
import { Suspense } from 'react';

import CheckoutSuccessPageSkeleton from '../../../ui/skeletons/CheckoutSuccessPageSkeleton';
import ThankYouForm from '../../../ui/thank-you-form';
import Link from 'next/link';

export default function ThankYouPage({ params }: { params: any }) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <HeartIcon width={45} fill="black" />
      <p className="text-sm">ЛЮБОВЬ И БЛАГОДАРНОСТЬ</p>
      <p className="font-medium text-4xl">Спасибо за заказ!</p>
      <p className="text-xl">
        Сразу после оплаты счета команда Erist.Store начнет обрабатывать Ваш
        заказ.
      </p>
      <Suspense
        key={`thank-${params.id}`}
        fallback={<CheckoutSuccessPageSkeleton />}
      >
        <ThankYouForm id={params.id} />
      </Suspense>
      <Link href={'/home'} className="text-xl text-pink-500">
        На главную
      </Link>
    </div>
  );
}
