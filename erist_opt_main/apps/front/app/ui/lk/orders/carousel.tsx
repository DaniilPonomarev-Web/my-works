'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CarouselOrdersProducts({ products, options }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const fallbackImage =
    'https://static.erist.store/images/no_image_product.webp';

  useEffect((): any => {
    if (!emblaApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', updateScrollButtons);
    updateScrollButtons();

    return () => emblaApi.off('select', updateScrollButtons);
  }, [emblaApi]);

  const handleImageError = (event: any) => {
    event.target.src = fallbackImage;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto  overflow-hidden">
      <div className="embla mt-4" ref={emblaRef}>
        <div className="embla__container flex">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="embla__slide flex-shrink-0 mx-2 cursor-pointer w-1/2 lg:w-1/5"
            >
              <Link href={`/product/${product.id}`} passHref>
                <div className="relative bg-white rounded-lg overflow-hidden">
                  <Image
                    className="w-full h-auto"
                    src={
                      product.image ??
                      'https://static.erist.store/images/no_image_product.webp'
                    }
                    alt={product.name}
                    blurDataURL={product.image}
                    layout="responsive"
                    loading="lazy"
                    width={150}
                    height={200}
                    onError={handleImageError}
                  />
                  <span className="absolute -top-0 -right-0 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                    {product.quantity}
                  </span>
                  <div className="p-2">
                    <h3 className="text-xs ">
                      {product.name} ({product.optionName})
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {canScrollPrev && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
        >
          <ArrowLeftIcon className="text-white w-4 m-auto" />
        </button>
      )}
      {canScrollNext && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
          onClick={() => emblaApi && emblaApi.scrollNext()}
        >
          <ArrowRightIcon className="text-white w-4 m-auto" />
        </button>
      )}
    </div>
  );
}
