import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@money-app/auth';
import { InputInviteHrefDto } from './dto/setInvite.dto';
import { InviteHref } from './dto/inviteHref.dto';
import { UserService } from './user.service';
import { InputCreateUserDto, User } from './dto/user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}
  // @Query(() => InviteHref)
  // @UseGuards(JwtAuthGuard)
  // async getInviteHrefUser(
  //   @Args('inputInviteHrefDto') inputInviteHrefDto: InputInviteHrefDto
  // ) {
  //   const href = await this.userService.setInviteHrefUser(inputInviteHrefDto);
  //   return href;
  // }

  // @Mutation(() => User) // Укажите возвращаемый тип
  // //@UseGuards(JwtAuthGuard)
  // async createUser(@Args('input') input: InputCreateUserDto) {
  //   // const user = await this.userService.createUser(input);
  //   // return user;
  // }
}
