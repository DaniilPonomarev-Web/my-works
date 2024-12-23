import Link from 'next/link';
import React from 'react';

interface CategoryTileProps {
  category: any;
  onClose: void;
}

const CategoryTile: React.FC<CategoryTileProps> = ({
  category,
  onClose,
}: any) => {
  return (
    <Link
      href={`/category/${category.id}`}
      className="flex items-center border border-gray-300  p-2 mb-2 hover:shadow"
      onClick={onClose}
    >
      <div className="ml-2 flex-grow">
        <div className="font-bold">
          {category.descriptions?.map((desc: any) => desc.name).join(', ')}
        </div>
      </div>
    </Link>
  );
};

export default CategoryTile;
