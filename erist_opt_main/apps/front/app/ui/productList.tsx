import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import { getProductsByCategory } from '../lib/actions';
import Pagination from './pagination';
import ProductCard from './productCard';

export default async function ProductList({
  categoryId,
  options,
}: {
  categoryId: string;
  options: any;
}) {
  const limit = 18;
  const result = await getProductsByCategory(categoryId, { ...options, limit });
  const totalPages = Math.ceil(Number(result.total) / limit);

  return (
    <>
      {result.data?.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.data.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-start min-h-screen mt-8 gap-2 text-center">
          <HeartIcon width={45} fill="black" />
          <p className="text-sm">Cкоро здесь будут товары</p>
        </div>
      )}
    </>
  );
}
