import { Suspense } from 'react';

import HomeBanner from '../../ui/home/home-banner';
import {
  CarouselMainBlocksSkeletonWrapper,
  HomeBannerSkeleton,
  HomeCategoriesSkeleton,
} from '../../ui/skeletons';
import CarouselMainBlocks from '../../ui/home/carousel-blocks';
import FeedbackButton from '../../ui/sendFeedback';
import CategoriesHomePage from '../../ui/home/home-categories';

export const dynamic = 'force-dynamic';
export const revalidate = 600;

export default function DashboardPage() {
  return (
    <main className="w-full flex flex-col items-center justify-start min-h-screen">
      <Suspense key="home-banner" fallback={<HomeBannerSkeleton />}>
        <HomeBanner />
      </Suspense>

      <Suspense fallback={<HomeCategoriesSkeleton />}>
        <CategoriesHomePage />
      </Suspense>

      <Suspense fallback={<CarouselMainBlocksSkeletonWrapper />}>
        <CarouselMainBlocks />
      </Suspense>

      <FeedbackButton />
    </main>
  );
}
