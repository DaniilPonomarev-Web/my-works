import { IGroup } from '@money-app/entities';

export const replyMarkups = {
  myFinances: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🤑 Доходы', callback_data: 'goMyIncomes' }],
        [{ text: '💸 Расходы', callback_data: 'goMyExpenses' }],
        [{ text: '🏠 Главное меню', callback_data: 'goMainScene' }],
      ],
    },
  },
  backMenuFinanses: {
    reply_markup: {
      inline_keyboard: [
        [{ text: '💰 Мои финансы', callback_data: 'goMyFinances' }],
        [{ text: '🏠 Главная страница ', callback_data: 'goMainScene' }],
      ],
    },
  },

  selectPeriodFinancesMenu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Сегодня', callback_data: 'getFinances:Today' }],
        [{ text: 'Текущая неделя', callback_data: 'getFinances:Week' }],
        [{ text: 'Текущий месяц', callback_data: 'getFinances:Month' }],
        [{ text: 'Текущий год', callback_data: 'getFinances:Year' }],
        [{ text: '💰 Мои финансы', callback_data: 'goMyFinances' }],
        [{ text: '🏠 Главная страница ', callback_data: 'goMainScene' }],
      ],
    },
  },
  selectGroup: (groups: IGroup[]) => {
    const inline_keyboard = [
      groups.map((group) => ({
        text: `${group.name}`,
        callback_data: `selGroup:${group.id}`,
      })),
      [{ text: '💰 Мои финансы', callback_data: 'goMyFinances' }],
      [{ text: '🏠 Главная страница', callback_data: 'goMainScene' }],
    ];

    return {
      reply_markup: {
        inline_keyboard,
      },
    };
  },
  financesSceneMenu2: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Определенной группы', callback_data: 'getFinances:Week' }],
        [{ text: 'Личные', callback_data: 'getFinances:Week' }],
        [{ text: '💰 Мои финансы', callback_data: 'goMyFinances' }],
        [{ text: '🏠 Главная страница ', callback_data: 'goMainScene' }],
      ],
    },
  },
};

export type Period = 'Today' | 'Week' | 'Month' | 'Year';
export const periodDescriptions: Record<Period, string> = {
  Today: 'сегодня',
  Week: 'текущую неделю',
  Month: 'текущий месяц',
  Year: 'текущий год',
};
