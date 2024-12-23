import React from 'react';

interface BannerCategoryProps {
  image: string;
}

export function BannerCategory( { image }: BannerCategoryProps) {
  return (

  <div className="w-full">
    <div className="hidden sm:block w-full">
      <img src={image} className="w-full h-auto" />
    </div>
    <div className="sm:hidden w-full">
      <img src={image} className="w-full h-auto" />
    </div>

  </div>

  );
}

