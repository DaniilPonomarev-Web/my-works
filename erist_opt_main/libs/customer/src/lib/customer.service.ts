import {
  Customer,
  ICreateCustomer,
  ICustomer,
  ICustomerWithoutPass,
  IUpdateCustomer,
} from '@erist-opt/shared';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) {}

  /**
   * Находит пользователя по номеру телефона.
   * @param phone Номер телефона пользователя.
   * @returns {Promise<ICustomer | null>} Промис с объектом пользователя или null, если пользователь не найден.
   *
   * Этот метод ищет пользователя в базе данных по его номеру телефона и возвращает соответствующий объект пользователя.
   */
  async findOneByLogin(login: string): Promise<ICustomer | null> {
    const customer = await this.customerRepo.findOne({ where: { login } });
    if (!customer) {
      return customer;
    }
    return customer;
  }

  /**
   * Находит пользователя по номеру id.
   * @param id uuid телефона пользователя.
   * @returns {Promise<ICustomer | null>} Промис с объектом пользователя или null, если пользователь не найден.
   *
   * Этот метод ищет пользователя в базе данных по его номеру телефона и возвращает соответствующий объект пользователя.
   */
  async findOneById(id: string): Promise<ICustomerWithoutPass | null> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      return null;
    }
    return customer;
  }

  /**
   * Возвращает всех пользователей вместе с компанией и адресами.
   * @returns {Promise<ICustomerWithoutPass[]>} Промис с массивом объектов пользователей.
   *
   * Этот метод возвращает всех пользователей админки из базы данных.
   */
  async getAllCustomers(): Promise<ICustomerWithoutPass[]> {
    const customers = await this.customerRepo.find();
    return customers;
  }

  /**
   * Создает нового пользователя.
   * @param createCustomerDto DTO для создания пользователя.
   * @returns {Promise<Customer>} Промис с созданным объектом пользователя.
   */
  async createCustomer(createCustomerDto: ICreateCustomer): Promise<Customer> {
    const existingCustomer = await this.customerRepo.findOne({
      where: { email: createCustomerDto.email },
    });
    if (existingCustomer) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }
    const originalPassword = createCustomerDto.password;
    const hashedPassword = await hash(originalPassword, 10);

    const newCustomer = this.customerRepo.create({
      ...createCustomerDto,
      password: hashedPassword,
    });
    return await this.customerRepo.save(newCustomer);
  }

  /**
   * Обновляет пользователя.
   * @param id Идентификатор пользователя.
   * @param updateCustomerDto DTO для обновления пользователя.
   * @returns {Promise<Customer>} Промис с обновленным объектом пользователя.
   */
  async updateCustomer(updateCustomerDto: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id: updateCustomerDto.id },
    });
    if (!customer) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (updateCustomerDto.password === null) {
      updateCustomerDto.password = customer.password;
    }
    const originalPassword = updateCustomerDto.password;
    const hashedPassword = await hash(originalPassword, 10);
    updateCustomerDto.password = hashedPassword;
    // Обновляем только те поля, которые присутствуют в DTO
    Object.assign(customer, updateCustomerDto);

    return this.customerRepo.save(customer);
  }

  /**
   * Удаляет пользователя.
   * @param id Идентификатор пользователя.
   * @returns {Promise<void>} Промис, завершающийся после удаления.
   */
  async deleteCustomer(id: string): Promise<void> {
    const result = await this.customerRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  /**
   * Сортирует массив пользователей админки по указанному полю и порядку.
   * @param customers Массив пользователей админки для сортировки.
   * @param sortBy Поле, по которому нужно отсортировать пользователей.
   * @param sortOrder Порядок сортировки ('asc' - по возрастанию, 'desc' - по убыванию).
   * @returns {Promise<ICustomerWithoutPass[]>} Промис с отсортированным массивом пользователей.
   *
   * Этот метод сортирует переданный массив пользователей по указанному полю и порядку.
   */
  async sortUsers(
    customers: ICustomerWithoutPass[],
    sortBy: string,
    sortOrder: string
  ): Promise<ICustomerWithoutPass[]> {
    return customers.sort((a: any, b: any) => {
      if (sortBy === 'lastLogin') {
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

  // /**
  //  * Обновляет дату последнего входа пользователя по номеру телефона.
  //  * @param phone Номер телефона пользователя.
  //  * @returns {Promise<ICustomer | null>} Промис с объектом пользователя или null, если пользователь не найден.
  //  *
  //  * Этот метод находит пользователя по его номеру телефона и обновляет дату его последнего входа.
  //  */
  // async updateCustomerLastLogin(id: string) {
  //   const customer = await this.customerRepo.findOne({ where: { id } });
  //   if (!customer) {
  //     return null;
  //   }
  //   customer.lastLogin = new Date();
  //   const updateCustomer = await this.customerRepo.save(customer);
  //   if (!updateCustomer) {
  //     return null;
  //   }
  //   const updatedCustomer = await this.customerRepo.findOne({ where: { id } });
  //   return updatedCustomer;
  // }
}
