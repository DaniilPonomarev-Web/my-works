import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppLoggerLoki } from '@erist-opt/logs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { RedisService } from '@erist-opt/redis';
import {
  // AddressIdDTO,
  CodeForResetPasswordInputDTO,
  generateRandomCode,
  hashEmailForCode,
  HttpExceptionMessagesGraphQL,
  IChangePassword,
  // ICreateAddress,
  ICreateUser,
  // IUpdateAddress,
  IUpdateCompany,
  IUpdateUser,
  IUser,
  // IUserAddress,
  IUserWithoutPass,
  newUserPasswordInputDTO,
  NOTIFICATION_EMAIL_RESET_PASSWORD,
  User,
  // UserAddress,
  UserAgreement,
  UserCompany,
} from '@erist-opt/shared';
import { DadataService } from '@erist-opt/dadata';
import { KafkaService } from '@erist-opt/kafka';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    // @InjectRepository(UserAddress)
    // private readonly userAddressRepo: Repository<UserAddress>,
    @InjectRepository(UserCompany)
    private readonly userCompanyRepo: Repository<UserCompany>,
    @InjectRepository(UserAgreement)
    private readonly userAgreement: Repository<UserAgreement>,
    private readonly redisService: RedisService,
    private AppLoggerLoki: AppLoggerLoki,
    private readonly dadataService: DadataService,
    private readonly kafkaService: KafkaService
  ) {}

  async createUser(
    createUserInput: ICreateUser
  ): Promise<IUserWithoutPass | null> {
    this.AppLoggerLoki.log(`Создание нового пользователя`);

    const queryRunner = this.userRepo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const userCompany = this.userCompanyRepo.create(createUserInput.company);
      await queryRunner.manager.save(userCompany);

      const originalPassword = createUserInput.password;
      const hashedPassword = await hash(originalPassword, 10);
      const user = this.userRepo.create({
        ...createUserInput,
        password: hashedPassword,
        company: userCompany,
        // addresses: [],
      });
      await queryRunner.manager.save(user);

      // const userAddresses = createUserInput.addresses.map((address) =>
      //   this.userAddressRepo.create({ ...address, user })
      // );
      // await queryRunner.manager.save(userAddresses);

      // user.addresses = userAddresses;

      await queryRunner.commitTransaction();

      const savedUser = await this.findOneById(user.id);
      if (!savedUser) {
        this.AppLoggerLoki.warn(
          `Не удалось найти пользователя после создания ${user.id}`
        );

        return null;
      }
      const key = 'user:' + user.id;
      await this.redisService.setUserData(key, savedUser);
      this.AppLoggerLoki.log(
        `Пользователь успешно создан и сохранен ${user.id}`
      );

      return savedUser;
    } catch (error) {
      console.warn(error);

      this.AppLoggerLoki.warn('Ошибка при создании пользователя');
      await queryRunner.rollbackTransaction();
      return null;
    } finally {
      await queryRunner.release();
    }
  }

  async signup(createUserInput: ICreateUser): Promise<IUserWithoutPass | null> {
    this.AppLoggerLoki.warn(
      `Регистрация нового пользователя ${createUserInput.email}`
    );

    const newUser = await this.createUser(createUserInput);
    return newUser;
  }

  async findOnePhone(phone: string): Promise<IUser | null> {
    this.AppLoggerLoki.warn(`Поиск пользователя по телефону ${phone}`);

    const user = await this.userRepo.findOne({ where: { phone } });
    if (!user) {
      this.AppLoggerLoki.warn(`Пользователь не найден по телефону ${phone}`);

      return null;
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    this.AppLoggerLoki.log(`Поиск пользователя по email ${email}`, 'api');

    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['company'],
    });
    if (!user) {
      this.AppLoggerLoki.warn(`Пользователь не найден по email ${email}`);

      return null;
    }
    return user;
  }

  async findOneById(id: string): Promise<IUserWithoutPass | null> {
    this.AppLoggerLoki.warn(`Поиск пользователя по ID ${id}`);

    if (!id) {
      this.AppLoggerLoki.warn(` Отсутствует ID пользователя`);

      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUserId);
    }
    const key = 'user:' + id;

    const userCached = await this.redisService.getUserData(key);
    if (userCached) {
      this.AppLoggerLoki.warn(`Найден пользователь в кэше ${id}`);

      return userCached;
    }
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['company', 'agreement'],
    });

    if (!user) {
      this.AppLoggerLoki.warn(`Пользователь не найден по ID ${id}`);

      return null;
    }
    await this.redisService.setUserData(key, user);
    this.AppLoggerLoki.warn(
      `Пользователь успешно найден и сохранен в кэш ${id}`
    );

    return user;
  }

  async findOneByIdWithoutCache(id: string): Promise<IUserWithoutPass | null> {
    this.AppLoggerLoki.warn(`Поиск пользователя по ID без кэша ${id}`);

    if (!id) {
      this.AppLoggerLoki.warn(`Отсутствует ID пользователя`);

      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUserId);
    }

    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      this.AppLoggerLoki.warn(`Пользователь не найден по ID ${id}`);

      return null;
    }
    return user;
  }

  async updateUserLastLogin(id: string) {
    this.AppLoggerLoki.warn(
      `Обновление даты последнего входа пользователя ${id}`
    );

    const key = 'user:' + id;

    const user = await this.findOneById(id);
    if (!user) {
      this.AppLoggerLoki.warn(
        `Пользователь не найден для обновления даты последнего входа ${id}`
      );

      return null;
    }
    user.lastLogin = new Date();
    const updateUser = await this.userRepo.save(user);
    if (!updateUser) {
      this.AppLoggerLoki.error(
        'Не удалось обновить дату последнего входа пользователя',
        id
      );
      return null;
    }
    await this.redisService.delUserData(key);
    const updateDUser = await this.findOneById(id);
    return updateDUser;
  }

  async updateUser(
    id: string,
    updateUser: IUpdateUser
  ): Promise<IUserWithoutPass | null> {
    this.AppLoggerLoki.warn(`Обновление информации о пользователе ${id}`);
    await this.userRepo.update(id, updateUser);
    const key = 'user:' + id;
    await this.redisService.delUserData(key);

    const user = await this.findOneById(id);
    if (!user) {
      this.AppLoggerLoki.warn(`Пользователь не найден после обновления ${id}`);
      return null;
    }
    return user;
  }

  async changePassword(
    id: string,
    changePasswordDto: IChangePassword
  ): Promise<IUserWithoutPass | null> {
    this.AppLoggerLoki.log('Изменение пароля пользователя', id);
    const key = 'user:' + id;
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      this.AppLoggerLoki.warn(
        `Пользователь не найден для изменения пароля ${id}`
      );
      return null;
    }

    if (await compare(user.password, changePasswordDto.currentPassword)) {
      this.AppLoggerLoki.error('Текущий пароль неверен', id);
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.user.notOldPassNotNewPassword
      );
    }
    const originalPassword = changePasswordDto.newPassword;
    const password = await hash(originalPassword, 10);
    await this.userRepo.update(id, { password });
    await this.redisService.delUserData(key);
    const userUpdated = await this.findOneById(id);
    return userUpdated;
  }

  async addAddress(
    id: string
    // UserAddressInputDTO: ICreateAddress
  ): Promise<IUserWithoutPass | null> {
    this.AppLoggerLoki.log('Добавление адреса пользователю', id);
    const key = 'user:' + id;
    const user = await this.findOneById(id);
    if (!user) {
      this.AppLoggerLoki.warn(
        `Пользователь не найден для добавления адресаi ${id}`
      );
      return null;
    }
    await this.redisService.delUserData(key);
    // const address = this.userAddressRepo.create({
    //   ...UserAddressInputDTO,
    //   user,
    // });

    // await this.userAddressRepo.save(address);

    const userUpdated = await this.findOneById(id);

    if (!userUpdated) {
      this.AppLoggerLoki.error(
        'Пользователь не найден после добавления адреса',
        id
      );
      return null;
    }

    return userUpdated;
  }

  /**
   * Обновляет данные компании пользователя.
   * @param id ID пользователя.
   * @param updateCompanyDto Объект с обновляемыми данными компании пользователя.
   * @returns {Promise<IUserWithoutPass | null>} Промис с объектом пользователя без пароля после обновления данных компании или null, если пользователь или его компания не найдены.
   *
   * Этот метод обновляет данные компании пользователя и возвращает обновленный объект пользователя без пароля.
   */
  async updateCompany(
    id: string,
    updateCompanyDto: IUpdateCompany
  ): Promise<IUserWithoutPass | null> {
    const key = 'user:' + id;
    const user = await this.findOneById(id);
    if (!user) {
      this.AppLoggerLoki.error(
        'Пользователь не найден для обновления компании',
        id
      );
      return null;
    }
    const company = user.company;
    if (!company) {
      this.AppLoggerLoki.warn(
        `Компания пользователя не найдена для обновления ${id}`
      );
      return null;
    }
    await this.redisService.delUserData(key);
    await this.userCompanyRepo.update(company.id, updateCompanyDto);
    const userUpdated = await this.findOneById(id);
    if (!userUpdated) {
      this.AppLoggerLoki.warn(`Компания пользователя не обновлена ${id}`);
      return null;
    }
    return userUpdated;
  }

  /**
   * Обновляет адрес пользователя.
   * @param userId ID пользователя.
   * @param updateAddressDto Объект с обновляемыми данными адреса пользователя.
   * @returns {Promise<IUserWithoutPass | null>} Промис с объектом пользователя без пароля после обновления адреса или null, если пользователь или его адрес не найдены.
   *
   * Этот метод обновляет адрес пользователя и возвращает обновленный объект пользователя без пароля.
   */
  async updateAddress(
    userId: string
    // updateAddressDto: IUpdateAddress
  ): Promise<IUserWithoutPass | null> {
    const key = 'user:' + userId;
    const user = await this.findOneById(userId);
    if (!user) {
      this.AppLoggerLoki.warn(
        `Пользователь не найден для обновления адреса${userId}`
      );
      return null;
    }
    // const address = await this.userAddressRepo.findOne({
    //   where: { id: updateAddressDto.id },
    // });
    // if (!address) {
    //   this.AppLoggerLoki.warn(
    //     `Адрес пользователя во время изменения не найден ${userId}`
    //   );
    //   return null;
    // }
    // Object.assign(address, updateAddressDto);
    // await this.userAddressRepo.save(updateAddressDto);
    await this.redisService.delUserData(key);
    const userUpdated = await this.findOneById(userId);
    if (!userUpdated) {
      this.AppLoggerLoki.warn(
        `Адрес пользователя во время изменения не изменен из-за ошибки обновления пользователя ${userId}`
      );

      return null;
    }

    return userUpdated;
  }

  /**
   * Удаляет адрес пользователя.
   * @param userId ID пользователя.
   * @param addressIdDto Объект с ID удаляемого адреса пользователя.
   * @returns {Promise<IUserWithoutPass | null>} Промис с объектом пользователя без пароля после удаления адреса или null, если пользователь или его адрес не найдены.
   *
   * Этот метод удаляет адрес пользователя и возвращает обновленный объект пользователя без пароля.
   */
  async deleteAddress(
    userId: string
    // addressIdDto: AddressIdDTO
  ): Promise<IUserWithoutPass | null> {
    const key = 'user:' + userId;
    const user = await this.findOneById(userId);
    if (!user) {
      this.AppLoggerLoki.warn(
        `Пользователь не найден во время удаления адреса ${userId}`
      );
      return null;
    }
    // const address = await this.userAddressRepo.findOne({
    //   where: { id: addressIdDto.id, user: { id: userId } },
    // });
    // if (!address) {
    //   this.AppLoggerLoki.error('Ошибка удаления адреса пользователя', userId);
    //   return null;
    // }
    // await this.userAddressRepo.remove(address);
    await this.redisService.delUserData(key);
    const userUpdated = await this.findOneById(userId);
    if (!userUpdated) {
      return null;
    }
    return userUpdated;
  }

  /**
   * Находит пользователя по номеру телефона.
   * @param phone Номер телефона пользователя.
   * @returns {Promise<IUser | null>} Промис с объектом пользователя или null, если пользователь не найден.
   *
   * Этот метод ищет пользователя в базе данных по его номеру телефона и возвращает соответствующий объект пользователя.
   */
  async checkOneByPhone(phone: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { phone } });
    if (!user) {
      return true;
    }
    return false;
  }

  /**
   * Обновляет договор пользователя на подписанный.
   * @param userId ID пользователя.
   *
   * Этот метод обновляет договор пользователя на подписанный.
   */
  /**
   * Обновляет договор пользователя на подписанный.
   * @param userId ID пользователя.
   * @returns {Promise<boolean>} Промис с результатом обновления.
   */
  async updateAgreement(userId: string): Promise<boolean> {
    const key = 'user:' + userId;
    const user = await this.findOneById(userId);
    if (!user) {
      return false;
    }

    // Проверяем, есть ли у пользователя соглашение
    let agreement;
    if (user.agreement?.id) {
      agreement = await this.userAgreement.findOne({
        where: { id: user.agreement.id },
      });
    }

    if (!agreement) {
      // Создаем новое соглашение
      agreement = this.userAgreement.create({
        signed: true,
        date: new Date(),
      });

      // Сохраняем новое соглашение
      await this.userAgreement.save(agreement);

      // Присваиваем соглашение пользователю
      user.agreement = agreement;
      await this.userRepo.save(user);
    } else {
      // Обновляем существующее соглашение
      agreement.signed = true;
      agreement.date = new Date();

      await this.userAgreement.save(agreement);
    }

    // Удаляем данные из кеша
    await this.redisService.delUserData(key);

    // Проверяем обновленного пользователя
    const userUpdated = await this.findOneById(userId);
    if (!userUpdated) {
      return false;
    }

    return true;
  }
  /**
   * Находит пользователя по email.
   * @param email Email пользователя.
   * @returns {Promise<boolean>} Промис с объектом пользователя или null, если пользователь не найден.
   *
   * Этот метод ищет пользователя в базе данных по его email и возвращает true или false.
   */
  async checkOneByEmail(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) {
      return true;
    }
    return false;
  }

  /**
   * Находит пользователя по inn.
   * @param inn ИНН пользователя.
   * @returns {Promise<boolean>} Промис с объектом пользователя или null, если пользователь не найден.
   *
   * Этот метод ищет пользователя в базе данных по его inn и возвращает true или false.
   */
  async checkOneByInn(inn: string): Promise<boolean> {
    const user = await this.userCompanyRepo.findOne({
      where: { inn },
    });

    if (!user) {
      return true;
    }
    return false;
  }

  /**
   * Находит пользователя по ogrn.
   * @param ogrn ОГРН(-ИП) пользователя.
   * @returns {Promise<boolean>} Промис с объектом пользователя или null, если пользователь не найден.
   *
   * Этот метод ищет пользователя в базе данных по его inn и возвращает true или false.
   */
  async checkOneByOgrn(ogrn: string): Promise<boolean> {
    const user = await this.userCompanyRepo.findOne({
      where: { ogrn },
    });

    if (!user) {
      return true;
    }
    return false;
  }

  async checkInnByDadata(inn: string): Promise<boolean> {
    const dadata = await this.dadataService.getDetailsByInn(inn);
    if (!dadata) {
      return false;
    }
    if (dadata.suggestions.length <= 0) {
      return false;
    }
    return true;
  }

  // async getAddress(id: string): Promise<IUserAddress | null> {
  //   return this.userAddressRepo.findOne({ where: { id } });
  // }

  async getUsersCount(): Promise<number> {
    const ordersCount = await this.userRepo.count();
    return ordersCount;
  }

  async sendCodeToEmail(email: string): Promise<number | null> {
    this.AppLoggerLoki.warn(`Начало процесса отправки кода на email ${email}`);

    const code = await generateRandomCode(email);

    await this.AppLoggerLoki.log(`Код сгенерирован для ${email}`);

    const hash = hashEmailForCode(email);
    const hashData = await this.redisService.setDataForResetPassword(
      hash,
      email,
      code
    );

    if (!hashData) {
      this.AppLoggerLoki.warn(`Ошибка при сохранении данных в Redis ${email}`);
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorResetPassword
      );
    }
    this.AppLoggerLoki.log(`Данные успешно сохранены в Redis ${email}`);

    const sendEmail = await this.sendEmailMessageForResetPassword(email, code);
    if (!sendEmail) {
      this.AppLoggerLoki.warn(`Ошибка при отправке email ${email}`);

      throw new BadRequestException(HttpExceptionMessagesGraphQL.emailError);
    }

    this.AppLoggerLoki.log(`Email успешно отправлен ${email}`);

    this.AppLoggerLoki.log(`Процесс отправки кода завершен ${email}`);

    return code;
  }

  async checkCode(
    codeForResetPasswordInput: CodeForResetPasswordInputDTO
  ): Promise<boolean> {
    this.AppLoggerLoki.log(
      `Начало проверки кода для email ${codeForResetPasswordInput.email}`
    );
    const hash = hashEmailForCode(codeForResetPasswordInput.email);

    const hashData = await this.redisService.getDataResetPassword(hash);

    if (!hashData) {
      this.AppLoggerLoki.warn(
        `Ошибка: данные для сброса пароля не найдены ${codeForResetPasswordInput.email}`
      );
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorResetPassword
      );
    }
    this.AppLoggerLoki.log(
      `Данные для сброса пароля найдены ${codeForResetPasswordInput.email}`
    );

    if (hashData.code !== codeForResetPasswordInput.code) {
      this.AppLoggerLoki.warn(
        `Введен неверный код для сброса пароля ${codeForResetPasswordInput.email}`
      );
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.valiadtions.code.notAllowed
      );
    }
    this.AppLoggerLoki.log(
      `Код успешно проверен ${codeForResetPasswordInput.email}`
    );
    return true;
  }
  async sendEmailMessageForResetPassword(
    email: string,
    code: number
  ): Promise<boolean> {
    this.AppLoggerLoki.log(
      `Отправка сообщения для сброса пароля через Kafka ${email}`
    );
    const data = JSON.stringify({ email, code });
    const emailMessage = await this.kafkaService.sendMessageWithReturn(
      NOTIFICATION_EMAIL_RESET_PASSWORD,
      data
    );
    if (
      emailMessage &&
      emailMessage.length > 0 &&
      emailMessage[0].errorCode === 0
    ) {
      this.AppLoggerLoki.log(
        `Сообщение успешно отправлено через Kafka ${email}`
      );
      return true;
    } else {
      this.AppLoggerLoki.warn(
        `Ошибка при отправке сообщения через Kafka ${email}`
      );
      return false;
    }
  }
  async changeResetPassword(
    payload: newUserPasswordInputDTO
  ): Promise<boolean> {
    const email = payload.email;
    const emailForBase = payload.email.toLowerCase();
    this.AppLoggerLoki.log(
      `Начало процесса восстановления пароля пользователя ${email}`
    );

    const hashedEmail = hashEmailForCode(email);
    const hashData = await this.redisService.getDataResetPassword(hashedEmail);
    if (!hashData) {
      this.AppLoggerLoki.log(
        `Нет кэша для восстановления пароля пользователя ${email}`
      );
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorResetPassword
      );
    }

    const user = await this.userRepo.findOne({
      where: { email: emailForBase },
    });
    if (!user) {
      this.AppLoggerLoki.warn(
        `Пользователь не найден для восстановления пароля ${email}`
      );

      return false;
    }

    const originalPassword = payload.newPassword;
    const password = await hash(originalPassword, 10);
    const updateUserPass = await this.userRepo.update(user.id, { password });
    if (!updateUserPass) {
      this.AppLoggerLoki.warn(`Ошибка при обновлении пароля ${email}`);
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorResetPassword
      );
    }
    this.AppLoggerLoki.log(`Пароль успешно обновлен ${email}`);
    await this.redisService.delUserData('user:' + user.id);
    await this.redisService.deleteResetPassword(hashedEmail);
    this.AppLoggerLoki.log(`Процесс восстановления пароля завершен ${email}`);
    return true;
  }
}
