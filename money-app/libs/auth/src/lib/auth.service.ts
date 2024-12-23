import { Injectable } from '@nestjs/common';
import { ClientTokenData } from './dto/clientTokenData.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(phone: string, password: string): Promise<any> {
    // const client = await this.clientService.getByPhone(phone);
    // if (!client) {
    //   throw new Error('Пользователь с таким номером телефона не существует');
    // }
    // if (await compare(password, client.password)) {
    //   const { password, ...result } = client;
    //   return result;
    // }
  }

  async login(client: any) {
    return {
      access_token: this.jwtService.sign({
        sub: client.key,
      }),
      client,
    };
  }

  async generateNewTokenForUser(client: ClientTokenData) {
    const userTokenData = { sub: client.sub };
    // const userFind = await this.clientService.getByPhone(client.sub);
    // if (!userFind) {
    //   throw new Error('Пользователь с таким номером телефона не существует');
    // }
    // const newToken = await this.jwtService.sign(userTokenData);
    // return {
    //   access_token: newToken,
    //   client: userFind,
    // };
    return;
  }
}
