/* Текстовые сообщеия об ошибках */
export * from './lib/http-exceptions-messages';

export * from './lib/error.filter';
export * from './lib/functions';

export * from './lib/entities';
export * from './lib/interfaces';
export * from './lib/dto';

export * from './lib/message-broker';
export * from './lib/types';

export * from './lib/variables';

export * from './lib/types';

export * from './lib/validation-custom';

export * from './lib/dadata-methods';

export type Maybe<T> = null | undefined | T;
export type PickEnum<T, K extends T> = {
  [P in keyof K]: P extends K ? P : never;
};
