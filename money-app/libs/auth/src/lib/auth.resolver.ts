import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/loginResponse.dto';
import { LoginClientInput } from './dto/inputClientLogin.dto';
import { UseGuards } from '@nestjs/common';
import { GglAuthGuard } from './guards/ggl-auth.guard';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshResponse } from './dto/refreshTokenClient.dto';
import { ClientTokenData } from './dto/clientTokenData.dto';

@Resolver(() => AuthResolver)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GglAuthGuard)
  login(
    @Args('loginClientInput') loginClientInput: LoginClientInput,
    @Context() context: any
  ) {
    const client = context.user;
    return this.authService.login(client);
  }

  @Query(() => RefreshResponse)
  @UseGuards(JwtGuard)
  async whoiamAndToken(@Context('user') client: ClientTokenData) {
    const newToken = await this.authService.generateNewTokenForUser(client);
    return newToken;
  }
}
