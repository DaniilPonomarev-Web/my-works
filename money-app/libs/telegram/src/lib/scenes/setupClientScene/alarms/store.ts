export const setupCategoryKeyboard = (categoryId: string, status: boolean) => ({
  inline_keyboard: [
    [
      {
        text: 'Изменить название 🖊',
        callback_data: `editCatName:${categoryId}`,
      },
    ],
    [
      {
        text: 'Изменить лимит 👁️‍🗨️',
        callback_data: `editCatLimit:${categoryId}`,
      },
    ],
    [
      {
        text: `${status ? 'Отключить' : 'Включить'} 🔄`,
        callback_data: `confirmAction:disableCat:${categoryId}`,
      },
    ],
    [
      {
        text: 'Удалить ❌',
        callback_data: `confirmAction:delCat:${categoryId}`,
      },
    ],
    [{ text: 'Отмена ❎', callback_data: `SetupCategoryScene` }],
  ],
});

export const addCategoryKeyboard = (groupId: string) => ({
  text: `🟢Добавить категорию 🟢`,
  callback_data: `addCat:${groupId}`,
});

export const addCategoryKeyboardForAdmin = (groupId: string) => ({
  inline_keyboard: [
    [
      {
        text: `🟢Добавить категорию 🟢`,
        callback_data: `addCat:${groupId}`,
      },
    ],
  ],
});

export const switchPageGroup = (groupId: string, currentPage: string) => [
  {
    text:
      currentPage === 'income'
        ? `🔄Категории расходов🔄`
        : `🔄Категории доходов🔄`,
    callback_data: `swIncome:${groupId}:${
      currentPage === 'income' ? 'expense' : 'income'
    }`, // Изменение: Инвертировать текущую страницу
  },
];

export const goBack = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Вернуться к настройкам 🔄',
          callback_data: `goSetupClientScene`,
        },
      ],
    ],
  },
};
