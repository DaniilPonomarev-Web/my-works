import { HttpService } from '@nestjs/axios';
import { generateShortHash, IReceipt } from '@money-app/shared';
import { ChecksData } from '@money-app/entities';

import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProverkachekaService {
  constructor(
    @InjectRepository(ChecksData)
    private readonly checksRepo: Repository<ChecksData>,
    private readonly httpService: HttpService
  ) {}

  async addCheck(chatId: number, qrText: string, imageUrl: string) {
    const check = await this.getCheckByChatIdAndQrText(chatId, qrText);

    if (check) {
      return null;
    }
    const currentDate = new Date().toISOString();
    const hash = generateShortHash(chatId.toString(), qrText, currentDate);

    const res = await this.checksRepo
      .createQueryBuilder()
      .insert()
      .values({
        chatId,
        qrText,
        imageUrl,
        uuidCheckData: hash,
      })
      .returning('*')
      .execute();
    return res?.raw[0] ?? null;
  }

  async deleteByHash(hash: string) {
    const deleteResult = await this.checksRepo
      .createQueryBuilder()
      .delete()
      .from(ChecksData)
      .where('uuidCheckData = :hash', { hash })
      .execute();

    const isDeleted =
      deleteResult &&
      deleteResult.affected != null &&
      deleteResult.affected > 0;

    return isDeleted;
  }

  async getCheckByChatIdAndQrText(
    chatId: number,
    qrText: string
  ): Promise<string | boolean> {
    const check = await this.checksRepo.findOne({
      where: { chatId, qrText },
    });

    if (!check) {
      return false;
    }
    console.debug('Чек найден:', check.uuidCheckData);
    return check.uuidCheckData;
  }
  /* Получение клиента */
  async getCheckData(qrText: any): Promise<IReceipt | null> {
    const requestData = {
      token: process.env['PROVERKACHEKA_TOKEN'],
      qrraw: qrText,
    };

    try {
      const response = await this.httpService.axiosRef.post(
        `${process.env['PROVERKACHEKA_HREF']}/check/get`,
        requestData,
        {
          headers: {
            Cookie: 'ENGID=1.1',
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data as IReceipt;
    } catch (error) {
      console.warn(error);

      if ((error as NodeJS.ErrnoException).code === 'ENOTFOUND') {
        return null;
      }
      return null;
    }
  }
}
