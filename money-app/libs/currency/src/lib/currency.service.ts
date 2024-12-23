import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '@money-app/entities';


@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>
  ) {}

  async findOne(id: string) {
    const res = await this.currencyRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }

    return res;
  }
}
