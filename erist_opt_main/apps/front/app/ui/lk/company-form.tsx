import React, { useState } from 'react';
import EditCompanyForm from './edit/edit-company-form';

export default function CompanyInfoForm({ company }: { company: any }) {
  const [isEditing, setIsEditing] = useState(true);

  // const handleClose = () => {
  //   setIsEditing(false);
  // };

  return (
    <div className="px-1 md:px-4">
      <h2 className="text-lg font-bold mb-2 md:text-2xl">
        Информация о компании
      </h2>
      {isEditing ? (
        <EditCompanyForm company={company} />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <label className="block text-gray-700">Наименование компании</label>
            <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
              {company.name}
            </p>
          </div>

          <div className="w-full">
            <label className="block text-gray-700">Юридический адрес</label>
            <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
              {company.urAddress}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-gray-700">ИНН</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
                {company.inn}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-gray-700">ОГРН(-ИП)</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
                {company.ogrn ?? '-'}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-gray-700">КПП</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
                {company.kpp ?? '-'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-gray-700">Наименование банка</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
                {company.bankName}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-gray-700">БИК банка</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
                {company.bikBank}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-gray-700">Расчетный счет</label>
              <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
                {company.checkingAccount}
              </p>
            </div>

            <div className="w-full">
              <label className="block text-gray-700">
                Корреспондентский счет
              </label>
              <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm w-full cursor-default">
                {company.correspondentAccount}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              className=" bg-neutral-950 text-white w-full sm:w-1/3 hover:bg-neutral-50 hover:text-black active:bg-neutral-200 active:text-black py-2 px-4 mt-4"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
