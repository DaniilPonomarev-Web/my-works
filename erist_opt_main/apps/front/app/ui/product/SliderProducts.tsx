'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SliderProducts({
  name,
  products,
  text,
}: {
  name: string;
  text: string;
  products: any[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(false);

  const updateArrows = () => {
    if (emblaApi) {
      setShowPrevArrow(emblaApi.canScrollPrev());
      setShowNextArrow(emblaApi.canScrollNext());
    }
  };

  useEffect(() => {
    if (emblaApi) {
      updateArrows();
      emblaApi.on('select', updateArrows);
      emblaApi.on('resize', updateArrows);
    }
  }, [emblaApi]);

  if (!products || products.length === 0) {
    return <div>Товары не найдены</div>;
  }

  const fallbackImage =
    'https://static.erist.store/images/no_image_product.webp';

  const blurDataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAABB2lDQ1BJQ0MgUHJvZmlsZQAAKM9jYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+sykA44U1KLk4H0ByBWKQJaDjRSBMgWSYewNUDsJAjbBsQuLykoAbIDQOyikCBnIDsFyNZIR2InIbGTC4pA6nuAbJvcnNJkhLsZeFLzQoOBNAcQyzAUMwQxuDM4gfwPUZK/iIHB4isDA/MEhFjSTAaG7a0MDBK3EGIqCxgY+FsYGLadR4ghwqQgsSgRLMQCxExpaQwMn5YzMPBGMjAIX2Bg4IqGBQQOtymA3ebOkA+E6Qw5DKlAEU+GPIZkBj0gy4jBgMGQwQwAptY/P1N/5B4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVChTTY97S1NxHMbPG+gy1F08l21Hd1V3dnZpZ27qNsulc6YzRWlYXhIVAqOMCCQC30QvoPfQH72E6K/ACLpRiUU0tamly08/8Z++8PB9eHi+D99HOjxqsP+nwS+B3cOzfSC0usCe4DWhfa8fI/HfHJ9AQ+B0/opdF6a9gyNq9d9I2z9qvPm4xdtPX3n3eYtNwV9/+Mbmlx22dxv83D9hq3aElJtdo7yyTra6ijG6SGJiCWN8GWvmPqN3N3j24iXPX71HKq0scmfjMfPrD5leW6W6do/hpVkKIyV6pivkb07RPzOFNDJfZHhugPJCkdHbVymM9VOpTlIsDJEezlCY6iVTtpCy4ym6K0l6JlJYpThdfQaTC49YePCUzLUx0mUfsWIQKT3RTfYUlRThQpjIQI6c+PHW8hP6BqskUwGiOS9S3/U0lwZNEoMJ9KxfXOcIJy4zVLpBtHecuGlhdorE5IBBW1JHjbfjirqJXsnTJIex25ycVzoJdefJJFJIwXQIe0jhnGJDjup4TQOHEkB26TQpXXisPAFTR2oJKshhGS3mxS+KKBEV0zDpCEbx+wJ4fC7kjotnRi3mQU224bZ8uAwVzeMmoPtxtcq0OOy0tjuQmtvtNIdc2Dtl1ISMM+LE4xfpegC36mV+cQ6nT0WyCXdzsBU5rqFbGvbgBZGoEYvE0bU2LFGkxWHjH1jUPSThBT6lAAAAAElFTkSuQmCC';

  return (
    <div className="relative w-full overflow-hidden">
      <span className="text-lg font-semibold">{name}:</span>
      <div className="embla mt-1" ref={emblaRef}>
        <div className="embla__container flex">
          {products.map((product, index) => (
            <div
              key={index}
              className="embla__slide flex-shrink-0 w-1/4 h-auto px-1 cursor-pointer"
            >
              {product.name}

              <div className="relative w-full h-full">
                <Link href={`/product/${product.id}`} passHref>
                  <Image
                    className="object-cover object-center"
                    src={product?.images[0]?.image || fallbackImage}
                    alt={product.name}
                    // layout="fill"
                    onError={() => fallbackImage}
                    loading="lazy"
                    width={373}
                    height={560}
                    blurDataURL={product.images[0]?.blurDataURL || blurDataURL}
                    placeholder="blur"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPrevArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
        >
          <ArrowLeftIcon className="text-white w-4 m-auto" />
        </button>
      )}
      {showNextArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
          onClick={() => emblaApi && emblaApi.scrollNext()}
        >
          <ArrowRightIcon className="text-white w-4 m-auto" />
        </button>
      )}
    </div>
  );
}
