import React from 'react';

const ProductCardSkeleton = () => (
  <div className="w-full flex flex-col items-center justify-start min-h-screen px-2 sm:px-0">
    {/* Скелетон для хлебных крошек */}
    <div className="w-full max-w-6xl mx-auto mb-6">
      <div className="animate-pulse h-6 bg-gray-200 rounded-md mb-4"></div>
    </div>

    {/* Основной контент */}
    <div className="w-full max-w-6xl mx-auto mb-6">
      <div className="animate-pulse flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2 bg-gray-200 h-80 rounded-lg"></div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="h-12 bg-gray-200 rounded-md"></div>
          <div className="h-6 bg-gray-200 rounded-md"></div>
          <div className="h-6 bg-gray-200 rounded-md"></div>
          <div className="h-6 bg-gray-200 rounded-md"></div>
          <div className="h-6 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>

    {/* Скелетон для вкладок */}
    <div className="w-full max-w-6xl mx-auto">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded-md"></div>
        <div className="h-6 bg-gray-200 rounded-md"></div>
        <div className="h-6 bg-gray-200 rounded-md"></div>
        <div className="h-6 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;
