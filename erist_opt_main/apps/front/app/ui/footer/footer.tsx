import Link from 'next/link';
import SvgLogoFooter from '../Icons/LogoFooter';

import SocialLinks from './SocialLinks';
import InformationLinks from './InformationLinks';
import { Suspense } from 'react';
import { InformationLinkSkeleton, SocialLinksSkeleton } from '../skeletons';

export default function Footer() {
  return (
    <footer className="bg-black text-white p-0 sm:p-8">
      <div className="w-full max-w-6xl gap-4 p-4 flex flex-col md:flex-row mx-auto">
        <div className="mr-3.5 flex flex-col items-start">
          <SvgLogoFooter />
          <Suspense key={'social-links'} fallback={<SocialLinksSkeleton />}>
            <SocialLinks />
          </Suspense>
        </div>
        <Suspense key={'social-links'} fallback={<InformationLinkSkeleton />}>
          <InformationLinks />
        </Suspense>
        <ContactBlock />
      </div>
    </footer>
  );
}

function ContactBlock() {
  return (
    <div className="mx-0.5">
      <span className="block text-lg font-semibold">Контакты</span>
      <div className="flex flex-col mt-2">
        <Link href="tel:+79120507666" className="mt-2 text-sm hover:underline">
          +7 912 050-76-66
        </Link>
        <Link
          href="mailto:wholesale@erist.store"
          className="mt-2 text-sm hover:underline"
        >
          wholesale@erist.store
        </Link>
        <span className="mt-2 text-sm">
          г. Екатеринбург, ул. Шейнкмана, 119 (офис 214, этаж 2)
        </span>
        <Link
          href="https://yandex.ru/maps/-/CCUbuYuoTC"
          target="_blank"
          className="mt-2 text-sm hover:underline"
        >
          Показать на карте
        </Link>
      </div>
    </div>
  );
}
