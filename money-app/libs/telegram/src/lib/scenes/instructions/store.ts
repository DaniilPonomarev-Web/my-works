export const InstructionsSceneMenu = [
  [{ text: 'Настройкам ⚙️', callback_data: 'instructionsSetting' }],
  [{ text: 'Доходам 💸', callback_data: 'instructionsIncome' }],
  [{ text: 'Расходам 💰', callback_data: 'instructionsExpense' }],
  [
    {
      text: 'Приглашению пользователей 🤝',
      callback_data: 'instructionsInvite',
    },
  ],
  [{ text: 'Обо мне ℹ️', callback_data: 'instructionsAboutMe' }],
  [{ text: 'На главную 🏠', callback_data: 'goMainScene' }],
];

export const InstructionsSettingMenu = [
  [{ text: 'Группы 📊', callback_data: 'instructionSettingsGroup' }],
  [{ text: 'Категории 📂', callback_data: 'instructionSettingsCategory' }],
  [{ text: 'Пользователи 👥', callback_data: 'instructionSettingsUsers' }],
  [
    {
      text: 'Приглашения пользователей 📧',
      callback_data: 'instructionSettingsInvite',
    },
  ],
  [{ text: 'К справке 📚', callback_data: 'goInstructions' }],
  [{ text: 'На главную 🏠', callback_data: 'goMainScene' }],
];

export const InstructionsSettingMenuBack = [
  [{ text: 'К справке 📚', callback_data: 'goInstructions' }],
];
export const InstructionsSettingMenuBackSetting = [
  [{ text: 'К справке📚', callback_data: 'goInstructions' }],
  [{ text: 'К справке настроек 🔙', callback_data: 'instructionsSetting' }],
];

export const messageForSettings = {
  all: {
    instructionsIncome: `На странице "Доходы" вы можете легко добавить новый доход. Просто выберите категорию и введите сумму.`,
    instructionsExpense: `На странице "Расходы" вы можете быстро добавить покупку. Просто выберите категорию и введите сумму.`,
    instructionsInvite: `На сцене "Приглашения" вы можете пригласить нового пользователя. Перейдите на эту сцену, заполните данные, и приглашение будет отправлено по указанному e-mail. Вы также можете поделиться полученной ссылкой.`,
    instructionsAboutMe: `Сцена "Обо мне" предоставляет вам информацию о вашем аккаунте и использовании бота.`,
    instructionsSetting: `Страница "Настройки" позволяет вам редактировать различные разделы. Чтобы получить более подробную информацию, выберите нужный раздел ниже:`,
  },
  settings: {
    instructionSetingsGroup: `На странице <b>редактирования групп</b> вы можете:
    1. Редактировать текущие группы - менять название, отключать, добавлять категорию, удалять.
    2. Создавать новые группы.`,
    instructionSetingsCategory: `На странице <b>редактирования категорий</b> вы можете:
    1. Редактировать текущие категории - менять название, отключать, удалять.
    2. Для создания новой категории в определенной группе - перейдите в раздел редактирования групп.`,
    instructionSetingsUsers: `На странице <b>редактирования пользователей</b> вы можете:
    1. Отключать пользователей от бота.
    2. Изменять группу пользователя.`,
    instructionSetingsInviteds: `На странице <b>редактирования приглашений</b> вы увидите:
    1. <b>Актуальные приглашения</b> - не использованные, с непросроченным сроком.
    2. <b>Использованные приглашения</b> - использованные пользователями.
    3. <b>Просроченные приглашения</b> - не использованные и просроченные.`,
  },
};
