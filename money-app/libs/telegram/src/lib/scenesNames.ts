export const scenes = {
  /**
   * Главная
   */
  main: 'mainScene',

  /**
   * Покупки
   */
  expenseMenu: 'expenseMenuScene',
  expense: 'expenseScene',
  expenseQr: 'expenseQrScene',
  expenseAdmin: 'expenseSceneForAdmin',

  /**
   * Доходы
   */
  income: 'incomeScene',
  incomeAdmin: 'incomeSceneForAdmin',

  /**
   * Редактирование
   */
  edit: {
    group: {
      edit: 'editGroupsScene',
      start: 'startEditGroupsScene',
      add: 'addEditGroupScene',
    },
    category: 'editCategoriesScene',
    alarms: 'editAlarmsScene',
    account: 'editAccountScene',
    users: 'editUsersScene',
    invite: 'editInviteScene',
    setup: 'setupClientScene',
  },

  /**
   * Мои финансы
   */
  finances: {
    main: 'financesScene',
    income: 'financesIncomeScene',
    expense: 'financesExpenseScene',
  },
  /**
   * Приглашение
   */
  invate: 'inviteScene',

  /**
   * Регистрация пользователя
   */
  reg: 'registrationScene',

  /**
   * Регистрация пользователя руками
   */
  regHands: 'regitsrationSceneHands',

  /*
  Справка
  */
  instructions: 'instructionsScene',

  /*Подписка */
  subscribe: 'subscribeScene',
};
