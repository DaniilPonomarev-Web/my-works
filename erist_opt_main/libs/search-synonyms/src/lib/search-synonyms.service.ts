import {
  ICreateSynonymGroup,
  IUpdateSynonymGroup,
  SynonymGroup,
} from '@erist-opt/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SearchSynonymsService {
  constructor(
    @InjectRepository(SynonymGroup)
    private readonly synonymsRepository: Repository<SynonymGroup>
  ) {}

  async createSynonymGroup(
    createSynonymGroupDto: ICreateSynonymGroup
  ): Promise<SynonymGroup> {
    const synonymGroup = this.synonymsRepository.create(createSynonymGroupDto);
    const synonymGroupNew = await this.synonymsRepository.save(synonymGroup);
    return synonymGroupNew;
  }

  async updateSynonymGroup(
    updateSynonymGroupDto: IUpdateSynonymGroup
  ): Promise<SynonymGroup> {
    const { id, synonyms } = updateSynonymGroupDto;
    const synonymGroup = await this.synonymsRepository.findOne({
      where: { id },
    });
    if (!synonymGroup) {
      throw new NotFoundException(`Группа синонимов с ID ${id} не найдена`);
    }
    synonymGroup.synonyms = synonyms;
    return await this.synonymsRepository.save(synonymGroup);
  }

  async deleteSynonymGroup(id: string): Promise<boolean> {
    const result = await this.synonymsRepository.delete(id);
    if (!result || !result.affected) {
      return false;
    }
    return result.affected > 0;
  }

  async getAllSynonymGroups(): Promise<SynonymGroup[]> {
    return await this.synonymsRepository.find();
  }

  async getSynonymGroupById(id: string): Promise<SynonymGroup> {
    const synonymGroup = await this.synonymsRepository.findOne({
      where: { id },
    });
    if (!synonymGroup) {
      throw new NotFoundException(`Группа синонимов с ID ${id} не найдена`);
    }
    return synonymGroup;
  }

  async getSynonyms(): Promise<string[]> {
    const synonymGroups = await this.synonymsRepository.find();
    const synonyms = synonymGroups.flatMap((group) =>
      group.synonyms.split(',').map((syn) => syn.trim().toLowerCase())
    );
    return synonyms;
  }

  async getSynonymGroups(): Promise<string[][]> {
    const synonymGroups = await this.synonymsRepository.find();
    return synonymGroups.map((group) =>
      group.synonyms.split(',').map((syn) => syn.trim().toLowerCase())
    );
  }
}
