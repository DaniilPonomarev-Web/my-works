'use client';

import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Category } from '../../../interfaces/menu.interface';
import Link from 'next/link';
import { useState } from 'react';
import SvgBurger from '../Icons/Burger';

export default function Navigation({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const renderCategories = (categories: Category[]) => {
    return categories.map((category) => (
      <div key={category.id} className="ml-4 md:hidden">
        <div className="flex items-center justify-between p-2 text-left font-semibold text-gray-700 hover:bg-gray-200">
          {category.children && category.children.length > 0 ? (
            <button
              className="w-full text-left flex items-center justify-between"
              onClick={() => toggleCategory(category.id)}
            >
              {category.descriptions[0].name}
              {openCategories[category.id] ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>
          ) : (
            <Link href={`/category/${category.id}`} onClick={closeSidebar}>
              <p>{category.descriptions[0].name}</p>
            </Link>
          )}
        </div>
        {openCategories[category.id] &&
          category.children &&
          category.children.length > 0 && (
            <div className="ml-4">
              {renderCategories(category.children)}
              <Link href={`/category/${category.id}`} onClick={closeSidebar}>
                <p className="block mt-2 p-2 text-left font-semibold text-red hover:underline">
                  Показать все
                </p>
              </Link>
            </div>
          )}
      </div>
    ));
  };

  return (
    <div>
      {isOpen ? (
        <XMarkIcon
          className="h-6 w-6 cursor-pointer "
          aria-hidden="true"
          onClick={toggleSidebar}
        />
      ) : (
        <SvgBurger
          onClick={toggleSidebar}
          className="cursor-pointer md:hidden"
        />
      )}
      <aside
        className={`fixed top-0 left-0 w-64 bg-gray-100 shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40 h-screen overflow-y-auto`}
      >
        <nav className="space-y-2 p-4 mt-8">{renderCategories(categories)}</nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
