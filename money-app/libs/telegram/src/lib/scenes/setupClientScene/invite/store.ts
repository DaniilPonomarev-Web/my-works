import { IInviteds } from '@money-app/entities';
import { messageForScenes } from '../../../message.patterns';

export const invitedsMarkup = {
  sortInviteds: (
    actualCount: number,
    usedCount: number,
    expiredCount: number,
    clientId: string
  ) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Актуальные (${actualCount})`,
            callback_data:
              actualCount > 0 ? `actualInviteds:${clientId}` : `not`,
          },
        ],
        [
          {
            text: `Использованные (${usedCount})`,
            callback_data:
              usedCount > 0 ? `usedInvitations:${clientId}` : `not`,
          },
        ],
        [
          {
            text: `Просроченные (${expiredCount})`,
            callback_data:
              expiredCount > 0 ? `expiredInvitations:${clientId}` : `not`,
          },
        ],
      ],
    },
  }),
  editActualInvitedsMarkup: (invate: IInviteds, inviteKey: string) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Продлить`,
            callback_data: `extendInvite:${invate.id}`,
          },
        ],
        [
          {
            text: `Отправить повторно`,
            callback_data: `resendActualInvite:${inviteKey}`,
          },
        ],
        [
          {
            text: 'Удалить',
            callback_data: `deleteInvite:${invate.id}`,
          },
        ],
      ],
    },
  }),
  editExpiredInvitedsMarkup: (inviteId: string) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Актуализировать`,
            callback_data: `extendInvite:${inviteId}`,
          },
        ],
        [
          {
            text: 'Удалить',
            callback_data: `deleteInvite:${inviteId}`,
          },
        ],
      ],
    },
  }),
  editUsedInvitedsMarkup: (inviteId: string) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Удалить',
            callback_data: `deleteInvite:${inviteId}`,
          },
        ],
      ],
    },
  }),
};

export const goSettingsUser = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '👥 К настройкам пользователя',
          callback_data: `SetupUsersScene`,
        },
      ],
      [{ text: 'На главную 🏠', callback_data: 'goMainScene' }],
    ],
  },
};
