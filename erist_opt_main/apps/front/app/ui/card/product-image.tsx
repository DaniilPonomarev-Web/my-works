'use client';

import Image from 'next/image';

interface ProductImageCartProps {
  src: string;
  alt: string;
}

export default function ProductImageCart({ src, alt }: ProductImageCartProps) {
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = event.currentTarget;
    img.src = 'https://static.erist.store/images/no_image_product.webp';
  };

  return (
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200">
      <Image
        className="w-full h-full object-cover"
        src={src || 'https://static.erist.store/images/no_image_product.webp'}
        alt={alt}
        layout="responsive"
        loading="lazy"
        width={500}
        height={500}
        onError={handleImageError}
      />
    </div>
  );
}
