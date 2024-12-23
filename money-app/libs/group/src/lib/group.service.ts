import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group, IGroup } from '@money-app/entities';
import {
  GroupDto,
  InputCreateGroupDto,
  InputUpdateGroupDto,
} from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>
  ) {}

  async findOne(id: string) {
    const res = await this.groupRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }
    return res ?? null;
  }

  /**
   * Создать группу
   * @param accountId ID аккаунта
   * @param name Наименование группы
   * @returns
   */
  async create(accountId: string, name: string): Promise<Group | null> {
    const result = await this.groupRepo
      .createQueryBuilder()
      .insert()
      .values({
        name,
        accountId,
      })
      .returning('*')
      .execute();

    return result.raw[0] ?? null;
  }

  async createGroup(payload: InputCreateGroupDto): Promise<IGroup> {
    const res = await this.groupRepo
      .createQueryBuilder()
      .insert()
      .values(payload)
      .orIgnore()
      .returning('*')
      .execute();
    return res.raw[0] ?? null;
  }

  async getGroupByClientIdAndName(
    clientId: string,
    groupName: string
  ): Promise<IGroup | null> {
    const group = await this.groupRepo
      .createQueryBuilder('group')
      .where('group.clientId = :clientId', { clientId })
      .andWhere('group.name = :groupName', { groupName })
      .getOne();

    return group || null;
  }

  async getGroupByClientIdAndNameAndCateforyId(
    groupId: string,
    clientId: string,
    groupName: string
  ): Promise<IGroup | null> {
    const group = await this.groupRepo
      .createQueryBuilder('group')
      .where('group.clientId = :clientId', { clientId })
      .andWhere('group.name = :groupName', { groupName })
      .andWhere('group.id != :groupId', { groupId })
      .getOne();

    return group || null;
  }

  async updateGroup(payload: InputUpdateGroupDto) {
    const group = await this.findOne(payload.id);
    if (!group) {
      return null;
    }
    group.name = payload.name;
    group.status = payload.status;
    return this.groupRepo.save(group);
  }

  async updateGroupName(id: string, name: string) {
    const group = await this.findOne(id);
    if (!group) {
      return null;
    }
    group.name = name;
    return this.groupRepo.save(group);
  }

  async updateGroupStatus(id: string) {
    const group = await this.findOne(id);
    if (!group) {
      return null;
    }
    group.status = !group.status;
    const groupNew = await this.groupRepo.save(group);
    return groupNew;
  }

  /**
   * Получить все группы аккаунта
   * @param accountId ID аккаунта
   * @returns
   */
  async findAllEnabledByAccountId(accountId: string): Promise<IGroup[]> {
    const groups = await this.groupRepo.find({
      where: { accountId, status: true },
    });
    return groups;
  }

  async findAllByAccountId(accountId: string): Promise<IGroup[]> {
    const groups = await this.groupRepo.find({
      where: { accountId },
    });
    return groups;
  }
  async findAllDisabledByAccountId(accountId: string): Promise<IGroup[]> {
    const groups = await this.groupRepo.find({
      where: { accountId, status: false },
    });
    return groups;
  }
  async deleteGroup(id: string) {
    try {
      const res = await this.groupRepo.delete(id);
      console.log(res);

      if (!res) {
        return {
          success: false,
          message:
            'Не удалось удалить группу, возможно в ней есть пользователи',
        };
      }

      if (res.affected === 1) {
        return {
          success: true,
          message: 'Группа успешно удалена !',
        };
      } else {
        return { success: false, message: 'Нет такой группы' };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Не удалось удалить группу, возможно в ней есть пользователи',
      };
    }
  }
}
