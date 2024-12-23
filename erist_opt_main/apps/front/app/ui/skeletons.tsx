import { Skeleton } from '@erist-opt/shadcn/components/ui/skeleton';

export function CategorySkeleton() {
  return <p>LOADING</p>;
}

export function LkSkeleton() {
  return (
    <div className="w-full max-w-6xl">
      <div className="flex overflow-x-auto justify-around border-b mb-4">
        <SkeletonButton />
        <SkeletonButton />
        <SkeletonButton />
        <SkeletonButton />
        <SkeletonButton />
      </div>
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-8">
          <SkeletonText width="250px" />
        </h2>
        <div className="flex flex-col gap-4">
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
          <div className="w-full flex justify-between mt-4 sm:mt-0 gap-3">
            <SkeletonButton fullWidth />
            <SkeletonButton fullWidth />
          </div>
        </div>
      </div>
    </div>
  );
}
function SkeletonButton({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div
      className={`h-10 bg-gray-300 ${fullWidth ? 'w-1/3' : 'w-[100px]'}`}
    ></div>
  );
}

function SkeletonInput() {
  return (
    <div className="w-full">
      <div className="h-6 bg-gray-300 mb-2 w-[60px]"></div>
      <div className="h-10 bg-gray-300"></div>
    </div>
  );
}

function SkeletonText({ width }: { width: string }) {
  return <div className={`h-4 bg-gray-300 mb-1 ${width}`}></div>;
}

export function ProductListSkeleton() {
  return (
    <div className="pt-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(18)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 h-64 w-full"></div>
            <div className="mt-2 h-4 bg-gray-300 w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-300 w-1/2"></div>
            <div className="mt-2 h-4 bg-gray-300 w-1/4"></div>
          </div>
        ))}
      </div>
      <div className="pt-6 flex justify-center">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse mx-2">
            <div className="bg-gray-300 rounded-full h-8 w-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SideBarSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SocialLinksSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function InformationLinkSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex space-x-4">
            <div className="w-24 h-24 bg-gray-200" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200" />
              <div className="h-4 bg-gray-200 w-5/6" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <div className="h-4 bg-gray-200" />
        <div className="h-4 bg-gray-200 w-3/4" />
        <div className="h-4 bg-gray-200 w-2/4" />
      </div>
    </div>
  );
}

export function HomeBannerSkeleton() {
  return (
    <div className="h-[552px] lg:h-[346px] w-full  bg-gray-300 animate-pulse"></div>
  );
}

export function HomeCategoriesSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-32 bg-gray-200 animate-pulse"
        ></div>
      ))}
    </div>
  );
}

export function CarouselMainBlocksSkeletonWrapper() {
  return (
    <>
      <CarouselMainBlocksSkeleton />
      <CarouselMainBlocksSkeleton />
      <CarouselMainBlocksSkeleton />
    </>
  );
}

export function CarouselMainBlocksSkeleton() {
  return (
    <div className="flex flex-col space-y-3 w-full max-w-6xl mx-auto my-8 p-4">
      <div className="w-1/3 h-[25px] mx-4 bg-gray-300 animate-pulse"></div>
      <div className="flex overflow-hidden">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-3.5 w-1/2 lg:w-1/3 animate-pulse"
          >
            <div className="bg-white overflow-hidden">
              <div className="w-full h-[262px] lg:h-[408px] bg-gray-300 animate-pulse"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 animate-pulse w-2/3"></div>
                <div className="h-4 bg-gray-300 animate-pulse w-1/3 mt-2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TODO
export function ContactDetailsSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
