'use client';

import { useState } from 'react';
import {
  ExitIcon,
  PersonIcon,
  // BuildingIcon,
  HomeIcon,
  LockClosedIcon,
  FileTextIcon,
} from '@radix-ui/react-icons';
import ChangePasswordForm from './change-password-form';
import BasicInfoForm from '../basic-info-form';
import CompanyInfoForm from './company-form';
import OrdersInfoForm from './orders/orders-form';
import FeedbackForm from './feedback-form';
import { signout } from '../../lib/actions';
import EditBasicInfoForm from './edit/edit-basic-info-form';

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
    <>
      <div className="w-full max-w-6xl text-left mb-2 px-2 md:px-0 md:mb-6 text-xl font-bold">
        Личный кабинет
      </div>
      <div className="w-full max-w-6xl grid grid-cols-12 gap-1 md:gap-4">
        {/* Левая колонка с вкладками */}
        <div className="col-span-2 md:col-span-3 border-r pr-2 md:pr-4">
          <button
            className={`block w-full py-2 px-4 text-left ${
              activeTab === 'basicInfo'
                ? 'bg-gray-100 text-black font-bold'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('basicInfo')}
          >
            <PersonIcon className="w-5 h-5 md:mr-2 md:hidden" />
            <span className="hidden md:inline">Профиль</span>
          </button>
          <button
            className={`block w-full py-2 px-4 text-left ${
              activeTab === 'companyInfo'
                ? 'bg-gray-100 text-black font-bold'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('companyInfo')}
          >
            <HomeIcon className="w-5 h-5 md:mr-2 md:hidden" />
            <span className="hidden md:inline">Компания</span>
          </button>
          <button
            className={`block w-full py-2 px-4 text-left ${
              activeTab === 'orders'
                ? 'bg-gray-100 text-black font-bold'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <FileTextIcon className="w-5 h-5 md:mr-2 md:hidden" />
            <span className="hidden md:inline">Заказы</span>
          </button>
          {feedbacks && feedbacks.length > 0 && (
            <button
              className={`block w-full py-2 px-4 text-left ${
                activeTab === 'feedbacks'
                  ? 'bg-gray-100 text-black font-bold'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('feedbacks')}
            >
              <FileTextIcon className="w-5 h-5 md:mr-2 md:hidden" />
              <span className="hidden md:inline">Запросы</span>
            </button>
          )}
          <button
            className={`block w-full py-2 px-4 text-left ${
              activeTab === 'changePassword'
                ? 'bg-gray-100 text-black font-bold'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('changePassword')}
          >
            <LockClosedIcon className="w-5 h-5 md:mr-2 md:hidden" />
            <span className="hidden md:inline">Пароль</span>
          </button>
          <ExitIcon
            className="flex m-3 w-5 h-5  text-red-600 md:hidden "
            onClick={handleSignOut}
          />
          <button
            className="block py-2 px-4 text-left  items-center text-red-600 hover:bg-red-200 w-full"
            onClick={handleSignOut}
          >
            <span className="hidden md:inline">Выход</span>
          </button>
        </div>

        {/* Правая колонка с содержимым */}
        <div className="col-span-10 md:col-span-9">
          {activeTab === 'basicInfo' && <EditBasicInfoForm user={user} />}
          {activeTab === 'companyInfo' && (
            <CompanyInfoForm company={user.company} />
          )}
          {activeTab === 'orders' && <OrdersInfoForm userOrders={orders} />}
          {activeTab === 'feedbacks' && <FeedbackForm feedbacks={feedbacks} />}
          {activeTab === 'changePassword' && <ChangePasswordForm />}
        </div>
      </div>
    </>
  );
}
