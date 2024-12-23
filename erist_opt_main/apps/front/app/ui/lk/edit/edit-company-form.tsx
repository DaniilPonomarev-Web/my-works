// import React, { useState } from 'react';
// import EditCompanyForm from './edit/edit-company-form';

// export default function CompanyInfoForm({ company }: { company: any }) {
//   const [isEditing, setIsEditing] = useState(false);

//   const handleClose = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Информация о компании</h2>
//       {isEditing ? (
//         <EditCompanyForm company={company} onClose={handleClose} />
//       ) : (
//         <div className="flex flex-col gap-4">
//           <div className="w-full">
//             <label className="block text-gray-700">Наименование компании</label>
//             <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//               {company.name}
//             </p>
//           </div>

//           <div className="w-full">
//             <label className="block text-gray-700">Юридический адрес</label>
//             <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//               {company.urAddress}
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-gray-700">ИНН</label>
//               <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//                 {company.inn}
//               </p>
//             </div>

//             <div className="w-full">
//               <label className="block text-gray-700">ОГРН(-ИП)</label>
//               <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//                 {company.ogrn ?? '-'}
//               </p>
//             </div>

//             <div className="w-full">
//               <label className="block text-gray-700">КПП</label>
//               <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//                 {company.kpp ?? '-'}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-gray-700">Наименование банка</label>
//               <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//                 {company.bankName}
//               </p>
//             </div>

//             <div className="w-full">
//               <label className="block text-gray-700">БИК банка</label>
//               <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//                 {company.bikBank}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="w-full">
//               <label className="block text-gray-700">Расчетный счет</label>
//               <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//                 {company.checkingAccount}
//               </p>
//             </div>

//             <div className="w-full">
//               <label className="block text-gray-700">
//                 Корреспондентский счет
//               </label>
//               <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
//                 {company.correspondentAccount}
//               </p>
//             </div>
//           </div>

//           <div className="col-span-2 flex justify-end mt-4">
//             <button
//               className="rounded-md bg-neutral-950 text-white w-full sm:w-1/3 hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
//               onClick={() => setIsEditing(true)}
//             >
//               Редактировать
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { useToast } from '@erist-opt/shadcn/components/ui/use-toast';
import { updateCompany } from '../../../lib/actions';
import { Button } from '../../button';

type EditCompanyFormProps = {
  company: {
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    urAddress: string;
    bankName: string;
    bikBank: string;
    checkingAccount: string;
    correspondentAccount: string;
  };
  // onClose: () => void;
};

export default function EditCompanyForm({
  company,
}: // onClose,
EditCompanyFormProps) {
  const { toast } = useToast();
  const initialState = { success: false, message: null, errors: null } as any;
  const [state, dispatch] = useFormState(updateCompany, initialState);

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
    <form action={dispatch} className="flex flex-col gap-4">
      <div>
        <label className="block text-gray-700">Наименование компании *</label>
        <input
          type="text"
          name="name"
          className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
          aria-describedby="name-error"
          defaultValue={company.name}
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
      <div>
        <label className="block text-gray-700">Юридический адрес *</label>
        <input
          type="text"
          name="urAddress"
          className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
          aria-describedby="urAddress-error"
          defaultValue={company.urAddress}
        />
        <div id="urAddress-error" aria-live="polite" aria-atomic="true">
          {state.errors?.urAddress &&
            state.errors.urAddress.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-gray-700">ИНН *</label>
          <input
            type="text"
            name="inn"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            aria-describedby="inn-error"
            defaultValue={company.inn}
          />
          <div id="inn-error" aria-live="polite" aria-atomic="true">
            {state.errors?.inn &&
              state.errors.inn.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700">КПП</label>
          <input
            type="text"
            name="kpp"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            aria-describedby="kpp-error"
            defaultValue={company.kpp}
          />
          <div id="kpp-error" aria-live="polite" aria-atomic="true">
            {state.errors?.kpp &&
              state.errors.kpp.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700">ОГРН(-ИП)*</label>
          <input
            type="text"
            name="ogrn"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            aria-describedby="ogrn-error"
            defaultValue={company.ogrn}
          />
          <div id="kpp-error" aria-live="polite" aria-atomic="true">
            {state.errors?.ogrn &&
              state.errors.ogrn.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Название банка*</label>
          <input
            type="text"
            name="bankName"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            aria-describedby="urAddress-error"
            defaultValue={company.bankName}
          />
          <div id="urAddress-error" aria-live="polite" aria-atomic="true">
            {state.errors?.bankName &&
              state.errors.bankName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700">БИК банка*</label>
          <input
            type="text"
            name="bikBank"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            aria-describedby="urAddress-error"
            defaultValue={company.bikBank}
          />
          <div id="urAddress-error" aria-live="polite" aria-atomic="true">
            {state.errors?.bikBank &&
              state.errors.bikBank.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Расчетный счет*</label>
          <input
            type="text"
            name="checkingAccount"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            aria-describedby="urAddress-error"
            defaultValue={company.checkingAccount}
          />
          <div id="urAddress-error" aria-live="polite" aria-atomic="true">
            {state.errors?.checkingAccount &&
              state.errors.checkingAccount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Корреспондентский счет*</label>
          <input
            type="text"
            name="correspondentAccount"
            className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full"
            aria-describedby="urAddress-error"
            defaultValue={company.correspondentAccount}
          />
          <div id="urAddress-error" aria-live="polite" aria-atomic="true">
            {state.errors?.correspondentAccount &&
              state.errors.correspondentAccount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-end space-x-2">
        <SaveButton />
        {/* <CancelButton onClose={onClose} /> */}
      </div>
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
