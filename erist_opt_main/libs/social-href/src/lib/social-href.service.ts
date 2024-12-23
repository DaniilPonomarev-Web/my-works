import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISocialHref, SocialHref } from '@erist-opt/shared';
import {
  CreateUpdateSocialHrefInputDTO,
  SocialHrefDTO,
  UpdateSocialHrefInputDTO,
} from './dto/social-href.dto';

@Injectable()
export class SocialHrefService {
  constructor(
    @InjectRepository(SocialHref)
    private readonly socialHrefRepository: Repository<SocialHref>
  ) {}

  /**
   * Возвращает одну ссылку
   * @returns {Promise<ISocialHref>} Промис с ссылкой на социальную сеть.
   *
   */
  async find(id: string): Promise<ISocialHref> {
    const socialHref = await this.socialHrefRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!socialHref) {
      throw new Error('Социальная ссылка не найдена');
    }
    console.warn(socialHref);

    return socialHref;
  }

  /**
   * Возвращает все ссылки на социальные сети.
   * @returns {Promise<ISocialHref[]>} Промис с массивом объектов ссылок на социальные сети.
   *
   * Этот метод возвращает все существующие ссылки на социальные сети из базы данных.
   */
  async findAll(): Promise<ISocialHref[]> {
    const socialHrefs = await this.socialHrefRepository.find();
    return socialHrefs.map(
      (socialHref) =>
        new SocialHrefDTO(
          socialHref.id,
          socialHref.name,
          socialHref.href,
          socialHref.sortOrder
        )
    );
  }

  /**
   * Возвращает все ссылки на социальные сети, отсортированные по порядку.
   * @returns {Promise<ISocialHref[]>} Промис с массивом объектов ссылок на социальные сети.
   *
   * Этот метод возвращает все существующие ссылки на социальные сети из базы данных, отсортированные по порядку.
   */
  async findAllUser(): Promise<ISocialHref[]> {
    const socialHrefs = await this.socialHrefRepository.find({
      order: { sortOrder: 'ASC' },
    });
    return socialHrefs.map(
      (socialHref) =>
        new SocialHrefDTO(
          socialHref.id,
          socialHref.name,
          socialHref.href,
          socialHref.sortOrder
        )
    );
  }

  /**
   * Создает новую ссылку на социальную сеть.
   * @param input Данные для создания новой ссылки на социальную сеть.
   * @returns {Promise<ISocialHref>} Промис с объектом созданной ссылки на социальную сеть.
   *
   * Этот метод создает новую ссылку на социальную сеть в базе данных на основе предоставленных данных.
   */
  async create(input: CreateUpdateSocialHrefInputDTO): Promise<ISocialHref> {
    const socialHref = this.socialHrefRepository.create(input);
    const savedSocialHref = await this.socialHrefRepository.save(socialHref);
    return new SocialHrefDTO(
      savedSocialHref.id,
      savedSocialHref.name,
      savedSocialHref.href,
      savedSocialHref.sortOrder
    );
  }

  /**
   * Обновляет ссылку на социальную сеть по идентификатору.
   * @param input Данные для обновления ссылки на социальную сеть.
   * @returns {Promise<ISocialHref>} Промис с объектом обновленной ссылки на социальную сеть.
   *
   * Этот метод обновляет существующую ссылку на социальную сеть в базе данных на основе предоставленных данных.
   */
  async update(input: UpdateSocialHrefInputDTO): Promise<ISocialHref> {
    const { id, ...updateData } = input;

    await this.socialHrefRepository.update(id, updateData);

    const updatedSocialHref = await this.socialHrefRepository.findOneBy({ id });

    if (!updatedSocialHref) {
      throw new Error('Социальная ссылка не найдена');
    }

    return new SocialHrefDTO(
      updatedSocialHref.id,
      updatedSocialHref.name,
      updatedSocialHref.href,
      updatedSocialHref.sortOrder
    );
  }

  /**
   * Удаляет ссылку на социальную сеть по идентификатору.
   * @param id Идентификатор ссылки на социальную сеть для удаления.
   * @returns {Promise<boolean>} Промис, который возвращает true, если удаление успешно, и false в противном случае.
   *
   * Этот метод удаляет ссылку на социальную сеть из базы данных по указанному идентификатору.
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.socialHrefRepository.delete(id);
    return result.affected != null && result.affected > 0;
  }
}
