export const setupClientKeyboard = (groupId: string, status: boolean) => ({
  inline_keyboard: [
    [
      {
        text: 'Изменить название 🖊',
        callback_data: `editGroupName:${groupId}`,
      },
    ],
    [
      {
        text: 'Добавить категорию ➕',
        callback_data: `addCategoryForGroup:${groupId}`,
      },
    ],
    [
      {
        text: `${status ? 'Отключить' : 'Включить'} 🔄`,
        callback_data: `confirmAction:disableGroup:${groupId}`,
      },
    ],
    [
      {
        text: 'Удалить ❌',
        callback_data: `confirmAction:deleteGroup:${groupId}`,
      },
    ],
    [{ text: 'Отмена ❎', callback_data: `SetupGroupScene` }],
  ],
});

export const cancelAddGroup = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `Отмена ❎`,
          callback_data: `action:cancel`,
        },
      ],
    ],
  },
};

export const selectCategoryType = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `Стандартные 📋`,
          callback_data: `categorySelectDefault`,
        },
      ],
      [
        {
          text: `Добавить вручную ✍️`,
          callback_data: `categorySelectAddSam`,
        },
      ],
    ],
  },
};

export const selectCategoryTypes = (accoundId: string) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `Доходы`,
          callback_data: `tS:inc:${accoundId}`,
        },
      ],
      [
        {
          text: `Расходы`,
          callback_data: `tS:exp:${accoundId}`,
        },
      ],
    ],
  },
});

export const addManyCat = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `Добавить ещё категорию ➕`,
          callback_data: `addManyCat`,
        },
      ],
      [
        {
          text: `К следующему шагу ➡️`,
          callback_data: `nextStepCat`,
        },
      ],
    ],
  },
};

export const FinishAddGroup = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `Создать ✔️`,
          callback_data: `createGroup`,
        },
      ],
      [
        {
          text: `Отмена ❎`,
          callback_data: `action:cancel`,
        },
      ],
    ],
  },
};

export const startGroupSceneMarkup = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `Редактировать группы 🖊`,
          callback_data: `goEditGroup`,
        },
      ],
      [
        {
          text: `Добавить группу ➕`,
          callback_data: `goAddGroup`,
        },
      ],
      [
        {
          text: `Назад ⬅️`,
          callback_data: `goSetupClientScene`,
        },
      ],
    ],
  },
};
