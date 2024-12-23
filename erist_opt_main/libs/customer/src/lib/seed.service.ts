import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { Customer } from '@erist-opt/shared';
import { CustomerRole } from '@erist-opt/shared';

@Injectable()
export class CustomerSeedService {
  private readonly logger = new Logger(CustomerSeedService.name);
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) {}

  async seedCustomer() {
    const existingUsers = await this.customerRepo.count();
    if (existingUsers === 0) {
      this.logger.log(
        `Пользователи в базе не найдены, создаем администратора.`
      );
      const hashedPassword = await hash('12345678AB', 10);
      const customer = new Customer(
        '7314403a-95af-11ee-b9d1-0242ac120002',
        'adminmaim',
        hashedPassword,
        'danyaponommaly@gmail.com',
        CustomerRole.Admin,
        new Date(),
        []
      );
      this.logger.debug('Отстроили админа с id - ' + customer.id);
      const saveUser = await this.customerRepo.save(customer);
      this.logger.debug('Сохранили админа с id - ' + customer.id);
      this.logger.debug({ saveUser });
    }
  }
}
