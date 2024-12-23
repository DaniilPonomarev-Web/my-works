'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useOnClickOutside } from 'usehooks-ts';

export default function SortOptions() {
  const ref = useRef(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    searchParams.get('sort') || 'dateAdded_desc'
  );

  const options = [
    { value: 'dateAdded_desc', label: 'Дата добавления (сначала новые)' },
    { value: 'dateAdded_asc', label: 'Дата добавления (сначала старые)' },
    { value: 'name_asc', label: 'Имя (А-Я)' },
    { value: 'name_desc', label: 'Имя (Я-А)' },
    { value: 'price_asc', label: 'Цена (по возрастанию)' },
    { value: 'price_desc', label: 'Цена (по убыванию)' },
  ];

  const handleSelect = (value: any) => {
    setSelectedOption(value);
    setIsOpen(false);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="relative w-1/2 text-start my-2" ref={ref}>
      <div
        className="flex space-x-4 items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AdjustmentsHorizontalIcon
          width={24}
          className="inline-flex justify-between shadow-sm "
        />
        <p className="text-xs w-1/2 whitespace-nowrap">
          {options.find((option) => option.value === selectedOption)?.label}
        </p>
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white shadow-8xl z-10">
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="sortOptions"
            className="max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                className={`text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${
                  selectedOption === option.value ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="font-normal block truncate sm:text-xs ">
                  {option.label}
                </span>
                {selectedOption === option.value && (
                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="black"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 7.707a1 1 0 00-1.414-1.414L9 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
