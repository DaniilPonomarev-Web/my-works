import { Resolver, Query, Args } from '@nestjs/graphql';
import { InformationService } from './information.service';
import { InformationDTO } from './dto/information.dto';

@Resolver(InformationDTO)
export class InformationUserResolver {
  constructor(private readonly informationService: InformationService) {}

  @Query(() => [InformationDTO], {
    description: 'Получить все информационные странички',
  })
  async getAllInformationsTrue() {
    return this.informationService.findAllTrue();
  }

  @Query(() => InformationDTO, {
    description: 'Получить информационную страничку по ID',
  })
  async getInformationTrue(@Args('id') id: string) {
    return this.informationService.findOneByIdTrue(id);
  }

  @Query(() => InformationDTO, {
    description: 'Получить информационную страничку по NAME',
  })
  async getInformationByName(@Args('name') name: string) {
    return this.informationService.findOneByName(name);
  }
}
