import { Injectable } from '@nestjs/common';

import { YooKassaRespose } from '@money-app/shared';
import { getAuthHeader } from '@money-app/shared';
import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { IPayment, IPaymentData, Payment } from '@money-app/entities';
import { RabbitService } from '@money-app/rabbit';

@Injectable()
export class YookassaService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly httpService: HttpService,
    private readonly rabbitService: RabbitService
  ) {}

  async createPayment(
    amount: number,
    returnUrl: string,
    description: string
  ): Promise<YooKassaRespose | null> {
    const requestData = {
      amount: {
        value: amount.toFixed(2), // Assuming amount is a float, convert it to string with two decimal places
        currency: 'RUB',
      },
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },
      description,
    };
    console.log('Request Data:', requestData);

    try {
      const response = await this.httpService.axiosRef.post(
        'payments',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Idempotence-Key': crypto.randomBytes(26).toString('hex'),
            Authorization: `Basic ${getAuthHeader().base64Auth}`,
          },
        }
      );
      console.log('Response Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error Sending Request:', error);
      return null;
    }
  }

  /**
   * Создать платеж в базе
   * @interface IPayment
   */
  async createPaymentForUser(payload: IPaymentData): Promise<IPayment> {
    const result = await this.paymentRepo
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*')
      .execute();

    return result?.raw[0] ?? null;
  }

  async getPaymentById(id: string): Promise<IPayment | null> {
    console.log(id);
    const res = await this.paymentRepo.findOne({
      where: { id },
    });
    if (!res) {
      return null;
    }
    return res;
  }
  async updatePayment(id: string): Promise<IPayment | null> {
    const payment = await this.getPaymentById(id);
    if (!payment) {
      return null;
    }
    payment.status = true;
    return this.paymentRepo.save(payment);
  }

  async getPaymentByTransactionData(
    transactionData: string
  ): Promise<IPayment | null> {
    const res = await this.paymentRepo.findOne({
      where: { transactionData },
    });

    if (!res) {
      return null;
    }
    return res;
  }

  /**
   * Отправить сообщение об успешной нотификации
   * @param chatId Id пользователя телеграмм
   * @param message Тест сообщения
   * @returns
   */
  async sendPaymentSuccessNotification(paymentData: any) {
    if (!paymentData) {
      return;
    }
    console.log(paymentData);

    const amountPayment = paymentData.amount;
    const chatIdPayment = paymentData.chatId;
    const statusPayment = paymentData.status;
    const userIdPayment = paymentData.userId;
    if (statusPayment) {
      return;
    }

    // const transition = await this.updatePayment(
    //   chatIdPayment,
    //   amountPayment
    // );

    const message = `Платеж на сумму ${amountPayment} принят.`;

    // await this.rabbitService.sendPaymentSuccessNotification(
    //   chatIdPayment.toString(),
    //   message
    // );
    // await this.yookassaService.updatePayment(paymentData.id);

    console.log(
      `Sending payment success notification to user ${chatIdPayment}. Amount: ${typeof amountPayment}`
    );
  }
}
