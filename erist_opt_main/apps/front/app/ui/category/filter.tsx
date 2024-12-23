'use client';
import React, { useState, useEffect, useRef, useId } from 'react';
import { Range } from 'react-range';
import { useOnClickOutside } from 'usehooks-ts';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const Filter = ({ options }: any) => {
  const ref = useRef(null);

  const rangeId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState([1000, 30000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const sizes =
    options.find((option: any) => option.optionName === 'Размер')?.values || [];
  const colors =
    options.find((option: any) => option.optionName === 'Цвет')?.values || [];
  const selectRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleApplyFilter = () => {
    setIsOpen(false);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('priceFrom', values[0].toString());
    params.set('priceTo', values[1].toString());
    if (selectedSizes.length > 0) {
      params.set('sizes', selectedSizes.join(','));
    } else {
      params.delete('sizes');
    }
    if (selectedColors.length > 0) {
      params.set('colors', selectedColors.join(','));
    } else {
      params.delete('colors');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleResetFilter = () => {
    setValues([3000, 12000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setIsOpen(false);
    const params = new URLSearchParams(searchParams);
    params.delete('priceFrom');
    params.delete('priceTo');
    params.delete('sizes');
    params.delete('colors');
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const priceFrom = params.get('priceFrom');
    const priceTo = params.get('priceTo');
    const sizes = params.get('sizes');
    const colors = params.get('colors');

    if (priceFrom && priceTo) {
      setValues([Number(priceFrom), Number(priceTo)]);
    }

    if (sizes) {
      setSelectedSizes(sizes.split(','));
    }

    if (colors) {
      setSelectedColors(colors.split(','));
    }

    // document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchParams]);

  return (
    <div
      className="relative w-1/2 text-end my-2 cursor-pointer"
      ref={selectRef}
    >
      <FunnelIcon
        width={24}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between text-gray-700 hover:bg-gray-50 focus:outline-none"
      />

      {isOpen && (
        <div
          ref={ref}
          className="text-start absolute mt-1 w-full bg-white shadow-8xl z-10 p-4"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Фильтр по цене:
            </label>
            <div className="my-4">
              <Range
                key={rangeId}
                step={100}
                min={1000}
                max={30000}
                values={values}
                onChange={(newValues) => setValues(newValues)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      backgroundColor: '#ccc',
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ index, props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '16px',
                      width: '16px',
                      backgroundColor: '#f261a5',
                      borderRadius: '50%',
                      boxShadow: '0px 2px 6px #AAA',
                    }}
                  />
                )}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs sm:text-lg whitespace-nowrap">
                  {values[0]} ₽
                </span>
                <span className="text-xs sm:text-lg whitespace-nowrap">
                  {values[1]} ₽
                </span>
              </div>
            </div>
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Фильтр по размерам:
            </label>
            <div className="flex flex-wrap gap-2 my-2">
              {sizes.map((size: any) => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="form-checkbox h-4 w-4 text-black-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-xs sm:text-lg text-gray-700">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </div> */}
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Фильтр по цветам:
            </label>
            <div className="flex flex-wrap gap-2 my-2">
              {colors.map((color: any) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="hidden"
                  />
                  <span
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                      selectedColors.includes(color)
                        ? 'border-black'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      const updatedColors = selectedColors.includes(color)
                        ? selectedColors.filter((c) => c !== color)
                        : [...selectedColors, color];
                      setSelectedColors(updatedColors);
                      handleColorChange(color);
                    }}
                  ></span>
                </label>
              ))}
            </div>
          </div> */}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-2">
            <button
              onClick={handleApplyFilter}
              className="bg-neutral-950 text-white hover:bg-neutral-50 
                      hover:text-black active:bg-neutral-200 
                      active:text-black py-2 px-4 mt-4 sm:mt-0
                      text-xs sm:text-lg
                      "
            >
              Применить
            </button>
            <button
              onClick={handleResetFilter}
              className="bg-neutral-200 text-black hover:bg-neutral-950
                      hover:text-white active:bg-neutral-950 
                      active:text-white py-2 px-4 mt-1 sm:mt-0
                      text-xs sm:text-lg
                      "
            >
              Сбросить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
