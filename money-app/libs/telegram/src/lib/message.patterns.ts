import { ICategory, IGroup, IInviteds, IUser } from '@money-app/entities';
import { DashboardReport } from '@money-app/shared';
import { Variables } from './variables';

export const messageForScenes = {
  /* Общее для всех сцен */
  all: {
    goHome: `На главную 🏠`,
    errorMessageNotClient: `<b>Клиент удален, вы не можете пользоваться ботом ⛔</b>`,
    noUserMessage: 'Нет пользователя ⛔',
    noUserGroupMessage: 'Нет группы пользователя ⛔',
    noUserClientMessage: 'Нет клиента пользователя ⛔',
    notSubscribe: '⛔ Подписка истекла ⛔',
    notTelegramService: `Неполадки в стети telegram ⛔`,
    userInfoMessage: (
      chatId: string,
      user: IUser,
      userGroup: IGroup,
      userAccountId: string,
      userAccAdminFirstName: string,
      formattedDate: string,
      userSubscribedToDate: string
    ) => `
<b>🆔 Чат ID</b>: ${chatId}
<b>👤 Имя</b>: ${user?.firstName}
<b>🏢 Группа</b>: ${userGroup?.name}
<b>👑 Администратор</b> : ${userAccAdminFirstName}
<b>☎️ Номер администратора</b> : ${userAccountId}
<b>📆 Дата присоединения</b> : ${formattedDate}
<b>${user?.status ? '✅' : '❌'} Статус </b>: ${
      user?.status ? 'Активный' : 'Выключен'
    }
<b>🌟 Подписка: </b> ${userSubscribedToDate}    
`,
    updateInterface: `🔴 Обновить интерфейс 🔴`,

    enabledGroupSuccess: (groupName: string) =>
      `Группа <b>"${groupName}"</b> успешно включена, участики уведомлены`,
    enabledGroupSuccessForUser: (groupName: string) =>
      `Группа <b>"${groupName}"</b> включена.`,
    enabledGroupFailed: `<b>Не удалось включить группу</b> ⛔`,
  },

  /* Общее для всех сцен */

  /* Главная сцена */
  Main: {
    errorInvate: `Во время регистрации по приглашению произошла ошибка`,
    errorReply: 'Произошла ошибка',
    userInfoBarMessage: (data: DashboardReport) => `
💸 Траты:
📆 За сегодня: ${Math.abs(data.expenses.day)} ₽
📆 За неделю: ${Math.abs(data.expenses.week)} ₽
📆 За текущий месяц: ${Math.abs(data.expenses.month)} ₽
📆 За текущий год: ${Math.abs(data.expenses.year)} ₽

📥 Доходы:
📆 За сегодня: ${Math.abs(data.income.day)} ₽
📆 За неделю: ${Math.abs(data.income.week)} ₽
📆 За текущий месяц: ${Math.abs(data.income.month)} ₽
📆 За текущий год: ${Math.abs(data.income.year)} ₽
`,
    menu: `Меню:`,
  },
  /* Главная сцена */

  /* ABTOPизация */
  auth: {
    requestPhoneNumber: () => {
      return {
        text: 'Пожалуйста, поделитесь своим номером телефона для того, чтобы мы смогли Вас зарегистрировать в системе:',
        reply_markup: {
          keyboard: [
            [
              {
                text: '📞Поделиться 📲',
                request_contact: true,
              },
            ],
          ],
          one_time_keyboard: true,
        },
      };
    },
    errorMessageInvalidURL: `Неверная ссылка для регистрации`,
    successHelloBot: (userName: string) =>
      `${userName}, добро пожаловать в бота.`,
    thanksForPhoneNumber: 'Спасибо за ваш номер телефона!',
    errorInvalidPhone: (phone: string) =>
      `Ссылка по  номеру телефона  ${phone} недействительна ⛔. Попробуйте ещё раз.`,
    registrationError: 'Произошла ошибка при регистрации 🔥',
    successRegistration: 'Вы успешно зарегестрированы 💫',
  },
  /* ABTOPизация */

  /* Регистрация */
  Registration: {
    questionRegistration: 'Хотите зарегистрироваться в боте ?',
    errorRegistration: 'Во время регистрации произошла ошибка ⛔',
    userNotFound: `User not found by telegram`,
    groupNotCreate: `Group not create`,
    accountNotCreate: `Account not create`,
  },
  /* Регистрация */

  /* Регистрация в ручном режиме */
  RegistrationHands: {
    phoneRequest: 'Поделитесь своим контактом',
    emailRequest: 'Введите email',
    dataConfirm: (
      phone: string,
      name: string,
      lastName: string,
      email: string
    ) =>
      `Подтвердите Ваши данные: \n Номер: ${phone}, \n Имя: ${name} \n Фамилия: ${
        lastName ? lastName : ' - '
      } \n `, // Email: ${email} \n
    phoneNotValid: 'Не корректный номер телефона, введите еще раз',
    emailNotValid: 'Не корректный email, введите еще раз',
    phoneDoesNotMatch:
      'Номер телфона в приглашении отличается от действительного, запросите новое приглашение с актуальным номером телефона',
    successRegistrationHands: (name: string) =>
      `${name}, Вы успешно зарегистрировались, добро пожаловать в бота!`,
  },
  /* Регистрация в ручном режиме */

  /* Сцена приглашения */
  InviteScene: {
    phoneRequest: `Пожалуйста, поделитесь своими контактными данными.`,
    phoneRequestInvite: `Пожалуйста, поделитесь номером телефона пользователя в формате <b>+7XXXXXXXXXX</b> или <b>8XXXXXXXXXX</b>`,
    phoneRequestSupport: `Если кнопка для отправки контакта не появилась, нажмите ее вручную, как показано на изображении.`,
    emailRequest: 'Введите email пользователя',
    dataConfirm: (phone: string, email: string, group: IGroup | null) =>
      `Подтвердите  данные: \n Номер: ${phone}, \n Email: ${email} \n Группа: ${group?.name} \n`,
    phoneNotValid: 'Не корректный номер телефона, введите еще раз',
    emailNotValid: 'Не корректный email, введите еще раз',
    NotValidSending: 'Не корректный email, введите еще раз',
    selectGroup: `<b>Выберите группу</b>:`,
    failedSending:
      'Не удалось отправить приглашение на email, попробуйте позже',
    successInvitationSending: (email: string, link: string) =>
      `Приглашение отправлено пользователю на электронную почту ${email}\n Прямая ссылка: ${link}`,
  },
  /* Сцена приглашения */

  /* Настрока */
  setupClientScene: {
    settingMenuMessage: `<b>Выберите, что хотите настроить</b>:`,
    startSetupClientScene: `<b>На этой странице вы можете редактировать группы, категории и прочее</b>`,
  },
  /* Настрока */

  /* Редактирование группы */
  editGroupScene: {
    editName: `<b>Введите новое название группы: </b>`,
    addCategory: `<b>Введите название категории: </b>`,
    notGroupFind: `<b>Группа не найдена ⛔ </b>`,
    notCreateCategory: `<b>Не удалось создать категорию </b>`,
    SuccessCreateCategory: (categoryName: string) =>
      `Категория<b> ${categoryName} !</b> успешно создана !`,
    notFoundDo: `<b>Я не понимаю что ты хочешь сделать </b>`,
    NotDoName: `<b>Не удалось изменить название группы ⛔</b>`,
    errorMessageNotGroup: `<b>Вы не состоите в группах ⛔</b>`,
    messageMenuEditGroup: `<b>Выберите, что хотите сделать</b>:`,
    goSettings: `К настройкам 🛠`,
    goBackGroups: `Назад ⬅️`,
    selectGroup: `Выберите группу  📚`,
    selectAction: 'Выберите действие',
    yReady: `Вы уверены ?`,
    SuccessDoName: (groupName: string) =>
      `<b>Название успешно изменено на ${groupName} ✳️</b>`,
    notDisableGroup: `<b>Не удалось отключить группу ⛔</b>`,
    notDeleteGroup: `<b>Не удалось удалить группу ⛔</b>`,
    successDoAction: (action: string) => `<b>Группа успешно ${action} ✳️</b>`,
    addGroup: {
      messageAddGroupName: 'Введите название группы',
      messageSelectCat:
        'Хотите ли добавить стандартные категории или добавить в ручную?',
      messageAddCat: 'Введите название категории',
      messageAddUsers: 'Выберите пользователея',
      messageAddCatQuestion: 'Что дальне ?',
      messageFinishCreateGroup: (catName: string) =>
        `Хотите создать категорию ${catName}? \n После нажатия кнопки, вы будете направлены на главную страницу.`,
    },
  },
  /* Редактирование группы */

  /* Редактирование категории */
  editCategoryScene: {
    editName: `<b>Введите новое наименование категории: </b>`,
    editLimit: `<b>Введите лимит по данной категории: </b>`,
    notFoundDo: `<b>Я не понимаю что ты хочешь сделать ⛔ \n Выбери действие</b>`,
    NotDoName: `<b>Не удалось изменить название ⛔</b>`,
    NotDoNumber: `<b>Введите число! ⛔</b>`,
    notCategoryFind: `<b>Категория не найдена ⛔</b>`,
    goSettings: `К настройкам 🛠`,
    goSettingsOne: `Назад`,
    SuccessDoName: (categoryName: string) =>
      `<b>Название успешно изменено на ${categoryName} ✳️</b>`,
    SuccessDoLimit: (limit: number) =>
      `<b>Лимит успешно установлен в размере ${limit} ✳️</b>`,
    notDisableCategory: `<b>Не удалось отключить категорию ⛔</b>`,
    notDeleteCategory: `<b>Не удалось удалить категорию ⛔</b>`,
    successDoAction: (action: string) =>
      `<b>Категория успешно ${action} ❕</b>`,
    yReady: `Вы уверены ?`,
    selectType: `Выберите тип категории`,
    errorLenght: `Название категории должно быть от ${Variables.group.minNameLenght} до ${Variables.group.maxNameLenght} символов. 
    Введите название заного.`,
    selectAction: (category: ICategory) => `
<b>📛 Название</b>: ${category.name}
<b>${category?.status ? '✅' : '❌'} Статус </b>: ${
      category?.status ? 'Включена' : 'Выключена'
    }
<b>👁️ Лимит</b>: ${category?.limit ?? 'Лимит не установлен'}
<b> Выберите действие: </b>
    `,
    errorMessageNotCategory: `<b>В данной группе нет категорий ⛔</b>`,
    errorMessageNotGroup: `<b>Вы не состоите в группах ⛔</b>`,
  },
  /* Редактирование категории */

  /*Редактирование пользователей */
  editUsersScene: {
    goSettingsOne: `Назад`,
    goSettings: `К настройкам 🛠`,
    hello: `На этой странице ты можешь редактировать пользователей бота и приглашения.`,
    notUsers: `<b>У Вас нет приглашенных пользователей </b>⛔`,
    checkInviteds: `Просмотреть приглашения`,
    menu: `Меню:`,
    userInfo: (chatId: number, user: IUser, userGroup: IGroup) => `
<b>🆔 Чат ID</b>: ${chatId}
<b>👤 Имя</b>: ${user?.firstName}
<b>👤 Номер телеонфа</b>: ${user?.phone}
<b>🏢 Группа</b>: ${userGroup?.name}
<b>🏢 Роль</b>: ${user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
<b>${user?.status ? '✅' : '❌'} Статус </b>: ${
      user?.status ? 'Активный' : 'Выключен'
    }
`,
    editUserGroup: (groupName: string) =>
      `Группа успешно изменена на: <b>${groupName}</b>`,
    editUser: (user: IUser | null) =>
      `Пользователь ${user?.firstName} ${
        user?.status ? 'включен в боте' : 'отключен от бота'
      }. `,
    editUserRole: (user: IUser | null) =>
      `Пользователь ${user?.firstName} ${
        user?.role === 'admin' ? 'стал Администратором' : 'стал пользователем'
      }. `,
    notUpdateRole: 'Не удалось изменить роль ⛔',

    notUpdateStatus: 'Не удалось изменить статус ⛔',
    notUpdateGroup: 'Не удалось изменить статус ⛔',
    notGroups: '<b>Нет доступых групп</b> ⛔',
    checkGroup: '<b>Выберите группу</b>:',
    userRoleBot: 'Ваша роль изменилась!',
    conectBot: 'Вы подключены к боту',
    disconectBot: 'Вы отключены от бота ⛔',
    updateGroup: (groupName: string) => `Вы переведены в группу: ${groupName}`,
  },
  /*Редактирование пользователей */

  /*Редактирование инвайтов */
  editInviteScene: {
    hello: `На этой странице ты можешь редактировать приглашения`,
    selectInvitedsGroup: `<b>Выберите приглашения:</b>`,
    notInviteds: `<b>Приглашения не найдены ⛔</b>`,
    inviteInfo: (
      invite: IInviteds,
      formatDateCreated: string,
      formatDateValidity: string
    ) => `
<b>📧 Email</b>: ${invite.email}
<b>📱 Номер телефона</b>: ${invite.phone}
<b>🕰️ Дата создания</b>: ${formatDateCreated}
<b>🗓️ Срок дейстивия до</b>: ${formatDateValidity}
<b>${invite?.used ? '❌' : '✅'} </b>: ${
      invite?.used ? 'Использован' : 'Не использован'
    }
`,
    successDelete: `Приглашение успешно удалено`,
    failDelete: `Приглашение не удалено, повторите попытку позже ⏲️`,
    failExtend: `Не удалось продлить приглашение ⛔`,
    successExtend: `Приглашение успешно продлено на 14 дней`,
  },
  /*Редактирование инвайтов */

  /* Покупки затраты */
  expenseScene: {
    /**
     * Сообщение о том, что человек добавил покупку
     * @param categoryName название категории
     * @param summa сумма покупки
     * @returns
     */
    addExpenseMessage: (categoryName: string, summa: string) =>
      `Вы добавили покупку в категорию <b>${categoryName}</b> на сумму <b>${summa}</b>💸`,

    addExpenseMessageWithLimit: (
      categoryName: string,
      summa: string,
      limitCat: number,
      summaInCat: number,
      good: boolean,
      textLimit: string
    ) =>
      `
Вы добавили покупку в категорию <b>${categoryName}</b> на сумму <b>${summa}</b>💸
Ваш лимит по данной категории <b>${limitCat}</b>, на данный момент потрачено уже <b>${summaInCat} 💸</b>.
<b>${good ? '✅' : '🔥'}  ${textLimit} </b>`,
    qr: {
      sendQrCode: `Отправьте фото с QR кодом на чеке:`,
      allExpencesByQr: `Все позиции пройдены`,
      nextItem: `Пропустить позицию`,
      checkPositionAlert: (namePosition: string, summa: number) =>
        `Покупка <b>${namePosition}</b> на сумму <b>${summa}</b>\nВыберите категорию:`,
      errorScanQrCode: `Произошла ошибка при сканировании QR-кода. Повторите попытку`,
      retryScanQrCode: `<b>Вы уже добавляли этот чек !</b>`,
    },
    helpEnableGoup: `Сообщение администратору бота успешно отправлено, ожидайте`,
    addExpenseMessageAdmin: (
      userName: string,
      categoryName: string,
      summa: string,
      group: string
    ) =>
      `Пользователь ${userName} добавил покупку в группу ${group}, категорию ${categoryName} на сумму ${summa} 💸`,
    errorMessageAddExpense: `Не удалось добавить покупку, попробуйте снова ⏲️`,
    errorMessageNotGroups: `<b>Группы не найдены ⛔</b>`,
    errorMessageDisabledGroupsUser: (groupName: string) =>
      ` Ваша группа <b>"${groupName}"</b> попросите администратора включить её`,
    errorMessageDisabledGroupsAdmin: (countDisGroups: number) =>
      ` <b>${formatGroupCount(
        countDisGroups
      )}</b>, включите хотя бы одну в настроках групп`,
    errorMessageNotCategory: `<b>В данной группе нет категорий</b>`,
    messageForEnableGroup: (userName: string, groupName: string) =>
      `Пользователь <b>${userName}</b> просит включить группу <b>"${groupName}"</b>`,
    messageForEnableGroupNotData: `Пользователь просит включить группу  `,
    selectCategory: `<b>Выберите категорию:</b>`,
    errorMessageNotGroup: `<b>Вы не состоите в группах ⛔</b>`,
    menu: `<b>Меню</b>`,
    summ: `<b>Укажите сумму:</b>`,
    errorNotSelectCategoryText: `<b>Пожалуйста, выберите категорию !</b>`,

    errorSummText: `<b>Пожалуйста, введите только цифры !</b>`,
    selectAction: 'Выберите действие',
    errorMessageNotUser: `<b>Вы не существуете в нашей базе данных ⛔</b>`,
  },

  /* Покупки затраты */

  /*доходы*/
  incomeScene: {
    addIncomeMessage: (categoryName: string, summa: string) =>
      `Вы добавили доход в категорию <b>${categoryName}</b> на сумму <b>${summa}</b>💸`,
    helpEnableGoup: `Сообщение администратору бота успешно отправлено, ожидайте`,
    addIncomeMessageAdmin: (
      userName: string,
      categoryName: string,
      summa: string,
      group: string
    ) =>
      `Пользователь ${userName} добавил доход в группу ${group}, категорию ${categoryName} на сумму ${summa} 💸`,
  },

  /*доходы*/

  /*Мои финансы */

  finances: {
    keyboard: 'Выбрать период:',
    income: {
      month: (summ: number, categoryName: string) =>
        `За текущий месяц вы заработали <b>${Math.abs(summ)}</b> ₽.`,
      week: (summ: number, categoryName: string) =>
        `За текущую неделю вы заработали <b>${Math.abs(summ)}</b> ₽.`,
      year: (summ: number, categoryName: string) =>
        `За текущий год вы заработали <b>${Math.abs(summ)}</b> ₽.`,
    },
    expense: {
      month: (summ: number, categoryName: string) =>
        `За текущий месяц вы потратили <b>${Math.abs(
          summ
        )}</b> ₽ в категории <b>${categoryName}</b>`,
      week: (summ: number, categoryName: string) =>
        `За текущую неделю вы потратили <b>${Math.abs(summ)}</b> ₽.`,
      year: (summ: number, categoryName: string) =>
        `За текущий год вы потратили <b>${Math.abs(summ)}</b> ₽.`,
    },
  },

  /*Мои финансы */

  /*Подписка */
  subscribeScene: {
    subscribePrices: `
<b>📧 Стоимость подписки : </b>
На месяц: <b>${Variables.subscribePrice.month}</b> ₽
На 3 месяца: <b>${Variables.subscribePrice.threeMonth}</b> ₽
На пол года: <b>${Variables.subscribePrice.halfAyear}</b> ₽
На год: <b>${Variables.subscribePrice.year}</b> ₽
`,
    subscribeSelectedPrice: (price: number) =>
      `<b>📧 Стоимость подписки ${price} ₽ </b>`,
    notSubscribe: `Ваша подписка истекла ⛔`,
  },

  /*Подписка */
};

const formatGroupCount = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `У вас выключено ${count} групп`;
  }

  switch (lastDigit) {
    case 1:
      return `У вас выключена ${count} группа`;
    case 2:
    case 3:
    case 4:
      return `У вас выключено ${count} группы`;
    default:
      return `У вас выключено ${count} групп`;
  }
};
