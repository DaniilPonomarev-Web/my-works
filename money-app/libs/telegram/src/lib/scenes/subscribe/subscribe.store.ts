export const replyMarkups = {
  menu: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Подключить на месяц 💸', callback_data: 'subscribe:month' }],
        [
          {
            text: 'Подключить на пол года 💸',
            callback_data: 'subscribe:halfAyear',
          },
        ],
        [{ text: 'Подключить на год 💸', callback_data: 'subscribe:year' }],
        [{ text: 'Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },
  menuExtend: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Продлить на месяц 💸', callback_data: 'subscribe:month' }],
        [
          {
            text: 'Продлить на пол года 💸',
            callback_data: 'subscribe:halfAyear',
          },
        ],
        [{ text: 'Продлить на год 💸', callback_data: 'subscribe:year' }],
        [{ text: 'Главная страница', callback_data: 'goMainScene' }],
      ],
    },
  },
  buySubscribe: (price: number) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `Получить ссылку на оплату ${price} руб. 💸`,
            callback_data: `buySubscribe:${price}`,
          },
        ],
        [{ text: 'Отмена', callback_data: 'goSubscribeScene' }],
      ],
    },
  }),
  paymentButton: (url: string) => ({
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Ссылка на оплату в ЮМани 💸',
            url: `${url}`,
          },
        ],
        [{ text: 'Отмена', callback_data: 'goSubscribeScene' }],
      ],
    },
  }),
};
