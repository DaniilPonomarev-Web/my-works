import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Information } from './entity/information.entity';
import {
  InputCreateInformationDTO,
  InputUpdateInformationDTO,
} from './dto/information.dto';
import { IInformation } from './interface/information.interface';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private informationRepository: Repository<Information>
  ) {}

  /*Admin */
  async findAll(): Promise<IInformation[]> {
    const informations = await this.informationRepository.find();
    return informations;
  }

  async findOneById(id: string): Promise<IInformation> {
    const information = await this.informationRepository.findOne({
      where: { id },
    });
    if (!information) {
      throw new Error('Информационная страница не найдена');
    }
    return information;
  }

  async create(data: InputCreateInformationDTO): Promise<IInformation> {
    const information = this.informationRepository.create(data);
    const informationNew = await this.informationRepository.save(information);
    return informationNew;
  }

  async update(data: InputUpdateInformationDTO): Promise<IInformation> {
    await this.informationRepository.update(data.id, data);
    const updatedInformation = await this.informationRepository.findOne({
      where: { id: data.id },
    });
    if (!updatedInformation) {
      throw new Error('Информационная страница не найдена');
    }
    return updatedInformation;
  }

  async delete(id: string): Promise<void> {
    const result = await this.informationRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Информационная страница не найдена');
    }
  }
  /*Admin */

  /* USer */

  async findAllTrue(): Promise<IInformation[]> {
    const informations = await this.informationRepository.find({
      where: { status: true },
    });
    return informations;
  }

  async findOneByIdTrue(id: string): Promise<IInformation> {
    const information = await this.informationRepository.findOne({
      where: { id },
    });
    if (!information) {
      throw new Error('Информационная страница не найдена');
    }
    if (!information.status) {
      throw new Error('Information status false');
    }
    return information;
  }

  async findOneByName(name: string): Promise<IInformation> {
    const information = await this.informationRepository.findOne({
      where: { name },
    });
    if (!information) {
      throw new Error('Информационная страница не найдена по имени');
    }
    return information;
  }
  /* USer */
}
