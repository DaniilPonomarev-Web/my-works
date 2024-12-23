import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordDto,
  // UserAddressInputDTO,
  HttpExceptionMessagesGraphQL,
  ICreateUser,
  IUserWithoutPass,
  SignUpUserInputDTO,
  // UpdateAddressDto,
  UpdateCompanyDto,
  UpdateUserDto,
  UserDTO,
  AddressIdDTO,
  NOTIFICATION_TELEGRAM_NEW_USER,
  ResetPasswordInputDTO,
  CodeForResetPasswordInputDTO,
  newUserPasswordInputDTO,
} from '@erist-opt/shared';
import { KafkaService } from '@erist-opt/kafka';
import { JwtAuthGuard } from '@erist-opt/jwt-user';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly kafkaService: KafkaService
  ) {}

  // Регистрация пользователя
  @Mutation(() => UserDTO, {
    name: 'signUpUser',
    description: 'Регистрирует нового пользователя в системе.',
  })
  async signupUser(
    @Args('signUpUserInput') signUpUserInput: SignUpUserInputDTO
  ) {
    const checkUserByPhone: boolean = await this.userService.checkOneByPhone(
      signUpUserInput.phone
    );

    if (!checkUserByPhone) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.userWithPhoneWasCreated
      );
    }

    const checkUserByEmail: boolean = await this.userService.checkOneByEmail(
      signUpUserInput.email.toLowerCase()
    );
    if (!checkUserByEmail) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.userWithEmailWasCreated
      );
    }

    const checkUserByInn: boolean = await this.userService.checkOneByInn(
      signUpUserInput.company.inn.toLowerCase()
    );
    if (!checkUserByInn) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.userWithInnWasCreated
      );
    }

    const checkUserByOgrn: boolean = await this.userService.checkOneByOgrn(
      signUpUserInput.company.ogrn
    );
    if (!checkUserByOgrn) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.userWithOgrnWasCreated
      );
    }

    if (signUpUserInput.company.inn !== '7714340921') {
      const checkInnByDadata: boolean = await this.userService.checkInnByDadata(
        signUpUserInput.company.inn
      );

      if (!checkInnByDadata) {
        throw new BadRequestException(HttpExceptionMessagesGraphQL.user.dadata);
      }
    }

    const newUser: ICreateUser = {
      name: signUpUserInput.name,
      phone: signUpUserInput.phone,
      email: signUpUserInput.email.toLowerCase(),
      password: signUpUserInput.password,
      secondPassword: signUpUserInput.secondPassword,
      company: signUpUserInput.company,
      // addresses: signUpUserInput.addresses,
    };

    const register = await this.userService.createUser(newUser);
    if (!register) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorRegister
      );
    }

    const message = `Новый пользователь:
Имя: ${register.name}
E-mail: ${register.email}
Компания: ${register.company.name}
ИНН: ${register.company.inn}
${
  register.company.kpp ? `КПП: ${register.company.kpp}\n` : 'КПП: -'
}`.toString();

    await this.kafkaService.sendMessage(
      NOTIFICATION_TELEGRAM_NEW_USER,
      message
    );

    return register;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserDTO, {
    nullable: true,
    description:
      'Получает информацию о текущем пользователе по его ID из контекста токена.',
  })
  async getUserInfo(@Context() context: any): Promise<IUserWithoutPass | null> {
    const userContext = context.req.user;

    const user = await this.userService.findOneById(userContext.id);
    if (!user) {
      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUser);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserDTO, {
    name: 'whoIAm',
    description:
      'Получает информацию о текущем пользователе, авторизованном через токен.',
  })
  async whoIAm(@Context() context: any) {
    const userContext = context.req.user;

    const userData = await this.userService.findOneById(userContext.id);
    if (!userData) {
      throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUser);
    }
    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDTO, {
    name: 'updateLastLogin',
    description: 'Обновление даты последнего входа в лк пользователя',
  })
  async updateLastLogin(@Context() context: any) {
    const user = context.req.user;

    const res = await this.userService.updateUserLastLogin(user.id);
    if (!res) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.user.errorUpdateLastLogin
      );
    }
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDTO, {
    name: 'updateUser',
    description: 'Обновление основной информации о пользователе',
  })
  async updateUser(
    @Context() context: any,
    @Args('updateUserDto') updateUserDto: UpdateUserDto
  ): Promise<IUserWithoutPass> {
    const userContext = context.req.user;

    const userUpdated = await this.userService.updateUser(
      userContext.id,
      updateUserDto
    );
    if (!userUpdated) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.user.errorUpdateUserData
      );
    }
    return userUpdated;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDTO, {
    name: 'changePassword',
    description: 'Изменение пароля пользователя',
  })
  async changePassword(
    @Context() context: any,
    @Args('changePasswordDto') changePasswordDto: ChangePasswordDto
  ): Promise<IUserWithoutPass> {
    const user = context.req.user;
    const userUpdated = await this.userService.changePassword(
      user.id,
      changePasswordDto
    );
    if (!userUpdated) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.user.errorUpdateUserPassword
      );
    }
    return userUpdated;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDTO, {
    name: 'updateCompany',
    description: 'Обновление информации о компании пользователя',
  })
  async updateCompany(
    @Context() context: any,
    @Args('updateCompanyDto') updateCompanyDto: UpdateCompanyDto
  ): Promise<IUserWithoutPass> {
    const user = context.req.user;
    const userUpdated = await this.userService.updateCompany(
      user.id,
      updateCompanyDto
    );
    if (!userUpdated) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.user.company.errorUpdate
      );
    }
    return userUpdated;
  }

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => UserDTO, {
  //   name: 'addAddress',
  //   description: 'Добавление нового адреса для пользователя',
  // })
  // async addAddress(
  //   @Context() context: any,
  //   @Args('createAddressInputDTO') createAddressInputDTO: UserAddressInputDTO
  // ): Promise<IUserWithoutPass> {
  //   const user = context.req.user;

  //   const userUpdated = await this.userService.addAddress(
  //     user.id,
  //     // createAddressInputDTO
  //   );
  //   if (!userUpdated) {
  //     throw new NotFoundException(
  //       HttpExceptionMessagesGraphQL.user.address.errorAdd
  //     );
  //   }
  //   return userUpdated;
  // }
  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => UserDTO, {
  //   name: 'updateAddress',
  //   description: 'Обновление информации об адресе пользователя',
  // })
  // async updateAddress(
  //   @Context() context: any,
  //   @Args('updateAddressDto') updateAddressDto: UpdateAddressDto
  // ): Promise<IUserWithoutPass> {
  //   const user = context.req.user;

  //   const userUpdated = await this.userService.updateAddress(
  //     user.id,
  //     // updateAddressDto
  //   );
  //   if (!userUpdated) {
  //     throw new NotFoundException(
  //       HttpExceptionMessagesGraphQL.user.address.errorUpdate
  //     );
  //   }
  //   return userUpdated;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => UserDTO, {
  //   name: 'deleteAddress',
  //   description: 'Удаление адреса пользователя, если он не один',
  // })
  // async deleteAddress(
  //   @Context() context: any,
  //   @Args('addressIdDto') addressIdDto: AddressIdDTO
  // ): Promise<IUserWithoutPass> {
  //   const user = context.req.user;

  //   const userData = await this.userService.findOneByEmail(user.email);
  //   if (!userData) {
  //     throw new NotFoundException(HttpExceptionMessagesGraphQL.user.notUser);
  //   }

  //   // if (userData.addresses.length <= 1) {
  //   //   throw new NotFoundException(
  //   //     HttpExceptionMessagesGraphQL.user.address.errorAlone
  //   //   );
  //   // }

  //   const userUpdated = await this.userService.deleteAddress(
  //     user.id
  //     // addressIdDto
  //   );
  //   if (!userUpdated) {
  //     throw new NotFoundException(
  //       HttpExceptionMessagesGraphQL.user.address.errorDelete
  //     );
  //   }
  //   return userUpdated;
  // }

  @Query(() => Boolean, {
    name: 'resetPassword',
    description:
      'Отправляет код подтверждения на email пользователя и сохраняет его у нас в системе',
  })
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInputDTO
  ) {
    const checkUserByEmail: boolean = await this.userService.checkOneByEmail(
      resetPasswordInput.email.toLowerCase()
    );
    if (checkUserByEmail) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.valiadtions.email.emailCorrect
      );
    }

    const sendCodeForUser = await this.userService.sendCodeToEmail(
      resetPasswordInput.email
    );
    if (!sendCodeForUser) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorResetPassword
      );
    }
    return true;
  }

  @Query(() => Boolean, {
    name: 'sendCodeResetPassword',
    description:
      'Отправляет код подтверждения на email пользователя и сохраняет его у нас в системе',
  })
  async sendCodeResetPassword(
    @Args('codeForResetPasswordInput')
    codeForResetPasswordInput: CodeForResetPasswordInputDTO
  ) {
    const checkСode: boolean = await this.userService.checkCode(
      codeForResetPasswordInput
    );
    if (!checkСode) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorResetPassword
      );
    }
    return true;
  }

  @Mutation(() => Boolean, {
    name: 'updateResetPassword',
    description: 'Изменение пароля при восстановлении доступа',
  })
  async updateResetPassword(
    @Args('newPassword')
    payload: newUserPasswordInputDTO
  ): Promise<boolean> {
    const userUpdated = await this.userService.changeResetPassword(payload);
    if (!userUpdated) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.user.errorResetPassword
      );
    }
    return true;
  }
}
