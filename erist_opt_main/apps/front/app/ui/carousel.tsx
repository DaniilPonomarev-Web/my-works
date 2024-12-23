'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import PriceDisplay from './displayPrice/PriceDisplay';
import PriceDisplayCategory from './displayPrice/PriceDisplayCategory';
import { useSession } from 'next-auth/react';

export default function CarouselMainBlocksOnHomeBage({ block, options }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const fallbackImage =
    'https://static.erist.store/images/no_image_product.webp';
  const blurDataURL =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAABB2lDQ1BJQ0MgUHJvZmlsZQAAKM9jYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+sykA44U1KLk4H0ByBWKQJaDjRSBMgWSYewNUDsJAjbBsQuLykoAbIDQOyikCBnIDsFyNZIR2InIbGTC4pA6nuAbJvcnNJkhLsZeFLzQoOBNAcQyzAUMwQxuDM4gfwPUZK/iIHB4isDA/MEhFjSTAaG7a0MDBK3EGIqCxgY+FsYGLadR4ghwqQgsSgRLMQCxExpaQwMn5YzMPBGMjAIX2Bg4IqGBQQOtymA3ebOkA+E6Qw5DKlAEU+GPIZkBj0gy4jBgMGQwQwAptY/P1N/5B4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVChTTY97S1NxHMbPG+gy1F08l21Hd1V3dnZpZ27qNsulc6YzRWlYXhIVAqOMCCQC30QvoPfQH72E6K/ACLpRiUU0tamly08/8Z++8PB9eHi+D99HOjxqsP+nwS+B3cOzfSC0usCe4DWhfa8fI/HfHJ9AQ+B0/opdF6a9gyNq9d9I2z9qvPm4xdtPX3n3eYtNwV9/+Mbmlx22dxv83D9hq3aElJtdo7yyTra6ijG6SGJiCWN8GWvmPqN3N3j24iXPX71HKq0scmfjMfPrD5leW6W6do/hpVkKIyV6pivkb07RPzOFNDJfZHhugPJCkdHbVymM9VOpTlIsDJEezlCY6iVTtpCy4ym6K0l6JlJYpThdfQaTC49YePCUzLUx0mUfsWIQKT3RTfYUlRThQpjIQI6c+PHW8hP6BqskUwGiOS9S3/U0lwZNEoMJ9KxfXOcIJy4zVLpBtHecuGlhdorE5IBBW1JHjbfjirqJXsnTJIex25ycVzoJdefJJFJIwXQIe0jhnGJDjup4TQOHEkB26TQpXXisPAFTR2oJKshhGS3mxS+KKBEV0zDpCEbx+wJ4fC7kjotnRi3mQU224bZ8uAwVzeMmoPtxtcq0OOy0tjuQmtvtNIdc2Dtl1ISMM+LE4xfpegC36mV+cQ6nT0WyCXdzsBU5rqFbGvbgBZGoEYvE0bU2LFGkxWHjH1jUPSThBT6lAAAAAElFTkSuQmCC';

  const { data: session } = useSession(); // Получаем данные сессии
  const isAuthenticated = !!session?.user;

  const handleImageError = (event: any) => {
    event.target.src = fallbackImage;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8 p-4 overflow-hidden">
      <h2 className="text-2xl font-bold">
        <Link href={block.link}>{block.title}</Link>
      </h2>
      <div className="embla mt-4" ref={emblaRef}>
        <div className="embla__container flex">
          {block.products.map((product: any) => (
            <div
              key={product.id}
              className="embla__slide flex-shrink-0 mx-2 cursor-pointer w-1/2 lg:w-1/3"
            >
              <Link href={`/product/${product.id}`} passHref>
                <div className="bg-white overflow-hidden">
                  <Image
                    className="w-full h-auto"
                    src={
                      product.images[0]
                        ? product.images[0].image
                        : 'https://static.erist.store/images/no_image_product.webp'
                    }
                    alt={product.description.name}
                    layout="responsive"
                    loading="lazy"
                    width={373}
                    height={560}
                    blurDataURL={product.images[0].blurDataURL || blurDataURL}
                    placeholder="blur"
                    onError={handleImageError}
                  />

                  <div className="pt-2">
                    <h3 className="text-xl font-semibold">
                      {product.description.name}
                    </h3>
                    {isAuthenticated && <PriceDisplay price={product.price} />}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
      >
        <ArrowLeftIcon className="text-white w-4 m-auto" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
        onClick={() => emblaApi && emblaApi.scrollNext()}
      >
        <ArrowRightIcon className="text-white w-4 m-auto" />
      </button>
    </div>
  );
}
