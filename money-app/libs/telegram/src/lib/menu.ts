import { messageForScenes } from './message.patterns';

export const mainScneneMenuAdmin = [
  [
    {
      text: '➕ Добавить доход',
      callback_data: 'addIncome',
    },
  ],
  [
    {
      text: '💸 Добавить расход',
      callback_data: 'addExpenseMenu',
    },
  ],
  [
    {
      text: '💰 Финансы',
      callback_data: 'goMyFinances',
    },
  ],
  [
    {
      text: '👤 Обо мне',
      callback_data: 'infoAboutMe',
    },
  ],
  [
    {
      text: '📚 Справка',
      callback_data: 'goInstructions',
    },
  ],
  [
    {
      text: '⚙️ Настройки',
      callback_data: 'goSetupClientScene',
    },
  ],
];

export const mainScneneMenuAdminWithoutSubscribe = [
  [
    {
      text: '💰 Мои финансы',
      callback_data: 'goMyFinances',
    },
  ],
  [
    {
      text: '😎 Подписка',
      callback_data: 'goSubscribeScene',
    },
  ],
  [
    {
      text: '📚 Справка',
      callback_data: 'goInstructions',
    },
  ],
];

if (process.env['NODE_ENV'] === 'development') {
  mainScneneMenuAdminWithoutSubscribe.push([
    {
      text: 'Моковые доходы расходы',
      callback_data: 'mockExpenseIncome',
    },
  ]);
  mainScneneMenuAdmin.push([
    {
      text: 'Моковые доходы расходы',
      callback_data: 'mockExpenseIncome',
    },
  ]);
}

export const mainScneneMenuUser = [
  [
    {
      text: '➕ Добавить доход',
      callback_data: 'addIncome',
    },
  ],
  [
    {
      text: '💸 Добавить расход',
      callback_data: 'addExpenseHand',
    },
  ],
  [
    {
      text: '👤 Обо мне',
      callback_data: 'infoAboutMe',
    },
  ],
];

export const mainScneneMenuDefault = [
  [
    {
      text: '👤 Обо мне',
      callback_data: 'infoAboutMe',
    },
  ],
];

export const registrationSceneAdd = (chatId: number) => ({
  inline_keyboard: [
    [{ text: '📝 Регистрация', callback_data: `registration:${chatId}` }],
  ],
});

export const expenseSceneMenu = [
  [{ text: '➕ Добавить доход', callback_data: 'addIncome' }],
  [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
];

export const addexpenseSceneMenu = [
  [{ text: '➕ Добавить покупки', callback_data: 'addExpenseHand' }],
  [{ text: '🏠 Главное меню', callback_data: 'goMainScene' }],
];

export const goSettings = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '⚙️ ' + messageForScenes.editUsersScene.goSettings,
          callback_data: `goSetupClientScene`,
        },
      ],
    ],
  },
};

export const ExtendSubscribeMenu = [
  [
    {
      text: 'Продлить подписку',
      callback_data: 'goSubscribeScene',
    },
  ],
];

export const InfoCronMenu = [
  [{ text: '➕ Добавить доход', callback_data: 'addIncome' }],
  [{ text: '💸 Добавить расход', callback_data: 'addExpenseHand' }],
  [
    {
      text: 'ℹ️ Настройки  уведомлений',
      callback_data: 'SetupAlarmsScene',
    },
  ],
];

export const HomeMarckup = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Главная страница 🏠', callback_data: 'goMainScene' }],
    ],
  },
};
