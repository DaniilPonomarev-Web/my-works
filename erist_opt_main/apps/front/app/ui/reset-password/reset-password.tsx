'use client';

import { useState } from 'react';
import {
  resetPasswordFirst,
  resetPasswordSecond,
  resetPasswordThree,
} from '../../lib/actions';
import { ButtonLogin } from '../button';
import { toast } from '@erist-opt/shadcn/components/ui/use-toast';
import Link from 'next/link';
import { Warnes } from 'next/font/google';

export default function ResetPasswordForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmitFirstStep = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);

    const emailValue = formData.get('email') as string;

    try {
      const response = await resetPasswordFirst({}, { email: emailValue });
      if (response?.success === false) {
        setError(response.message);
      } else {
        setEmail(emailValue);
        setStep(2);
        setError(null);
      }
    } catch (err) {
      setError('Произошла ошибка при отправке запроса.');
    } finally {
      setPending(false);
    }
  };

  const handleSubmitSecondStep = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);

    const codeValue = formData.get('code') as string;

    try {
      const response = await resetPasswordSecond(
        {},
        { email, code: codeValue }
      );
      console.warn(response);

      if (response?.success === false) {
        setError(response.message);
      } else {
        setCode(codeValue);
        setStep(3);
        setError(null);
      }
    } catch (err) {
      setError('Упс... Повторите попытку еще раз.');
    } finally {
      setPending(false);
    }
  };

  const handleSubmitThirdStep = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);

    const newPassword = formData.get('newPassword') as string;

    try {
      const response = await resetPasswordThree(
        {},
        { email, code, newPassword }
      );
      if (response?.success === false) {
        setError(response.message);
      }
      console.log('90');

      toast({
        title: 'Пароль успешно изменен',
        duration: 3000,
      }); //TODO front не работает
      setError(null);
    } catch (err) {
      setError('Произошла ошибка при отправке запроса.');
    } finally {
      setPending(false);
      setError(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Восстановление пароля</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {step === 1 && (
        <form onSubmit={handleSubmitFirstStep}>
          <div className="mb-4">
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <ResetPasswordButton pending={pending} />
          <AuthButton />
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitSecondStep}>
          <div className="mb-4">
            <input
              placeholder="Код из письма"
              type="number"
              id="code"
              name="code"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <ResetPasswordButton pending={pending} />
          <AuthButton />
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmitThirdStep}>
          <div className="mb-4">
            <input
              placeholder="Новый пароль"
              type="password"
              id="newPassword"
              name="newPassword"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <ResetPasswordButton pending={pending} />
          <AuthButton />
        </form>
      )}
    </div>
  );
}

function ResetPasswordButton({ pending }: { pending: boolean }) {
  return <ButtonLogin aria-disabled={pending}>Продолжить</ButtonLogin>;
}
function AuthButton() {
  return (
    <div className="flex justify-center">
      <Link href="/login" className="">
        <p className="mt-6 text-sm">Отмена</p>
      </Link>
    </div>
  );
}
