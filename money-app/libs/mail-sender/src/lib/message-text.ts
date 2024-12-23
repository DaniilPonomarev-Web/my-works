import { InviteEmail } from '@money-app/shared';

export const emailMessageTemplates = {
  subjectNewInviteRequest: () => `Поступило приглашение в бота`,
  messageNewInviteRequest: (data: InviteEmail) => `
    Сылка на бота:${data.link}
    ___________________________________
  `,
};
