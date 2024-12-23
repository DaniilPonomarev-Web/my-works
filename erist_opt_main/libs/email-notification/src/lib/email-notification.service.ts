import { OrderDTO } from '@erist-opt/shared';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { AppLoggerLoki } from '@erist-opt/logs';

@Injectable()
export class EmailNotificationService {
  private readonly logger = new Logger(EmailNotificationService.name);

  constructor(
    private readonly mailerService: MailerService,
    private AppLoggerLoki: AppLoggerLoki
  ) {}

  async sendMessageRegistration(data: any) {
    try {
      const mailData: ISendMailOptions = {
        from: process.env['SEND_EMAIL'],
        to: data.emil,
        subject: this.subjectRegistration(),
        text: this.messageRegistration(data),
      };
      return await this.mailerService.sendMail(mailData);
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при отправке письма пользоватнлю при регистрации ${error.message}`,
          'api'
        );
        return null;
      }
      this.AppLoggerLoki.error(
        `Ошибка при отправке письма пользоватнлю при регистрации`,
        'api'
      );

      return null;
    }
  }

  private subjectRegistration() {
    return `Вы зарегистрированы на оптовом сайте Erist Store`;
  }

  private messageRegistration(data: any) {
    const message = `Ваш логин для входа:

        Логин: mail@mail.ru
    `;
    return message;
  }

  async sendMessageNewOrderAdmin(data: OrderDTO) {
    try {
      const mailData: ISendMailOptions = {
        from: process.env['SEND_EMAIL'],
        to: process.env['SEND_EMAIL'],
        // to: process.env['SEND_EMAIL_TO'],
        subject: this.subjectNewOrderAdmin(data),
        text: this.messageNewOrderAdmin(data),
      };
      const message = await this.mailerService.sendMail(mailData);
      return message;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при отправке письма пользоватнлю при оформлении заказа после создания инвойса ${error.message}`,
          'api'
        );
        return null;
      }
      this.AppLoggerLoki.error(
        `Ошибка при отправке письма пользоватнлю при оформлении заказа после создания инвойса`,
        'api'
      );
    }
  }
  private subjectNewOrderAdmin(order: OrderDTO) {
    return `НОВЫЙ ЗАКАЗ №${order.currentID}`;
  }
  private messageNewOrderAdmin(order: OrderDTO) {
    const message = `
    №${order.currentID} 
    Сумма заказа ${order.total} Руб.
    Размер скидки ${order.discount ?? 0} Руб.
    Итого: ${order.totalAmount} Руб.
    Счет на оплату сформирован ${order.hrefForInvoice}
    `;
    return message;
  }

  async sendMessageNewOrder(data: OrderDTO) {
    try {
      const mailData: ISendMailOptions = {
        from: process.env['SEND_EMAIL'],
        to: data.user.email,
        // to: process.env['SEND_EMAIL_TO'],
        subject: this.subjectNewOrder(data),
        text: this.messageNewOrder(data),
      };
      const message = await this.mailerService.sendMail(mailData);
      return message;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при отправке письма пользоватнлю при оформлении заказа после создания инвойса ${error.message}`,
          'api'
        );
        return null;
      }
      this.AppLoggerLoki.error(
        `Ошибка при отправке письма пользоватнлю при оформлении заказа после создания инвойса`,
        'api'
      );
    }
  }

  private subjectNewOrder(order: OrderDTO) {
    return `Вы cовершили заказ на оптовом сайте erist.store №${order.currentID}`;
  }

  private messageNewOrder(order: OrderDTO) {
    const message = `
    Ваш заказ  №${order.currentID} 
    Сумма заказа ${order.total} Руб.
    Размер скидки ${order.discount ?? 0} Руб.
    Итого: ${order.totalAmount} Руб.
    Счет на оплату создан и находится в вашем личном кабинете (Личный кабинет -> Заказы -> "Скачать счет на оплату").
    `;
    return message;
  }

  async sendMessageResetPassword(data: any): Promise<boolean> {
    try {
      const mailData: ISendMailOptions = {
        from: process.env['SEND_EMAIL'],
        to: data.email,
        subject: this.subjectResetPassword(),
        text: this.messageResetPassword(data.code),
      };
      const message = await this.mailerService.sendMail(mailData);
      return !!message; //true
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Ошибка при отправке письма пользоватнлю при восстановлении пароля ${error.message}`,
          'api'
        );
        return false;
      }
      this.AppLoggerLoki.error(
        `Ошибка при отправке письма пользоватнлю при восстановлении пароля`,
        'api'
      );
      return false;
    }
  }

  private subjectResetPassword() {
    return `Восстановление пароля на сайте  opt.erist.store `;
  }

  private messageResetPassword(code: number) {
    const message = `
    Код - ${code} 
    Если вы не восстанавливали пароль - проигнорируйте письмо. 
   
   
   
   
    ______________________________________





    C уважением команда erist.store.
    `;
    return message;
  }
}
