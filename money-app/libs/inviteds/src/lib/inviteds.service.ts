import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import * as crypto from 'crypto';

import { Inviteds, IInviteds } from '@money-app/entities';

import { InvitedsInputDto } from './dto/inviteds.dto';
import { CreatedInviteData } from './invite.interface';
import { addDays } from 'date-fns';

@Injectable()
export class InvitedsService {
  constructor(
    @InjectRepository(Inviteds)
    private readonly InvitedsRepo: Repository<Inviteds>
  ) {}

  async findOne(id: string) {
    const res = await this.InvitedsRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }
    return res;
  }

  /**
   * Найти приглашению по хешу
   * @param hash хеш приглашения
   * @returns
   */
  gerByHash(hash: string) {
    return this.InvitedsRepo.createQueryBuilder().where({ hash }).getOne();
  }

  /**
   * Создать приглашение
   * @param data Данные для создания приглашения
   */
  async create(data: CreatedInviteData): Promise<IInviteds | null> {
    const hash = this.createHash(data);

    const result = await this.InvitedsRepo.createQueryBuilder()
      .insert()
      .values({
        accountId: data.accountId,
        groupId: data.groupId,
        phone: data.phone,
        email: data.email,
        hash,
      })
      .returning('*')
      .execute();

    return result.raw[0] ?? null;
  }

  async updateInvite(id: string) {
    const currentDate = new Date();
    const res = await this.InvitedsRepo.createQueryBuilder()
      .update(Inviteds)
      .set({ validity: currentDate, used: true }) // Обновляем поле validity текущей датой и ставим метку, что использовано
      .where('id = :id', { id })
      .execute();
  }

  async extendInvite(id: string) {
    const currentDate = new Date();
    const newValidity = addDays(currentDate, 14);
    const res = await this.InvitedsRepo.createQueryBuilder()
      .update(Inviteds)
      .set({ validity: newValidity }) // Обновляем поле validity + 14 дней
      .where('id = :id', { id })
      .execute();

    return res.affected;
  }

  async createInviteds(payload: InvitedsInputDto): Promise<IInviteds> {
    const res = await this.InvitedsRepo.createQueryBuilder()
      .insert()
      .values(payload)
      .orIgnore()
      .returning('*')
      .execute();
    return res.raw[0] ?? null;
  }

  async getInvitedsByPhone(phone: string): Promise<IInviteds | null> {
    const Inviteds = await this.InvitedsRepo.createQueryBuilder('Inviteds')
      .where('Inviteds.phone = :phone', { phone })
      .getOne();

    return Inviteds || null;
  }

  async findAllByClientId(accountId: string): Promise<IInviteds[]> {
    return this.InvitedsRepo.find({ where: { accountId } });
  }

  async findActualByClientId(accountId: string): Promise<IInviteds[]> {
    const currentDate = new Date();
    return this.InvitedsRepo.find({
      where: { accountId, validity: MoreThanOrEqual(currentDate), used: false },
    });
  }
  async findUsedByClientId(accountId: string): Promise<IInviteds[]> {
    return this.InvitedsRepo.find({
      where: { accountId, used: true },
    });
  }

  async findExpiredByClientId(accountId: string): Promise<IInviteds[]> {
    const currentDate = new Date();
    return this.InvitedsRepo.find({
      where: { accountId, validity: LessThan(currentDate), used: false },
    });
  }

  async deleteInviteds(id: string) {
    const res = await this.InvitedsRepo.delete(id);
    return res.affected === 1;
  }

  /**
   * Создать кеш данных приглашения
   * @param data Данные для создания кеша
   * @returns хеш
   */
  private createHash(data: CreatedInviteData) {
    let hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(data))
      .digest('base64');

    hash = hash.replace(/[^a-zA-Z0-9]+/g, '');

    return hash;
  }
}
