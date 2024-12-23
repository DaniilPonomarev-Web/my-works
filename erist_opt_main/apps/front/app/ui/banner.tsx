'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Banner({ banner }: { banner: any }) {
  const link = banner.link ? banner.link : '/home';
  return (
    <div className="w-full">
      <a href={link}>
        <span className="block w-full">
          <div className="hidden sm:block w-full">
            <Image
              className="w-full h-auto"
              src={banner.image_href}
              alt={banner.name}
              blurDataURL={banner.image_href}
              layout="responsive"
              loading="lazy"
              width={500}
              height={500}
            />
          </div>
          <div className="sm:hidden w-full">
            <Image
              className="w-full h-auto"
              src={banner.image_mob_href}
              alt={banner.name}
              blurDataURL={banner.image_mob_href}
              layout="responsive"
              loading="lazy"
              width={500}
              height={500}
            />
          </div>
        </span>
      </a>
    </div>
  );
}
