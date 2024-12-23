'use client';

import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { useToast } from '@erist-opt/shadcn/components/ui/use-toast';

import { changePassword } from '../../lib/actions';
import { Button } from '../button';

export default function ChangePasswordForm() {
  const { toast } = useToast();
  const initialState = { success: false, message: null, errors: null } as any;
  const [state, dispatch] = useFormState(changePassword, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: state.message,
        duration: 1500,
      });
    }
  }, [state.message, state.resetKey, state.success, toast]);

  return (
    <div className="px-1 md:px-4">
      <h2 className="text-lg font-bold mb-2 md:text-2xl">Изменение пароля</h2>
      <form action={dispatch} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700">Текущий пароль</label>
          <input
            type="password"
            name="currentPassword"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            autoComplete="current-password"
            aria-describedby="currentPassword-error"
            required
          />
          <div id="currentPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.currentPassword &&
              state.errors.currentPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Новый пароль</label>
          <input
            type="password"
            name="newPassword"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            autoComplete="new-password"
            aria-describedby="newPassword-error"
            required
          />
          <div id="newPassword-error" aria-live="polite" aria-atomic="true">
            {state.errors?.newPassword &&
              state.errors.newPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700">
            Подтвердите новый пароль
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            autoComplete="new-password"
            aria-describedby="confirmNewPassword-error"
            required
          />
          <div
            id="confirmNewPassword-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.confirmNewPassword &&
              state.errors.confirmNewPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="col-span-1 flex justify-start">
          <ChangePassButton />
        </div>
      </form>
    </div>
  );
}

function ChangePassButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
      aria-disabled={pending}
    >
      Изменить пароль
    </Button>
  );
}
