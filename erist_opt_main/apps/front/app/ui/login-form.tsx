'use client';

import { authenticate } from '../lib/actions';
import { ButtonLogin } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import PasswordInput from './password-input';

export default function LoginForm() {
  const initialState = {
    success: false,
    message: '',
    errors: null as null | { global: string },
  };
  const [state, dispatch] = useFormState(authenticate, initialState);

  useEffect(() => {
    if (state.success) {
      window.location.href = '/home';
      // const timer = setTimeout(() => {
      //   window.location.href = '/home';
      // }, 1500);

      // return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <form
      action={dispatch}
      className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Авторизация</h2>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Email"
          required
        />
      </div>
      {!state.success && (
        <div className="mb-4">
          <PasswordInput />
        </div>
      )}
      {state.errors?.global && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
          {state.errors.global}
        </div>
      )}
      {/* {state.success && !state.errors && (
        <div className="mb-4 p-4 text-black bg-green-100 border border-green-200 rounded-md">
          Авторизация успешна!
        </div>
      )} */}
      {!state.success && <LoginButton />}
      {!state.success && (
        <div className="flex-col text-center">
          <RegisterButton />
          <ResetPassword />
        </div>
      )}
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <ButtonLogin
      className="mt-4 w-full bg-neutral-950 hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black"
      aria-disabled={pending}
    >
      <span className="flex items-center">
        Вход <ArrowRightIcon className="ml-auto h-5 w-5 text-black text-sm" />
      </span>
    </ButtonLogin>
  );
}

function RegisterButton() {
  return (
    <Link href="/register">
      <p className="mt-6 text-sm ">Зарегистрироваться</p>
    </Link>
  );
}

function ResetPassword() {
  return (
    <Link href="/forget">
      <p className="mt-3 text-sm">Забыли пароль?</p>
    </Link>
  );
}
