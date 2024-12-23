// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICategory, TransactionType } from '@money-app/entities';

export const defaultCategories: ICategory[] = [
  {
    id: 'ad131ac7-114f-4bb6-bd07-9863a6001a66',
    accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
    groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
    name: 'Продукты 🍏',
    type: TransactionType.Expense,
    limit: null,
    status: true,
  },
  {
    id: '24b110ab-5f3b-40c1-aa6a-934e312f93eb',
    name: 'Общественный транспорт 🚌',
    accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
    groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
    type: TransactionType.Expense,
    limit: null,
    status: true,
  },

  {
    id: '4765e0db-efc8-47d2-9369-80f754a6f467',
    name: 'Зарплата 🏡',
    accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
    groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
    type: TransactionType.Income,
    limit: null,
    status: true,
  },
];

// {
//   id: '8d0031ee-b28d-479a-91be-e5dda1fabc22',
//   name: 'Тренажёрный зал 🏅',
//   accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
//   groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
//   type: TransactionType.Expense,
//   status: true,
// },
// {
//   id: '078f78d8-406b-4121-ac88-1c1fd977e736',
//   name: 'Машина 🚗',
//   accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
//   groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
//   type: TransactionType.Expense,
//   status: true,
// },
// {
//   id: '8b6664cf-3d1c-4aa8-a4dd-c521cb0f89b1',
//   name: 'Бытовые товары 🏠',
//   accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
//   groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
//   type: TransactionType.Expense,
//   status: true,
// },
// {
//   id: 'ce4f2ad8-688a-429b-b11e-f48519f466d5',
//   name: 'Бензин ⛽',
//   accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
//   groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
//   type: TransactionType.Expense,
//   status: true,
// },
// {
//   id: '4765e0db-efc8-47d2-9369-80f754a6f467',
//   name: 'Ипотека 🏡',
//   accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
//   groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
//   type: TransactionType.Expense,
//   status: true,
// },
// {
//   id: '4765e0db-efc8-47d2-9369-80f754a6f467',
//   name: 'Фриланс 🏡',
//   accountId: '87e20529-4f6b-487f-8b30-241ce00ba241',
//   groupId: '562589ba-2a43-4106-a20e-9c2ee5a3b8fa',
//   type: TransactionType.Income,
//   status: true,
// },
