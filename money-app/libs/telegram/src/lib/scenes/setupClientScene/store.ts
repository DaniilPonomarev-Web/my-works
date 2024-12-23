export const SetupClientSceneMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Группы 🏷', callback_data: 'SetupGroupScene' }],
      [{ text: 'Категории 📋', callback_data: 'SetupCategoriesScene' }],
      [{ text: 'Пользователи 👤', callback_data: 'SetupUsersScene' }],
      [
        {
          text: 'Подписка 😎',
          callback_data: 'goSubscribeScene',
        },
      ],
      [{ text: 'Уведомления ℹ️', callback_data: 'SetupAlarmsScene' }],

      [{ text: 'Главная страница 🏠', callback_data: 'goMainScene' }],
    ],
  },
};
