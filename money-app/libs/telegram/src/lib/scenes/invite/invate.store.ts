import { IGroup } from '@money-app/entities';

export const replyMarkups = {
  cancelInvite: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Отменить ❎', callback_data: `action:cancel` }],
      ],
    },
  },
  sendInvite: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Отправить ✉️', callback_data: `action:send` }],
        [{ text: 'Повторить 🔄', callback_data: `action:repeat` }],
        [{ text: 'Отменить ❎', callback_data: `action:cancel` }],
      ],
    },
  },
  selectGroup: (groups: IGroup[]) => {
    const inline_keyboard = groups.map((group) => [
      {
        text: group.name,
        callback_data: `selectGroup:${group.id}`,
      },
    ]);

    return {
      reply_markup: {
        inline_keyboard,
      },
    };
  },
};
