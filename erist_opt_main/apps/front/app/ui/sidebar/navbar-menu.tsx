'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Category } from '../../../interfaces/menu.interface';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function NavbarMenu({ categories }: { categories: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Управление отображением меню
  const [currentLevel, setCurrentLevel] = useState<Category[] | null>(
    categories
  );
  const [parentCategory, setParentCategory] = useState<Category | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // Для контроля анимации
  const [animationDirection, setAnimationDirection] = useState<'in' | 'out'>(
    'in'
  ); // Направление анимации

  const menuTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
      menuTimeout.current = null;
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 200); // Задержка перед закрытием (200 мс)
  };

  const toggleNavbarMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category: Category) => {
    if (category.children && category.children.length > 0) {
      setAnimationDirection('out'); // Переход внутрь
      setIsTransitioning(true);
      setTimeout(() => {
        setParentCategory(category);
        setCurrentLevel(category.children);
        setIsTransitioning(false);
      }, 100); // Длительность анимации
    }
  };

  const goBack = () => {
    setAnimationDirection('out'); // Переход назад
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentLevel(categories);
      setParentCategory(null);
      setIsTransitioning(false);
    }, 100); // Длительность анимации
  };

  return (
    <div className="relative w-full hidden md:block">
      {/* Основное горизонтальное меню */}
      <ul className="flex space-x-4  p-4 text-black">
        {/* Каталог */}
        <li
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-blue-400">Каталог</span>

          {/* Выпадающее меню */}
          {isMenuOpen && (
            <div
              className={`absolute left-0 top-full mt-2 w-auto min-w-[80vw] max-w-[90vw] bg-white shadow-lg text-gray-800 z-50 flex flex-wrap transition-transform ${
                isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`p-4 transform transition-transform duration-300 ${
                  isTransitioning
                    ? animationDirection === 'in'
                      ? 'translate-x-[-100%]'
                      : 'translate-x-[100%]'
                    : 'translate-x-0'
                }`}
              >
                {/* Кнопка возврата */}
                {parentCategory && (
                  <button
                    className="flex items-center text-gray-500 hover:text-black mb-4 "
                    onClick={goBack}
                  >
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    <p className="pt-1">Назад</p>
                  </button>
                )}

                {/* Контент категорий */}
                <ul className="flex flex-wrap gap-4">
                  {currentLevel &&
                    currentLevel.map((category) => (
                      <li
                        key={category.id}
                        className="w-[24%] min-w-[24%] max-w-[24%] flex-shrink-0"
                      >
                        {category.children.length > 0 ? (
                          <button
                            onClick={() => handleCategoryClick(category)}
                            className="p-1 flex justify-between items-center w-full text-left text-gray-700 hover:text-black"
                          >
                            <span>
                              {category.descriptions[0]?.name || 'Без названия'}
                            </span>
                            <ChevronRightIcon className=" h-5 w-5 ml-8 mr-auto" />
                          </button>
                        ) : (
                          <Link
                            className="block p-1 text-gray-700 hover:text-black"
                            href={`/category/${category.id}`}
                            onClick={toggleNavbarMenu}
                          >
                            <p>
                              {category.descriptions[0]?.name || 'Без названия'}
                            </p>
                          </Link>
                        )}
                      </li>
                    ))}

                  {!parentCategory && (
                    <li className="w-full">
                      <Link
                        href={`/category-all-products?page=1&sort=price_desc`}
                        onClick={toggleNavbarMenu}
                      >
                        <p className="block mt-2 text-left font-semibold text-red hover:underline">
                          Показать все товары
                        </p>
                      </Link>
                    </li>
                  )}

                  {/* Кнопка "Показать все" */}
                  {parentCategory && (
                    <li className="w-full">
                      <Link
                        href={`/category/${parentCategory.id}`}
                        onClick={toggleNavbarMenu}
                      >
                        <p className="block mt-2 text-left font-semibold text-red hover:underline">
                          Смотреть все в{' '}
                          {parentCategory.descriptions[0].name || ''}
                        </p>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </li>

        {/* Другие элементы горизонтального меню */}
        <li>
          <Link href={'/information'}> Информация </Link>
        </li>

        <li>
          <Link href={'/information/a181e729-572c-42b2-845c-ac1e8e6afab3'}>
            {' '}
            Контакты{' '}
          </Link>
        </li>
      </ul>
    </div>
  );
}
