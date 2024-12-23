'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { register } from '../../lib/actions';
import { ButtonLogin } from '../button';
import PersonalDataForm from './personal-data-form';
import CompanyDetailsForm from './company-details-form';
import AddressForm from './address-form';

export default function RegisterForm() {
  const initialState = { success: false, message: null, errors: null };
  const [state, dispatch] = useFormState(register, initialState);

  return (
    <form
      action={dispatch}
      className="max-w-md mx-auto min-w-[40vh] mt-8 p-6 bg-white shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Регистрация</h2>

      <PersonalDataForm errors={state?.errors} />
      <CompanyDetailsForm errors={state?.errors} />
      {/* <AddressForm errors={state?.errors} /> */}
      {state.errors?.global && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded-md">
          {state.errors.global}
        </div>
      )}
      {state.success && !state.errors && (
        <div className="mb-4 p-4 text-black bg-green-100 border border-green-200 rounded-md">
          Вы успешно зарегистрированы!
        </div>
      )}
      <RegisterButton />
      <AuthButton />
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return <ButtonLogin aria-disabled={pending}>Регистрация</ButtonLogin>;
}

function AuthButton() {
  return (
    <div className="flex justify-center">
      <Link href="/login" className="">
        <p className="mt-6 text-sm">Авторизация</p>
      </Link>
    </div>
  );
}
