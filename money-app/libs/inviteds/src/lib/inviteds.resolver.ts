import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';

import { Inviteds, IInviteds } from '@money-app/entities';
import { InvitedsService } from './inviteds.service';
import { InvitedsDto, InvitedsInputDto } from './dto/inviteds.dto';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@money-app/auth';
import { RabbitService } from '@money-app/rabbit';

@Resolver(() => Inviteds)
export class InvitedsResolver {
  constructor(
    private readonly InvitedsService: InvitedsService,
    private readonly rabbitService: RabbitService
  ) {}
  @Mutation(() => InvitedsDto) // Укажите возвращаемый тип
  //@UseGuards(JwtAuthGuard)
  async createInvite(
    @Args('InvitedsInput') InvitedsInput: InvitedsInputDto
  ): Promise<IInviteds> {
    const InvitedsSearch = await this.InvitedsService.getInvitedsByPhone(
      InvitedsInput.phone
    );
    if (InvitedsSearch) {
      throw new HttpException(
        `Инвайт с номером телфона "${InvitedsInput.phone}" уже существует !`,
        HttpStatus.BAD_REQUEST
      );
    }
    const Inviteds = await this.InvitedsService.createInviteds(InvitedsInput);
    if (!Inviteds) {
      throw new HttpException(
        `Ошибка создания инвайта !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return Inviteds;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteInviteds(@Args('id') id: string): Promise<boolean> {
    const Inviteds = await this.InvitedsService.findOne(id);
    if (!Inviteds) {
      throw new HttpException(
        `Инвайта не существует !`,
        HttpStatus.BAD_REQUEST
      );
    }

    const deleteInviteds = await this.InvitedsService.deleteInviteds(id);
    if (!deleteInviteds) {
      throw new HttpException(
        `Ошибка удаления инвайта !`,
        HttpStatus.BAD_REQUEST
      );
    }
    return deleteInviteds;
  }

  @Query(() => [InvitedsDto])
  //@UseGuards(JwtAuthGuard)
  async getAllInviteds(
    @Args('clientId') clientId: string
  ): Promise<IInviteds[]> {
    const Invitedss = await this.InvitedsService.findAllByClientId(clientId);
    return Invitedss;
  }
}
