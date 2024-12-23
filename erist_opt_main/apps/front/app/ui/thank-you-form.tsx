import Link from 'next/link';
import { getOrderById } from '../lib/actions';

export default async function ThankYouForm({ id }: { id: string }) {
  const order = await getOrderById(id);
  return (
    <p className="text-xl">
      Скачать счет на оплату Вы можете по{' '}
      <Link
        href={`${order?.hrefForInvoice}`}
        target="_blank"
        className="font-bold text-pink-500"
      >
        ссылке
      </Link>
      .
    </p>
  );
}
