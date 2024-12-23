'use client';

import { useState, ChangeEvent } from 'react';
import { fetchAddressSuggestions } from '../../lib/dadata';

interface Suggestion {
  value: string;
}

interface AddressAutocompleteProps {
  onChange: (suggestion: Suggestion) => void;
}

export default function AddressAutocomplete({
  onChange,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);

    if (value.length > 2) {
      const fetchedSuggestions = await fetchAddressSuggestions(value);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.value);
    setSuggestions([]);
    if (onChange) onChange(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Введите адрес или заполните поля ниже"
      />
      {suggestions.length > 0 && (
        <ul className="border mt-2">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.value}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
