import { IGroup } from '@money-app/entities';

export const replyMarkups = {
  cancelIncome: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '➕ Добавить ещё доходы', callback_data: 'addIncome' }],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },

  IncomeSceneMenu: {
    reply_markup: {
      inline_keyboard: [
        // [{ text: '💸 Добавить доход', callback_data: 'addIncome' }],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },

  addIncomeSceneMenu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '➕ Добавить ещё доходы', callback_data: 'addIncome' }],
        [{ text: '🏠 Главное меню', callback_data: 'goMainScene' }],
      ],
    },
  },
  allGroupsDisabledMenuAdmin: {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '⚙️ Настройки',
            callback_data: 'goSetupClientScene',
          },
        ],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },

  allGroupsDisabledMenuUser: (groupID: string) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🆘 Попросить включить',
            callback_data: `enableGroupReq:${groupID}`,
          },
        ],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  }),

  enableGroupForAdmin: (groupID: string) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Включить группу 👌',
            callback_data: `enableGroup:${groupID}`,
          },
        ],
      ],
    },
  }),

  categoryMenu: (keyboardForCategory: any) => ({
    reply_markup: {
      inline_keyboard: [
        ...keyboardForCategory,
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  }),

  categoryMenuAdmin: (keyboardForCategory: any) => ({
    reply_markup: {
      inline_keyboard: [
        ...keyboardForCategory,
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  }),

  selectGroup: (groups: IGroup[]) => {
    const inline_keyboard = [
      groups.map((group) => ({
        text: `${group.name}`,
        callback_data: `selGroup:${group.id}`,
      })),
      [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
    ];

    return {
      reply_markup: {
        inline_keyboard,
      },
    };
  },
};
