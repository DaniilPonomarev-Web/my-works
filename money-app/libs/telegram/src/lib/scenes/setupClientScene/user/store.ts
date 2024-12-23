import { messageForScenes } from '../../../message.patterns';

export const editUserActionsMarkup = (
  chatId: number,
  status: boolean,
  role: string
) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `${status ? 'Отключить' : 'Включить'}`,
          callback_data: `updStatusUser:${chatId}`,
        },
      ],
      [
        {
          text: `${
            role === 'admin'
              ? 'Сделать пользователем'
              : 'Сделать администратором'
          }`,
          callback_data: `updRoleUser:${chatId}`,
        },
      ],
      [{ text: 'Изменить группу', callback_data: `changeUserGroup:${chatId}` }],
    ],
  },
});

export const inviteUserMarkup = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '📧 Пригласить пользователя',
          callback_data: 'goInviteScene',
        },
      ],
    ],
  },
};

export const editUserGroupMarkup = (
  groupName: string,
  chacheGroupEditButton: string
) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `Группа: ${groupName}`,
          callback_data: `assignGroup:${chacheGroupEditButton}`,
        },
      ],
    ],
  },
});

export const getInvitedsUser = () => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Приглашения пользователей 💌',
          callback_data: 'SetupInvitedScene',
        },
      ],
    ],
  },
});

export const MenuUsersSettings = () => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Приглашения пользователей 💌',
          callback_data: 'SetupInvitedScene',
        },
      ],
      [
        {
          text: '📧 Пригласить пользователя',
          callback_data: 'goInviteScene',
        },
      ],
      [
        {
          text: '⚙️ ' + messageForScenes.editUsersScene.goSettings,
          callback_data: `goSetupClientScene`,
        },
      ],
    ],
  },
});
