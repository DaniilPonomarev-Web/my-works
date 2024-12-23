import { registerEnumType } from '@nestjs/graphql';

export enum CustomerRole {
  Admin = 'admin',
  Manager = 'manager',
  Context = 'context',
}

registerEnumType(CustomerRole, {
  name: 'CustomerRole',
  description: 'Роли админов админки :D',
  valuesMap: {
    Admin: {
      description: 'Администратор',
    },
    Manager: {
      description: 'Менеджер',
    },
    Context: {
      description: 'Контекст',
    },
  },
});

export type CustomerRoleType = 'admin' | 'manager' | 'context';
