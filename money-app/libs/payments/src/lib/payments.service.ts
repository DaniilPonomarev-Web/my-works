import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@money-app/entities';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepo: Repository<Payment>
  ) {}

  async findOne(id: string) {
    const res = await this.paymentsRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }

    return res;
  }
}
