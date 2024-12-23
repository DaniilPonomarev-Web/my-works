import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { BannerService } from './banner.service';
import { BannerDTO, IBanner } from '@erist-opt/shared';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';

/**
 * Resolver для управления операциями с баннерами.
 * User
 */
// @UseGuards(JwtAuthGuard)
@Resolver(() => BannerDTO)
export class BannerUserResolver {
  constructor(private readonly bannerService: BannerService) {}

  @Query(() => [BannerDTO], {
    name: 'bannersTrue',
    description: 'Получает один включенный баннер',
  })
  async findAllTrue(): Promise<IBanner[]> {
    const banners = await this.bannerService.findAllTrue();
    return banners;
  }
}
