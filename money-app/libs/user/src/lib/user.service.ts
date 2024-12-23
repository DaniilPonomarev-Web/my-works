import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '@money-app/entities';
import { RedisService } from '@money-app/redis';
import * as crypto from 'crypto';
import { IInviteHrefInterface, InviteHrefInterface } from '@money-app/shared';
import { GroupService } from '@money-app/group';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly redisService: RedisService
  ) {}

  /**
   * Получить Пользователя по ID телеграмм
   * @param chatId ID пользователя телеграмма
   * @returns
   */
  async getByChatId(chatId: number) {
    if (chatId === undefined) {
      return null;
    }

    if (!chatId) {
      return null;
    }
    const user = await this.userRepo.findOne({ where: { chatId } });
    if (!user) {
      return null;
    }
    return user;
  }

  async getAllGroupsByChatId(chatId: number) {
    const groups = await this.userRepo.findOne({ where: { chatId } });
    if (!groups) {
      return null;
    }
    return groups || null;
  }

  async getAllUsersByGroupId(groupId: string) {
    const users = await this.userRepo.find({ where: { groupId } });
    if (!users) {
      return null;
    }
    return users || null;
  }

  /**
   * Создать пользователя
   * @param accountId ID аккаунта
   * @param groupId ID группы
   * @param chatId ID телеграмм
   * @param firstName Имя
   * @param lastName Фамилия
   * @param phone Телефон
   * @param role Роль
   */
  async create(
    accountId: string,
    groupId: string,
    chatId: number,
    firstName: string,
    lastName: string,
    phone: string,
    role: UserRole
  ) {
    const result = await this.userRepo
      .createQueryBuilder()
      .insert()
      .values({
        accountId,
        groupId,
        chatId,
        firstName,
        lastName,
        phone,
        role,
        status: true,
      })
      .returning('*')
      .execute();

    return result?.raw[0] ?? null;
  }

  async findOne(id: string) {
    const res = await this.userRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  async setInviteHrefUser(
    payload: IInviteHrefInterface
  ): Promise<InviteHrefInterface> {
    const cleanedphone = payload.phone.replace(/\+/g, '');
    const hashedphone = crypto
      .createHash('sha256')
      .update(cleanedphone)
      .digest('hex');
    // Генерируем и кешируем ссылку с данными
    const inviteHrefLink = await this.redisService.generateAndCacheInviteLink(
      hashedphone,
      payload
    );

    return { inviteHref: inviteHrefLink }; // Здесь возвращается объект с полем "link"
  }
  catch(error) {
    throw new Error('Ошибка при генерации ссылки и кешировании данных');
  }

  async getGroupsByChatId(chatId: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.group', 'group')
      .where('user.chatId = :chatId', { chatId })
      .getOne();
    return user?.group || null;
  }

  async getGroupByChatId(chatId: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.group', 'group')
      .where('user.chatId = :chatId', { chatId })
      .getOne();
    return user?.group || [];
  }

  async getAccountByChatId(chatId: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.account', 'account')
      .where('user.chatId = :chatId', { chatId })
      .getOne();
    return user?.account || null;
  }

  async getUserByAccount(accountId: string, role: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.accountId = :accountId', { accountId })
      .andWhere('user.role = :role', { role })
      .getOne();
    return user || null;
  }

  async getUsersByAccount(accountId: string, role: string) {
    const users = await this.userRepo
      .createQueryBuilder('user')
      .where('user.accountId = :accountId', { accountId })
      .andWhere('user.role = :role', { role })
      .getMany();
    return users || null;
  }

  async getAllUsersByAccount(accountId: string) {
    const users = await this.userRepo
      .createQueryBuilder('user')
      .where('user.accountId = :accountId', { accountId })
      .getMany();
    return users || null;
  }

  async getUsersByAccountAndGroupId(accountId: string, groupId: string) {
    const status = true;
    const role = 'user';
    const users = await this.userRepo
      .createQueryBuilder('user')
      .where('user.accountId = :accountId', { accountId })
      .andWhere('user.groupId = :groupId', { groupId })
      .andWhere('user.status = :status', { status })
      // .andWhere('user.role = :role', { role })
      .getMany();
    return users || null;
  }

  async getClientAndGroupByChatId(chatId: string) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.client', 'client')
      .innerJoinAndSelect('user.group', 'group')
      .where('user.chatId = :chatId', { chatId })
      .getOne();

    return user || null;
  }

  async updateUserStatus(chatId: number) {
    const user = await this.userRepo.findOne({
      where: { chatId },
    });
    if (!user) {
      return null;
    }
    user.status = !user.status;
    return this.userRepo.save(user);
  }

  async updateUserRole(chatId: number) {
    const user = await this.userRepo.findOne({
      where: { chatId },
    });
    if (!user) {
      return null;
    }
    const role = user?.role;

    user.role = role === 'admin' ? 'user' : 'admin';
    return this.userRepo.save(user);
  }

  async updateUserGroup(groupId: string, chatId: number) {
    const user = await this.userRepo.findOne({
      where: { chatId },
    });

    if (!user) {
      return null;
    }
    user.groupId = groupId;
    try {
      const userNew = await this.userRepo.save(user);
      console.log(userNew);
      return userNew;
    } catch (error) {
      console.error('Error saving user:', error);
      return null;
    }
  }
}
