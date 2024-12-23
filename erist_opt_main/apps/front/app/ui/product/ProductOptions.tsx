'use client';

import React, { useEffect } from 'react';
import { groupOptions } from '../../lib/utils';

export default function ProductOptions({ id, options, onOptionChange }: any) {
  const opts = groupOptions(id, options);

  useEffect(() => {
    // Установка первой доступной опции по умолчанию
    opts.forEach((option) => {
      const availableOption = option.components.find((c) => c.quantity > 0);
      if (availableOption) {
        onOptionChange(availableOption.id);
      }
    });
  }, []);

  const handleChange = (event: any) => {
    onOptionChange(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-4">
      {opts?.map((option) => (
        <div key={option.id} className="flex flex-col space-y-2">
          <span className="text-base md:text-lg font-semibold">
            {option.name}:
          </span>
          <div className="flex">
            {option?.components?.map((c, idx) => (
              <div
                key={c.id}
                className={`flex items-center ${
                  idx !== 0 ? 'ml-4' : ''
                } cursor-pointer `}
              >
                <input
                  id={c.id}
                  type="radio"
                  name={option.alias}
                  value={c.id}
                  className="hidden peer"
                  onChange={handleChange}
                  disabled={c.quantity === 0} // Отключаем опцию если ее количество 0
                  defaultChecked={idx === 0 && c.quantity > 0} // Выбираем первую доступную опцию
                />
                {!c.href || !c.colorCode ? (
                  <label
                    htmlFor={c.id}
                    className={`w-10 h-10 p-4 shadow-2xl rounded-full border flex items-center justify-center cursor-pointer 
                    ${
                      c.quantity === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-400 peer-checked:bg-black peer-checked:text-white hover:bg-black hover:text-white'
                    }
                    ${c.text.length > 2 ? 'text-xs' : 'text-sm'}
                  `}
                    title={c.quantity === 0 ? 'Нет в наличии' : ''}
                  >
                    {c.text}
                  </label>
                ) : (
                  <a
                    className={`w-10 h-10 p-4 shadow-2xl rounded-full border flex items-center justify-center cursor-pointer 
                    ${c.text.length > 2 ? 'text-xs' : 'text-sm'}
                  `}
                    href={c.href}
                    style={{
                      backgroundColor: c.href
                        ? c.colorCode || 'transparent'
                        : 'transparent', // Применяем colorCode только если есть ссылка
                    }}
                    rel="noopener noreferrer"
                  ></a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
