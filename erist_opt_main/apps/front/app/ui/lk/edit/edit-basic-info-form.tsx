'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { useToast } from '@erist-opt/shadcn/components/ui/use-toast';

import { updateUser } from '../../../lib/actions';
import { Button } from '../../button';

export default function EditBasicInfoForm({
  user,
}: // onClose,
{
  user: { name: string; phone: string; email: string };
  // onClose: () => void;
}) {
  const { toast } = useToast();
  const initialState = { success: false, message: null, errors: null } as any;
  const [state, dispatch] = useFormState(updateUser, initialState);

  useEffect(() => {
    if (state.success) {
      // onClose();
      toast({
        title: state.message,
        duration: 1500,
      });
    }
  }, [state.message, state.resetKey, state.success, toast]); //onClose,

  return (
    <form action={dispatch} className="flex flex-col gap-4 px-1 md:px-4">
      <h2 className="text-lg font-bold mb-2 md:text-2xl">
        Основная информация
      </h2>

      <div className="w-full">
        <label className="block text-gray-700">Email</label>
        <input
          type="text"
          name="name"
          className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
          defaultValue={user.email}
          aria-describedby="name-error"
          readOnly
        />
      </div>
      <div className="w-full">
        <label className="block text-gray-700">Имя</label>
        <input
          type="text"
          name="name"
          className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
          defaultValue={user.name}
          aria-describedby="name-error"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="w-full">
        <label className="block text-gray-700">Телефон</label>
        <input
          type="text"
          name="phone"
          defaultValue={user.phone}
          className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
          aria-describedby="phone-error"
        />
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          {state.errors?.phone &&
            state.errors.phone.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="col-span-2 flex justify-end space-x-2">
        <SaveButton />
        {/* <CancelButton onClose={onClose} /> */}
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </form>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="rounded-none bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
      aria-disabled={pending}
    >
      Сохранить
    </Button>
  );
}

// function CancelButton({ onClose }: { onClose: () => void }) {
//   return (
//     <Button
//       className="rounded-none bg-neutral-950 text-white hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
//       onClick={onClose}
//     >
//       Отменить
//     </Button>
//   );
// }
