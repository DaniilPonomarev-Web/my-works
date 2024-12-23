// import { CheckCircleIcon } from '@heroicons/react/24/outline';
// import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { getUserData } from '../../lib/actions';
import AddressSelectorForm from './address-selector-form';

export default async function ContactDetailsForm() {
  const user = await getUserData();
  const isAgreementSigned = user.whoIAm.agreement ? true : false;

  return (
    <div className="w-full md:w-1/2 p-4 md:order-0">
      <h2 className="text-xl font-semibold mb-4">Контактные данные</h2>
      {/* Контактные данные */}
      <div className="cursor-default mt-1">
        <label className="block text-gray-700">Имя: </label>
        <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
          {user.whoIAm.name}
        </p>
      </div>
      <div className="cursor-default mt-1">
        <label className="block text-gray-700">Телефон: </label>
        <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
          {user.whoIAm.phone}
        </p>
      </div>
      <div className="cursor-default mt-1">
        <label className="block text-gray-700">Email: </label>
        <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
          {user.whoIAm.email}
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Компания</h2>
      {/* Данные компании */}
      <div className="cursor-default mt-1">
        <label className="block text-gray-700">Наименование: </label>
        <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
          {user.whoIAm.company.name}
        </p>
      </div>
      <div className="cursor-default mt-1">
        <label className="block text-gray-700">Юридический адрес: </label>
        <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
          {user.whoIAm.company.urAddress}
        </p>
      </div>
      <div className="flex space-x-4">
        <div className="cursor-default mt-1 w-1/2">
          <label className="block text-gray-700">ИНН: </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
            {user.whoIAm.company.inn}
          </p>
        </div>
        <div className="cursor-default mt-1 w-1/2">
          <label className="block text-gray-700">КПП: </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
            {user.whoIAm.company.kpp ?? '-'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap md:space-x-4 md:flex-nowrap">
        <div className="cursor-default mt-1 w-full md:w-1/2">
          <label className="block text-gray-700">Название банка: </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
            {user.whoIAm.company.bankName}
          </p>
        </div>
        <div className="cursor-default mt-1 w-full md:w-1/2">
          <label className="block text-gray-700">БИК банка: </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
            {user.whoIAm.company.bikBank}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap md:space-x-4 md:flex-nowrap">
        <div className="cursor-default mt-1 w-full md:w-1/2">
          <label className="block text-gray-700">Расчетный счет: </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
            {user.whoIAm.company.checkingAccount}
          </p>
        </div>
        <div className="cursor-default mt-1 w-full md:w-1/2">
          <label className="block text-gray-700">Корреспондентский счет:</label>
          <p className="mt-1 px-4 py-2 border border-gray-300 shadow-sm">
            {user.whoIAm.company.correspondentAccount}
          </p>
        </div>
      </div>

      {/* {isAgreementSigned ? (
        <div className="flex items-center mt-2 space-x-2 bg-green-100 border border-green-200 rounded-lg p-4">
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
          <label className="block text-green-700 font-semibold text-lg">
            Договор подписан
          </label>
        </div>
      ) : (
        <div className="flex items-center mt-2 space-x-2 bg-red-100 border border-red-200 rounded-lg p-4">
          <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
          <label className="block text-red-700 font-semibold text-lg">
            Подпишите договор
          </label>
        </div>
      )} */}

      {/* <h2 className="text-xl font-semibold mt-6 mb-4">Адрес доставки</h2> */}

      <AddressSelectorForm isAgreementSigned={isAgreementSigned} />
    </div>
  );
}
