import { Resolver, Query } from '@nestjs/graphql';
import { MainPageBlockService } from './main-page-block.service';
import { IMainPageBlock, MainPageBlockDTO } from '@erist-opt/shared';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@erist-opt/jwt-user';

// @UseGuards(JwtAuthGuard)
@Resolver(() => MainPageBlockDTO)
export class MainPageBlockUserResolver {
  constructor(private readonly mainPageBlockService: MainPageBlockService) {}

  @Query(() => [MainPageBlockDTO], {
    name: 'getMainPageBlocksOnlyTrue',
    description: 'Запрос только включенных  блоков',
  })
  async getMainPageBlocksOnlyTrue(): Promise<IMainPageBlock[]> {
    const blocks = await this.mainPageBlockService.findAllTrue();
    return blocks;
  }
}
