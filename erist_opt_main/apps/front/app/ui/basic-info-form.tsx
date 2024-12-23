import React, { useState } from 'react';
// import { CheckCircleIcon } from '@heroicons/react/24/solid';
import EditBasicInfoForm from './lk/edit/edit-basic-info-form';
import { signout } from '../lib/actions';

export default function BasicInfoForm({
  user,
}: {
  user: { name: string; phone: string; email: string };
}) {
  const [isEditing, setIsEditing] = useState(false);

  // const handleClose = () => {
  //   setIsEditing(false);
  // };

  const handleSignOut = () => {
    signout();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Основная информация</h2>
      {/*onClose={handleClose} */}
      {isEditing ? (
        <EditBasicInfoForm user={user} />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <label className="block text-gray-700">Имя</label>
            <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
              {user.name}
            </p>
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Телефон</label>
            <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
              {user.phone}
            </p>
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Email</label>
            <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
              {user.email}
            </p>
          </div>
          {/* {user.agreement && (
            <div className="flex items-center space-x-2 bg-green-100 border border-green-200 rounded-lg p-4">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              <label className="block text-green-700 font-semibold text-lg">
                Договор подписан
              </label>
            </div>
          )} */}
          <div className="w-full flex justify-between mt-4 sm:mt-0 gap-3">
            <button
              className="bg-neutral-950 text-white w-full sm:w-1/3 hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>

            <button
              className="bg-white border-2 w-full sm:w-1/3 text-neutral-950  border-slate-950 hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
              onClick={() => handleSignOut()}
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
