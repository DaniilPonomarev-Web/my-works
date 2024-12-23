import React, { useState, useEffect } from 'react';
import { fetchSuggestionsPersonal } from '../../lib/dadata';
import debounce from 'lodash/debounce';
import InputMask from 'react-input-mask';
import { usePasswordValidation } from './usePasswordValidation';

export default function PersonalDataForm({ errors }: { errors?: any }) {
  const [emailQuery, setEmailQuery] = useState('');
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedFetchSuggestions = debounce(async (query: string) => {
    setLoading(true);
    try {
      const suggestions = await fetchSuggestionsPersonal(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/email',
        query
      );
      setEmailSuggestions(suggestions.map((s) => s.value));
    } catch {
      setEmailSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (emailQuery.length > 2) {
      debouncedFetchSuggestions(emailQuery);
    } else {
      setEmailSuggestions([]);
    }
  }, [emailQuery]);

  const handleSuggestionClick = (suggestion: string) => {
    setEmailQuery(suggestion);
    setEmailSuggestions([]);
  };

  const {
    password,
    confirmPassword,
    isValid,
    isMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordValidation();

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Личные данные</h3>
      <div className="mb-4">
        <input
          placeholder="Имя *"
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {errors?.['name'] &&
            errors['name'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <InputMask
          mask="89999999999"
          id="phone"
          name="phone"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Телефон *"
          required
        ></InputMask>
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          {errors?.['phone'] &&
            errors['phone'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      {/* <div className="mb-4">
        <input
          placeholder="Телефон *"
          type="text"
          id="phone"
          name="phone"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          {errors?.['phone'] &&
            errors['phone'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
       */}

      {/* <div className="mb-4">
        <input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {errors?.['email'] &&
            errors['email'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div> */}

      <div className="mb-4">
        <input
          placeholder="Email"
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
        {/* {loading && <p className="text-gray-500">Загрузка...</p>} */}
        {emailSuggestions.length > 0 && (
          <ul className="mt-2 border border-gray-300">
            {emailSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {errors?.['email'] &&
            errors['email'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="Пароль *"
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          minLength={8}
          maxLength={20}
          onChange={handlePasswordChange}
          value={password}
          required
        />

        <div id="password-error" aria-live="polite" aria-atomic="true">
          {!isValid && (
            <p className="mt-2 text-sm text-red-500">
              Пароль должен быть длиной от 8 до 20 символов и содержать
              заглавные и строчные буквы, цифры и специальные символы(!@#$%^&*).
            </p>
          )}
          {errors?.['password'] &&
            errors['password'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <input
          placeholder="Подтвердите пароль *"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          minLength={8}
          maxLength={20}
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
          {!isMatch && (
            <p className="mt-2 text-sm text-red-500">Пароли не совпадают.</p>
          )}
          {errors?.['confirmPassword'] &&
            errors['confirmPassword'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
