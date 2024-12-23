'use client';

import Link from 'next/link';
import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Image from 'next/image';
import PriceDisplayCategory from './displayPrice/PriceDisplayCategory';
import { useSession } from 'next-auth/react';

interface Product {
  id: string;
  model: string;
  price: number;
  quantity: number;
  maincategory: string;
  categories: string[];
  status: boolean;
  sortOrder: number;
  description: {
    name: string;
    description: string;
  };
  images: {
    id: string;
    image: string;
    sortOrder: number;
    blurDataURL: string | null;
  }[];
}

const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAABB2lDQ1BJQ0MgUHJvZmlsZQAAKM9jYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+sykA44U1KLk4H0ByBWKQJaDjRSBMgWSYewNUDsJAjbBsQuLykoAbIDQOyikCBnIDsFyNZIR2InIbGTC4pA6nuAbJvcnNJkhLsZeFLzQoOBNAcQyzAUMwQxuDM4gfwPUZK/iIHB4isDA/MEhFjSTAaG7a0MDBK3EGIqCxgY+FsYGLadR4ghwqQgsSgRLMQCxExpaQwMn5YzMPBGMjAIX2Bg4IqGBQQOtymA3ebOkA+E6Qw5DKlAEU+GPIZkBj0gy4jBgMGQwQwAptY/P1N/5B4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVChTTY97S1NxHMbPG+gy1F08l21Hd1V3dnZpZ27qNsulc6YzRWlYXhIVAqOMCCQC30QvoPfQH72E6K/ACLpRiUU0tamly08/8Z++8PB9eHi+D99HOjxqsP+nwS+B3cOzfSC0usCe4DWhfa8fI/HfHJ9AQ+B0/opdF6a9gyNq9d9I2z9qvPm4xdtPX3n3eYtNwV9/+Mbmlx22dxv83D9hq3aElJtdo7yyTra6ijG6SGJiCWN8GWvmPqN3N3j24iXPX71HKq0scmfjMfPrD5leW6W6do/hpVkKIyV6pivkb07RPzOFNDJfZHhugPJCkdHbVymM9VOpTlIsDJEezlCY6iVTtpCy4ym6K0l6JlJYpThdfQaTC49YePCUzLUx0mUfsWIQKT3RTfYUlRThQpjIQI6c+PHW8hP6BqskUwGiOS9S3/U0lwZNEoMJ9KxfXOcIJy4zVLpBtHecuGlhdorE5IBBW1JHjbfjirqJXsnTJIex25ycVzoJdefJJFJIwXQIe0jhnGJDjup4TQOHEkB26TQpXXisPAFTR2oJKshhGS3mxS+KKBEV0zDpCEbx+wJ4fC7kjotnRi3mQU224bZ8uAwVzeMmoPtxtcq0OOy0tjuQmtvtNIdc2Dtl1ISMM+LE4xfpegC36mV+cQ6nT0WyCXdzsBU5rqFbGvbgBZGoEYvE0bU2LFGkxWHjH1jUPSThBT6lAAAAAElFTkSuQmCC';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const fallbackImage =
    'https://static.erist.store/images/no_image_product.webp';
  const [src, setSrc] = React.useState(
    product.images.length > 0
      ? product.images[0].image
      : 'https://static.erist.store/images/no_image_product.webp'
  );
  const { data: session } = useSession(); // Получаем данные сессии
  const isAuthenticated = !!session?.user; // Проверяем, авторизован ли пользователь
  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="mt-6 bg-white hover: cursor-pointer">
        <Image
          className="w-full h-auto"
          src={src !== null ? src : fallbackImage}
          alt={product.description.name}
          layout="responsive"
          loading="lazy"
          width={373}
          height={560}
          blurDataURL={product.images[0]?.blurDataURL || blurDataURL}
          placeholder="blur"
          onError={() => setSrc(fallbackImage)}
        />

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.description.name}
          </h3>
          {/* <span className="whitespace-nowrap">
            <PriceDisplay price={product.price} />
          </span> */}
          {/* <PriceDisplayCategory price={product.price} /> */}
          {isAuthenticated && <PriceDisplayCategory price={product.price} />}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
