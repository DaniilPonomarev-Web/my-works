import Link from 'next/link';
import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from 'next/image';
import PriceDisplay from '../displayPrice/PriceDisplay';
import { useSession } from 'next-auth/react';

interface ProductTileProps {
  product: any;
  onClose: () => void;
}

const ProductTile: React.FC<ProductTileProps> = ({ product, onClose }: any) => {
  const fallbackImage = '/no_image.webp';

  const { data: session } = useSession(); // Получаем данные сессии
  const isAuthenticated = !!session?.user; // Проверяем, авторизован ли пользователь

  const [src, setSrc] = React.useState(product.images[0]?.image);
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex items-center border border-gray-300  p-1 mb-2 hover:shadow"
      onClick={onClose}
    >
      <Image
        className="w-12 h-16"
        src={src !== null ? src : fallbackImage}
        alt={product.description.name}
        loading="lazy"
        width={48}
        height={64}
        onError={() => setSrc(fallbackImage)}
      />

      <div className="ml-2 flex-grow">
        <div className="font-bold text-sm">{product.description?.name}</div>
        <div className="text-sm text-gray-500">{product.model}</div>
      </div>
      <div className="text-right">
        {isAuthenticated ? (
          <p className="font-bold whitespace-nowrap">
            <PriceDisplay price={product.price} />
          </p>
        ) : (
          ''
        )}
      </div>
    </Link>
  );
};

export default ProductTile;
