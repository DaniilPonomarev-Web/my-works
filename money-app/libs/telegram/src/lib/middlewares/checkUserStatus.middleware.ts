import { Client } from 'pg';

export class UserControll {
  connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  private async queryDatabase(query: string) {
    const client = new Client(this.connectionString);
    try {
      await client.connect();
      const result = await client.query(query);
      return result?.rows[0] ?? null;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await client.end();
    }
  }

  private async getUser(chatId: string) {
    const query = `
      SELECT "chatId", "accountId", "status"
      FROM public."user"
      WHERE "chatId" = '${chatId}';
    `;
    return this.queryDatabase(query);
  }

  private async getUserAccount(accountId: string) {
    const query = `
      SELECT blocked
      FROM public."account"
      WHERE "id" = '${accountId}';
    `;
    return this.queryDatabase(query);
  }

  middleware() {
    return async (ctx, next) => {
      try {
        const chatId =
          ctx.update?.message?.from?.id ?? ctx.update.callback_query.from.id;

        const user = await this.getUser(chatId);

        if (!user) {
          return next();
        }
        if (!user.status) {
          await ctx.replyWithHTML(
            '<b>Вам отказано в доступе в бот. Обратитесь к администратору аккаунта.</b>'
          );
          return;
        }

        const userAccount = await this.getUserAccount(user.accountId);

        if (!userAccount) {
          return next();
        }
        if (userAccount.blocked) {
          await ctx.replyWithHTML(
            '<b>Вам отказано в доступе в бот. Главный аккаунт заблокирован. Обратитесь к администратору аккаунта.</b>'
          );
          return;
        }

        return next();
      } catch (error) {
        console.error('Middleware: UserControll ', error);
        await ctx.replyWithHTML(
          '<b>Произошла ошибка проверки пользователя. Попробуйте повторить позже.</b>'
        );
      }
    };
  }
}
