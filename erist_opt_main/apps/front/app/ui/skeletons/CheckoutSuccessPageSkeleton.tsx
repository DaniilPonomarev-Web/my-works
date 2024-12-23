import { HeartIcon } from '@heroicons/react/24/outline';

export default function CheckoutSuccessPageSkeleton() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen gap-4 text-center animate-pulse">
      <HeartIcon width={45} fill="gray" />
      <p className="text-sm bg-gray-300 h-4 w-48"></p>
      <p className="font-medium text-4xl bg-gray-300  h-10 w-72"></p>
      <p className="text-xl bg-gray-300 h-6 w-64"></p>
      <p className="text-xl bg-gray-300 h-6 w-80"></p>
    </div>
  );
}
