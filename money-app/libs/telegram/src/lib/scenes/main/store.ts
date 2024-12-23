import {
  mainScneneMenuAdmin,
  mainScneneMenuDefault,
  mainScneneMenuUser,
  mainScneneMenuAdminWithoutSubscribe,
} from '../../menu';

export const replyMarkups = {
  getMainInlineKeyboard: (userRole: string, subscribe: boolean) => {
    let inlineKeyboard;
    switch (userRole) {
      case 'admin':
        if (subscribe) {
          inlineKeyboard = mainScneneMenuAdmin;
          break;
        }
        inlineKeyboard = mainScneneMenuAdminWithoutSubscribe;
        break;
      case 'user':
        if (subscribe) {
          inlineKeyboard = mainScneneMenuUser;
          break;
        }
        inlineKeyboard = mainScneneMenuDefault;
        break;
      default:
        if (subscribe) {
          inlineKeyboard = mainScneneMenuDefault;
          break;
        }
        inlineKeyboard = mainScneneMenuDefault;
        break;
    }
    const keyboard = { reply_markup: { inline_keyboard: inlineKeyboard } };
    return keyboard;
  },
};
