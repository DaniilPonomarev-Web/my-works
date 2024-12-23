import { Args, registerEnumType } from '@nestjs/graphql';

export enum StateOrder {
  created = 'Создан',
  paid = 'Оплачен',
  inprocessing = 'В обработке',
  sent = 'Отправлен',
  closed = 'Закрыт',
}

registerEnumType(StateOrder, {
  name: 'StateOrder',
  description: 'Статус заказа',
  valuesMap: {
    created: {
      description: 'Создан',
    },
    paid: {
      description: 'Оплачен',
    },
    inprocessing: {
      description: 'В обработке',
    },
    sent: {
      description: 'Отправлен',
    },
    closed: {
      description: 'Закрыт',
    },
  },
});

export const StateOrderArgs = Args('state', {
  nullable: false,
  description: 'Сортировка по статусу заказа',
  type: () => StateOrderArgs,
});

export enum ActionOrder {
  Update = 'Изменил заказ',
  Delete = 'Удалил заказ',
  Create = 'Создал заказ',
}
