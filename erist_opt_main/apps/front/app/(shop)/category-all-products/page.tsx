import { Suspense } from 'react';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import { getOptionsForFilter } from '../../lib/actions';
import Breadcrumb from '../../ui/breadCrumbs';
import Filter from '../../ui/category/filter';
import SortOptions from '../../ui/category/sorter';
import ProductList from '../../ui/productList';
import { ProductListSkeleton } from '../../ui/skeletons';

export default async function Category({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    sort?: string;
    page?: string;
    priceFrom?: string;
    priceTo?: string;
    sizes?: string;
    colors?: string;
  };
}) {
  const sort = searchParams?.sort || '';
  const currentPage = Number(searchParams?.page) || 1;
  const priceFrom = searchParams?.priceFrom
    ? Number(searchParams.priceFrom)
    : undefined;
  const priceTo = searchParams?.priceTo
    ? Number(searchParams.priceTo)
    : undefined;
  const sizes = searchParams?.sizes ? searchParams.sizes.split(',') : [];
  const colors = searchParams?.colors ? searchParams.colors.split(',') : [];

  const options = { currentPage, sort, priceFrom, priceTo, sizes, colors };

  const optionsForFilter = await getOptionsForFilter();

  const breadcrumbs = [
    { label: <HomeIcon width={20} />, href: '/home' },
    { label: 'Все товары', href: null },
  ];

  return (
    <main className="w-full flex flex-col items-center justify-start min-h-screen px-4 sm:px-0">
      {/* <BannerCategory image={image} /> */}

      <div className="py-4 w-full max-w-6xl mx-auto">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <p className="text-xl font-semibold py-4">Все товары</p>

        <div className="flex justify-between space-x-4">
          <SortOptions />
          <Filter options={optionsForFilter} />
          {/*TODO front Тут передать максимальную и минимальную цены товаров чтобы ограничить фильтр/ А ещё я хотел сделатть их зависисыси*/}
        </div>

        <Suspense
          key={'product-list-' + currentPage}
          fallback={<ProductListSkeleton />}
        >
          <ProductList categoryId={params.id} options={options} />
        </Suspense>
      </div>
    </main>
  );
}
