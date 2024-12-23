'use client';

import { useState } from 'react';
import { ExitIcon } from '@radix-ui/react-icons';
import ChangePasswordForm from './change-password-form';
import BasicInfoForm from '../basic-info-form';
import CompanyInfoForm from './company-form';
import OrdersInfoForm from './orders/orders-form';
import FeedbackForm from './feedback-form';
import { signout } from '../../lib/actions';

type PropsType = {
  user: { email: string; name: string; phone: string; company: any };
  orders: any;
  feedbacks: any;
};

export default function LkForm({ user, orders, feedbacks }: PropsType) {
  const [activeTab, setActiveTab] = useState('basicInfo');

  const handleSignOut = () => {
    signout();
  };

  return (
    <div className="w-full max-w-6xl">
      <div className="flex overflow-x-auto justify-around border-b mb-4">
        <button
          className={`py-2 px-4 text-sm lg:text-md ${
            activeTab === 'basicInfo'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : ''
          }`}
          onClick={() => setActiveTab('basicInfo')}
        >
          Профиль
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'companyInfo'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : ''
          }`}
          onClick={() => setActiveTab('companyInfo')}
        >
          Компания
        </button>
        {/* <button
          className={`py-2 px-4 ${
            activeTab === 'addresses'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : ''
          }`}
          onClick={() => setActiveTab('addresses')}
        >
          Адреса
        </button> */}
        <button
          className={`py-2 px-4 ${
            activeTab === 'orders'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : ''
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Заказы
        </button>
        {feedbacks && feedbacks.length > 0 && (
          <button
            className={`py-2 px-4 ${
              activeTab === 'feedbacks'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : ''
            }`}
            onClick={() => setActiveTab('feedbacks')}
          >
            Запросы
          </button>
        )}
        <button
          className={`py-2 px-4 ${
            activeTab === 'changePassword'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : ''
          }`}
          onClick={() => setActiveTab('changePassword')}
        >
          Пароль
        </button>
        <button onClick={handleSignOut}>
          <ExitIcon className="w-6 h-6" />
        </button>
      </div>

      {activeTab === 'basicInfo' && <BasicInfoForm user={user} />}

      {activeTab === 'companyInfo' && (
        <CompanyInfoForm company={user.company} />
      )}

      {/* {activeTab === 'addresses' && (
        <AddresseInfoForm addresses={user.addresses} />
      )} */}

      {activeTab === 'orders' && <OrdersInfoForm userOrders={orders} />}

      {activeTab === 'feedbacks' && <FeedbackForm feedbacks={feedbacks} />}
      {activeTab === 'changePassword' && <ChangePasswordForm />}
    </div>
  );
}
