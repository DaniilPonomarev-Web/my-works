'use client';

import { useState } from 'react';

const AddressSelector = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleAddressChange = (address: any) => {
    setSelectedAddress(address);
    setIsOpen(false);
  };

  return (
    <div>
      {addresses.length > 1 && (
        <div className="relative mb-4">
          <label htmlFor="addressSelect" className="block mb-2 text-gray-700">
            Выберите адрес:
          </label>
          <div
            className="p-2 border border-gray-300 w-full rounded-md shadow-sm cursor-pointer bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex justify-between items-center">
              <span>
                {selectedAddress.city}, {selectedAddress.street}{' '}
                {selectedAddress.home}, {selectedAddress.apartmentORoffice}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          {isOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-2xl mt-1">
              {addresses.map((addr: any) => (
                <li
                  key={addr.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAddressChange(addr)}
                >
                  {addr.city}, {addr.street} {addr.home},{' '}
                  {addr.apartmentORoffice}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {addresses.length === 0 && (
        <div>
          <div className="flex space-x-4">
            <div className="cursor-default mt-1 w-1/2">
              <label className="block text-gray-700">Страна</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                {selectedAddress.country}
              </p>
            </div>
            <div className="cursor-default mt-1 w-1/2">
              <label className="block text-gray-700">Город</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                {selectedAddress.city}
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="cursor-default mt-1 w-1/3">
              <label className="block text-gray-700">Улица</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                {selectedAddress.street}
              </p>
            </div>
            <div className="cursor-default mt-1 w-1/3">
              <label className="block text-gray-700">Дом</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                {selectedAddress.home}
              </p>
            </div>
            <div className="cursor-default mt-1 w-1/3">
              <label className="block text-gray-700">Квартира/Офис</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                {selectedAddress.apartmentORoffice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
