export type Maybe<T> = null | undefined | T;
export type PickEnum<T, K extends T> = {
  [P in keyof K]: P extends K ? P : never;
};

export * from './lib/message-broker/patterns';
export * from './lib//message-broker/payloads';

//Ссылка приглашения
export * from './lib/invite-telegram-users/invite-href.interface';
export * from './lib/invite-telegram-users/setInvite.interface';

//Категории
export * from './lib/category/defaultCategories';
export * from './lib/category/categoryHashData';
export * from './lib/category/category.interface';

//Почта
export * from './lib/mail/mail.interface';

export * from './lib/report/return.interface';

export * from './lib/yookassa/yookassa.interface';

//чеки
export * from './lib/proverkacheka';

export * from './functions';
