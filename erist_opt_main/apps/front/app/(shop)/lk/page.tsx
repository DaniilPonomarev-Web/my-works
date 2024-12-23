import { Suspense } from 'react';

import LkForm from '../../ui/lk/lk-form';
import { LkSkeleton } from '../../ui/skeletons';
import {
  getOrdersUsers,
  getUserData,
  getUserFeedbacks,
} from '../../lib/actions';
import { SortOptions } from '../../lib/types';
import { OrdersFilterDto } from '@erist-opt/meta-graphql';
export const revalidate = 0;

export default async function LkPage({ params, searchParams }: any) {
  const data = await getUserData();
  const feedbacks = await getUserFeedbacks();

  const pagination = {
    page: Number(searchParams?.page) || 1,
    limit: Number(searchParams?.limit) || 4,
  };

  const sort: SortOptions = {
    key: searchParams?.sort ?? 'currentID',
    orderBy: searchParams?.orderBy ?? 'desc',
  };

  const filter: OrdersFilterDto = {
    orderNumber: searchParams?.orderNumber
      ? Number(searchParams?.orderNumber)
      : null,
    productName: searchParams?.productName ?? null,
    totalAmountFrom: searchParams?.totalAmountFrom
      ? Number(searchParams?.totalAmountFrom)
      : null,
    totalAmountTo: searchParams?.totalAmountTo
      ? Number(searchParams?.totalAmountTo)
      : null,
    dateFrom: searchParams?.dateFrom ?? null,
    dateTo: searchParams?.dateTo ?? null,
  };
  const ordersData = await getOrdersUsers({ sort, pagination, filter });

  return (
    <main className="flex flex-col items-center justify-start mt-10 min-h-screen py-2">
      <Suspense key={'lk'} fallback={<LkSkeleton />}>
        <LkForm user={data.whoIAm} orders={ordersData} feedbacks={feedbacks} />
      </Suspense>
    </main>
  );
}
