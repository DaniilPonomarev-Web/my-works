import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DadataResponse,
  HttpExceptionMessagesGraphQL,
  IUpdateUserForAdmin,
  IUser,
  IUserWithoutPass,
  User,
} from '@erist-opt/shared';
import { RedisService } from '@erist-opt/redis';
import { DadataService } from '@erist-opt/dadata';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly redisService: RedisService,
    private readonly dadataService: DadataService
  ) {}

  /**
   * Возвращает всех пользователей вместе с компанией и адресами.
   * @returns {Promise<IUser[]>} Промис с массивом объектов пользователей.
   *
   * Этот метод возвращает всех пользователей из базы данных вместе с их компанией и адресами.
   */
  async getAllUsers(): Promise<IUser[]> {
    const users = await this.userRepo.find({
      relations: ['company', 'agreement'],
    });
    return users;
  }

  /**
   * Находит пользователя по id.
   * @param id ID пользователя.
   * @returns {Promise<IUser | null>} Промис с объектом пользователя или null, если пользователь не найден.
   *
   * Этот метод ищет пользователя в базе данных по его ID и возвращает соответствующий объект пользователя.
   */
  async findOneById(id: string): Promise<IUserWithoutPass | null> {
    if (!id) {
      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUserId);
    }
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['company', 'agreement'],
    });
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * Сортирует массив пользователей по указанному полю и порядку.
   * @param users Массив пользователей для сортировки.
   * @param sortBy Поле, по которому нужно отсортировать пользователей.
   * @param sortOrder Порядок сортировки ('asc' - по возрастанию, 'desc' - по убыванию).
   * @returns {Promise<IUser[]>} Промис с отсортированным массивом пользователей.
   *
   * Этот метод сортирует переданный массив пользователей по указанному полю и порядку.
   */
  async sortUsers(
    users: IUser[],
    sortBy: string,
    sortOrder: string
  ): Promise<IUser[]> {
    return users.sort((a: any, b: any) => {
      if (sortBy === 'lastLogin' || sortBy === 'registrationDate') {
        const dateA = new Date(a[sortBy]);
        const dateB = new Date(b[sortBy]);
        if (sortOrder === 'asc') {
          return dateA.getTime() - dateB.getTime();
        }
        if (sortOrder === 'desc') {
          return dateB.getTime() - dateA.getTime();
        }
      }
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy];
      }
      if (sortOrder === 'desc') {
        return b[sortBy] - a[sortBy];
      }
      return 0;
    });
  }

  /**
   * Обновляет статус пользователя (активен/неактивен).
   * @param id ID пользователя.
   * @returns {Promise<IUserWithoutPass | null>} Промис с объектом пользователя без пароля после обновления или null, если пользователь не найден.
   *
   * Этот метод обновляет статус пользователя (активен/неактивен) и возвращает обновленный объект пользователя без пароля.
   */
  async updateUserStatus(id: string): Promise<IUserWithoutPass | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.status = !user.status;
    await this.userRepo.save(user);
    const newUser = await this.findOneById(user.id);
    if (!newUser) {
      return null;
    }
    return newUser;
  }

  /**
   * Обновляет информацию о пользователе по его ID.
   * @param id ID пользователя.
   * @param updateUser Объект с обновляемыми данными пользователя.
   * @returns {Promise<IUserWithoutPass | null>} Промис с объектом пользователя без пароля после обновления или null, если пользователь не найден.
   *
   * Этот метод обновляет информацию о пользователе по его ID и возвращает обновленный объект пользователя без пароля.
   */
  async updateUser(
    updateUser: IUpdateUserForAdmin
  ): Promise<IUserWithoutPass | null> {
    await this.userRepo.update(updateUser.id, updateUser);
    const key = 'user:' + updateUser.id;
    await this.redisService.delUserData(key);

    const user = await this.findOneById(updateUser.id);
    if (!user) {
      return null;
    }
    return user;
  }

  async getSuggestionDataDadata(inn: string): Promise<DadataResponse | null> {
    const data = await this.dadataService.getDetailsByInn(inn);
    if (!data) {
      return null;
    }
    if (data.suggestions.length <= 0) {
      return null;
    }
    return data;
  }
}
