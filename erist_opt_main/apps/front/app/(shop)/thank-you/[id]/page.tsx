import { HeartIcon } from '@heroicons/react/24/outline';
import { Suspense } from 'react';

import CheckoutSuccessPageSkeleton from '../../../ui/skeletons/CheckoutSuccessPageSkeleton';
import Link from 'next/link';

export default function ThankYouPage({ params }: { params: any }) {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <HeartIcon width={45} fill="black" />
      <p className="text-sm">ЛЮБОВЬ И БЛАГОДАРНОСТЬ</p>
      <p className="font-medium text-4xl">Спасибо за ваш заказ!</p>
      <p className="text-xl">
        Счет в скором времени будет сформирован. <br />
        Вы можете скачать его в личном кабинете. <br />
        Сразу после оплaты счета команда Erist.Store начнет обрабатывать Ваш
        заказ. <br />
        Товар по неоплаченному заказу будет зарезервирован в течение 2-х часов.
        <br />
        После чего мы уже не сможем гарантировать вам полное наличие товара из
        вашего заказа.
        <br /> Для согласования иных условий свяжитесь с нашим менеджером по
        телефону
        <Link href="tel:+79120507666" className="ml-2 hover:underline">
          +7 912 050-76-66.
        </Link>
      </p>
      <Suspense
        key={`thank-${params.id}`}
        fallback={<CheckoutSuccessPageSkeleton />}
      >
        {/* <ThankYouForm id={params.id} /> */}
      </Suspense>
      <Link href={'/lk'} className="text-xl text-pink-500">
        В личный кабинет
      </Link>
      <Link href={'/home'} className="text-xl text-pink-500">
        На главную
      </Link>
    </div>
  );
}
