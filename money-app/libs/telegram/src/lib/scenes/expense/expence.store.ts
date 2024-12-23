import { IGroup } from '@money-app/entities';

export const replyMarkups = {
  cancelExpense: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🛑 Добавить ещё покупку', callback_data: 'addExpenseHand' }],
        [{ text: '🏠 Главное меню', callback_data: 'goMainScene' }],
      ],
    },
  },

  expenseMenuSceneMenuAdmin: {
    reply_markup: {
      inline_keyboard: [
        // [{ text: '💬 QR-код из чека', callback_data: 'AddExpenseByQr' }],
        [{ text: '✋ Вручную', callback_data: 'addExpenseHand' }],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },
  expenseMenuSceneMenuUser: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '✋ Вручную', callback_data: 'addExpenseHand' }],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },

  expenseQrSceneMenu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Добавить вручную', callback_data: 'addExpenseHand' }],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },

  expenseRetryScanQrMenu: (qrTextCache: string) => ({
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Повторить', callback_data: `delCheck:${qrTextCache}` }],
        [{ text: 'Добавить вручную', callback_data: 'addExpenseHand' }],
        [{ text: 'Добавить другой чек', callback_data: `AddExpenseByQr` }],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  }),

  /*
    expenseRetryScanQrMenu: (chatID: number, qrText: string) => [
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Повторить', callback_data: `add:${chatID}: ${qrText}` }],
          [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
        ],
      },
    },
  ],
  */
  expenseQrSceneMenu2: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Ещё один чек', callback_data: 'AddExpenseByQr' }],
        [{ text: 'Добавить траты вручную', callback_data: 'addExpenseHand' }],
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },

  expenseSceneMenu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
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

  categoryMenuExpence: (keyboardForCategory: any) => ({
    reply_markup: {
      inline_keyboard: [
        ...keyboardForCategory,
        [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  }),
  categoryMenuExpenceAdmin: (keyboardForCategory: any) => ({
    reply_markup: {
      inline_keyboard: [
        ...keyboardForCategory,
        [{ text: '🆕 Новая категория', callback_data: 'addCategory' }],
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
