export const replyMarkups = {
  menu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Добавить доход', callback_data: 'addIncome' }],
        [{ text: 'Добавть затрату', callback_data: 'addExpense' }],
        [{ text: 'Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },
};
