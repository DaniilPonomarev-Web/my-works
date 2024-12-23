import Link from 'next/link';
import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from 'next/image';

interface ProductTileProps {
  product: any;
  onClose: () => void;
}

const ProductTileRand: React.FC<ProductTileProps> = ({
  product,
  onClose,
}: any) => {
  const fallbackImage = '/no_image.webp';

  const [src, setSrc] = React.useState(product.images[0].image);
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex-col items-center  hover:shadow-8xl"
      onClick={onClose}
    >
      <Image
        className="w-28 h-40"
        src={src !== null ? src : fallbackImage}
        alt={product.description.name}
        loading="lazy"
        width={112}
        height={160}
        onError={() => setSrc(fallbackImage)}
      />
      {/* <p className="font-gray w-28 text-xs">{product.description?.name}</p> */}
    </Link>
  );
};

export default ProductTileRand;
