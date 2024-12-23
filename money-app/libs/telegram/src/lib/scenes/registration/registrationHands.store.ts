export const regExtra = {
  sendRegistration: {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Подтвердить', callback_data: `action:send` }],
      ],
    },
  },
  phoneRequest: {
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
  },
};
