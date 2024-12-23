import { useNumericInput } from '../../lib/useNumericInput';

export default function CompanyDetailsForm({ errors }: { errors?: any }) {
  const [correspondentAccount, handleCorrespondentAccountChange] =
    useNumericInput('');
  const [checkingAccount, handleCheckingAccountChange] = useNumericInput('');
  const [bikBank, handleBikBankChange] = useNumericInput('');
  const [inn, handleInnChange] = useNumericInput('');
  const [kpp, handleKppChange] = useNumericInput('');
  const [ogrn, handleOgrnChange] = useNumericInput('');
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Данные компании</h3>

      <div className="mb-4">
        <input
          placeholder="Наименование компании *"
          type="text"
          id="companyName"
          name="companyName"
          minLength={3}
          maxLength={200}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="companyName-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.companyName'] &&
            errors['company.companyName'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="ИНН *"
          type="text"
          id="inn"
          name="inn"
          value={inn}
          minLength={10}
          maxLength={12}
          onChange={handleInnChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="inn-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.inn'] &&
            errors['company.inn'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="КПП"
          type="text"
          id="kpp"
          name="kpp"
          value={kpp}
          onChange={handleKppChange}
          minLength={0}
          maxLength={9}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div id="kpp-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.kpp'] &&
            errors['company.kpp'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="ОГРН(-ИП) *"
          type="text"
          id="ogrn"
          name="ogrn"
          value={ogrn}
          minLength={10}
          maxLength={15}
          onChange={handleOgrnChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="ogrn-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.ogrn'] &&
            errors['company.ogrn'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="Юридический адрес *"
          type="text"
          id="urAddress"
          name="urAddress"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          minLength={3}
          maxLength={200}
          required
        />
        <div id="urAddress-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.urAddress'] &&
            errors['company.urAddress'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <input
          placeholder="Наименование банка *"
          type="text"
          id="bankName"
          name="bankName"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        <div id="bankName-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.bankName'] &&
            errors['company.bankName'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <input
          placeholder="БИК банка *"
          type="text"
          id="bikBank"
          name="bikBank"
          value={bikBank}
          onChange={handleBikBankChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          minLength={9}
          maxLength={9}
          required
        />
        <div id="bikBank-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.bikBank'] &&
            errors['company.bikBank'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <input
          placeholder="Расчетный счет *"
          type="text"
          id="checkingAccount"
          name="checkingAccount"
          value={checkingAccount}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          minLength={20}
          maxLength={20}
          onChange={handleCheckingAccountChange}
          required
        />
        <div id="checkingAccount-error" aria-live="polite" aria-atomic="true">
          {errors?.['company.checkingAccount'] &&
            errors['company.checkingAccount'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          placeholder="Корреспондентский счет *"
          type="text"
          id="correspondentAccount"
          name="correspondentAccount"
          value={correspondentAccount}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          minLength={20}
          maxLength={20}
          onChange={handleCorrespondentAccountChange}
          required
        />
        {/* Ошибки для корреспондентского счета */}
        <div
          id="correspondentAccount-error"
          aria-live="polite"
          aria-atomic="true"
        >
          {errors?.['company.correspondentAccount'] &&
            errors['company.correspondentAccount'].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
