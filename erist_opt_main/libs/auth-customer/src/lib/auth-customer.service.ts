import { CustomerService } from '@erist-opt/customer';
import { JwtCustomerService } from '@erist-opt/jwt-customer';
import {
  HttpExceptionMessagesGraphQL,
  ICustomer,
  LoginResponseDTO,
} from '@erist-opt/shared';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthCustomerService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly jwtCustomerService: JwtCustomerService
  ) {}

  /**
   * Валидирует пользователя по его email и паролю.
   * @param login login пользователя.
   * @param password Пароль пользователя.
   * @returns {Promise<any>} Промис, который разрешается, если пользователь валидирован.
   * @throws {UnauthorizedException} Если пользователь не найден или пароль неверен.
   *
   * Этот метод проверяет, существует ли пользователь с указанным email, и сверяет
   * указанный пароль с хешированным паролем в базе данных.
   */
  async validateCustomer(login: string, password: string): Promise<any> {
    const customer = await this.customerService.findOneByLogin(login);
    if (!customer) {
      throw new UnauthorizedException({
        message: HttpExceptionMessagesGraphQL.user.notUser,
      });
    }
    if (await compare(password, customer.password)) {
      const { password, ...result } = customer;
      return result;
    }
    return;
  }

  /**
   * Аутентифицирует пользователя и генерирует для него access и refresh токены.
   * @param customer Объект пользователя.
   * @returns {Promise<{ access_token: string, refresh_token: string }>} Промис с объектом, содержащим access и refresh токены.
   *
   * Этот метод очищает старые токены пользователя, генерирует новые access и refresh токены и возвращает их.
   */
  async login(customer: ICustomer): Promise<LoginResponseDTO> {
    await this.jwtCustomerService.deleteTokens(customer.id);
    const genretadTokens = await this.jwtCustomerService.generateTokens(
      customer
    );
    return genretadTokens;
  }

  /**
   * Обновляет access и refresh токены.
   * @param token Текущий refresh токен.
   * @returns {Promise<{ access_token: string; refresh_token: string }>} Промис с объектом, содержащим новые access и refresh токены.
   * @throws {UnauthorizedException} Если токен не найден или истек.
   *
   * Этот метод проверяет действительность текущего refresh токена, удаляет его, затем генерирует новые access и refresh токены и возвращает их.
   */
  async refreshToken(token: string) {
    const refreshToken = await this.jwtCustomerService.refreshToken(token);
    if (!refreshToken) {
      throw new BadRequestException(
        HttpExceptionMessagesGraphQL.auth.errorTokenValid
      );
    }
    return refreshToken;
  }

  async verifyTokenCustomer(token: string) {
    return await this.jwtCustomerService.verifyTokenCustomer(token);
  }
}
