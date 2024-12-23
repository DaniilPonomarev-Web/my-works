'use client';

import { useState } from 'react';
import AddressAutocomplete from './address-autocomplete'; // Предполагается, что этот компонент предоставляет автозаполнение

interface AddressFormProps {
  errors?: Record<string, string[]>;
}

interface AddressSuggestion {
  city: string;
  street: string;
  house: string;
  apartment: string;
}

export default function AddressForm({ errors }: AddressFormProps) {
  const [city, setCity] = useState<string>('');
  const [country] = useState<string>('Россия'); // Страна фиксирована
  const [street, setStreet] = useState<string>('');
  const [home, setHome] = useState<string>('');
  const [apartment, setApartment] = useState<string>('');

  // Простейший парсер адреса
  const parseAddress = (address: string) => {
    const addressParts = address.split(',').map((part) => part.trim());
    if (addressParts.length < 3) return;

    // Пример формата: "г Екатеринбург, ул Малышева, соор 34, кв 5"
    const cityPart = addressParts[0].replace(/^г /, '');
    const streetPart = addressParts[1].replace(/^ул /, '');
    const housePart = addressParts[2].replace(/^соор /, '');
    const apartmentPart = addressParts[3]?.replace(/^кв /, '');

    setCity(cityPart);
    setStreet(streetPart);
    setHome(housePart);
    setApartment(apartmentPart || '');
  };

  const handleAddressChange = (suggestion: { value: string }) => {
    parseAddress(suggestion.value);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Адрес для доставки</h3>

      <div className="mb-4">
        <input
          placeholder="Страна *"
          type="text"
          id="country"
          name="country"
          value={country}
          className="mt-1 block w-full disabled px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          readOnly
        />
        <div id="country-error" aria-live="polite" aria-atomic="true">
          {errors?.['addresses.country'] &&
            errors['addresses.country'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <AddressAutocomplete onChange={handleAddressChange} />
        <div id="city-error" aria-live="polite" aria-atomic="true">
          {errors?.['addresses.city'] &&
            errors['addresses.city'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="Город *"
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="city-error" aria-live="polite" aria-atomic="true">
          {errors?.['addresses.city'] &&
            errors['addresses.city'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="Улица *"
          type="text"
          id="street"
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="street-error" aria-live="polite" aria-atomic="true">
          {errors?.['addresses.street'] &&
            errors['addresses.street'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <input
            placeholder="Дом *"
            type="text"
            id="home"
            name="home"
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          <div id="home-error" aria-live="polite" aria-atomic="true">
            {errors?.['addresses.home'] &&
              errors['addresses.home'].map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="w-1/3">
          <input
            placeholder="Кв./Офис *"
            type="text"
            id="apartmentORoffice"
            name="apartmentORoffice"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
          <div
            id="apartmentORoffice-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {errors?.['addresses.apartmentORoffice'] &&
              errors['addresses.apartmentORoffice'].map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
