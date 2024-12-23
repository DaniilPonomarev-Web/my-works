'use client';

import Link from 'next/link';
import React from 'react';

interface Category {
  id: string;
  descriptions: { name: string }[];
}

interface Props {
  categories: Category[];
}

const ChildrenCategories: React.FC<Props> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          className={`flex items-center justify-center text-center p-4  text-gray-800 font-semibold ${
            index % 3 === 0
              ? 'bg-pink-500 border border-black'
              : index % 3 === 1
              ? 'bg-slate-800 text-white border border-black'
              : 'bg-white-200 border-black border'
          }`}
          style={{ minHeight: '100px' }}
          href={`/category/${category.id}`}
        >
          {category.descriptions[0].name}
        </Link>
      ))}
    </div>
  );
};

export default ChildrenCategories;
