import { Injectable, Logger } from '@nestjs/common';
import { StringSession } from 'telegram/sessions';
import { Api, TelegramClient } from 'telegram';
import { clientParams } from './config';

const apiId = process.env['TELEGRAM_API_ID'] as any;
const apiHash = process.env['TELEGRAM_API_HASH'] as string;

@Injectable()
export class GramService {
  private logger = new Logger(GramService.name);

  get instance(): Promise<TelegramClient> {
    const result = async () => {
      const stringSession = new StringSession(
        process.env['TELEGRAM_SESSION_STRING']
      );
      const client = new TelegramClient(
        stringSession,
        22734968,
        apiHash,
        clientParams
      );
      try {
        await client.connect();
        return client;
      } catch (error) {
        this.logger.error(error);
        return client;
      }
    };
    return result();
  }

  /**
   * Получить данные клиента
   * @param username
   * @returns
   */
  async getFullUser(username: string | number) {
    const instans = await this.instance;
    this.logger.debug(`getFullUser -> ${username}`);
    try {
      const result = await instans.invoke(
        new Api.users.GetUsers({
          id: [username],
        })
      );
      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
