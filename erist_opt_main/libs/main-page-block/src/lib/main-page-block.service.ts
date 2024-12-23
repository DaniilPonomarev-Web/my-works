import { ProductUserService } from '@erist-opt/product';
import { CacheFeaturedService } from '@erist-opt/redis';
import {
  CreateMainPageBlockInputDTO,
  HttpExceptionMessagesGraphQL,
  IMainPageBlock,
  MainPageBlock,
  UpdateMainPageBlockInputDTO,
} from '@erist-opt/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const key = 'featureds';

@Injectable()
export class MainPageBlockService {
  constructor(
    @InjectRepository(MainPageBlock)
    private readonly mainPageBlockRepository: Repository<MainPageBlock>,
    private readonly productService: ProductUserService,
    private readonly cacheFeaturedService: CacheFeaturedService
  ) {}

  /**
   * Создает новый блок на главной странице.
   * @param {CreateMainPageBlockInputDTO} createMainPageBlockInput - Данные для создания блока.
   * @returns {Promise<IMainPageBlock[]>} Промис, возвращающий массив всех блоков после создания.
   */
  async create(
    createMainPageBlockInput: CreateMainPageBlockInputDTO
  ): Promise<IMainPageBlock> {
    const products = createMainPageBlockInput.products
      ? await this.productService.findByIds(createMainPageBlockInput.products)
      : [];

    const mainPageBlock = this.mainPageBlockRepository.create({
      ...createMainPageBlockInput,
      products,
    });

    await this.mainPageBlockRepository.save(mainPageBlock);

    // const blocks = await this.findAll();
    await this.cacheFeaturedService.delFeatureds(key);

    return mainPageBlock;
  }

  /**
   * Возвращает все блоки на главной странице.
   * @returns {Promise<IMainPageBlock[]>} Промис, возвращающий массив всех блоков.
   */
  async findAll(): Promise<IMainPageBlock[]> {
    const blocks = await this.mainPageBlockRepository.find({
      relations: ['products', 'products.description', 'products.images'],
      order: {
        sort: 'ASC',
      },
    });

    return blocks;
  }

  /**
   * Возвращает все активные блоки на главной странице.
   * @returns {Promise<IMainPageBlock[]>} Промис, возвращающий массив всех активных блоков.
   */
  async findAllTrue(): Promise<IMainPageBlock[]> {
    const featureds = await this.cacheFeaturedService.getFeatureds(key);
    if (featureds && featureds.length > 0) {
      return featureds;
    }
    const blocks = await this.mainPageBlockRepository.find({
      where: { status: true },
      relations: ['products', 'products.description', 'products.images'],
      order: {
        sort: 'ASC',
      },
    });
    const filteredBlocks = blocks.filter((block) => block.products.length > 0);
    await this.cacheFeaturedService.setFeatureds(key, filteredBlocks);

    return filteredBlocks;
  }

  /**
   * Возвращает блок на главной странице по его идентификатору.
   * @param {string} id - Идентификатор блока.
   * @returns {Promise<IMainPageBlock>} Промис, возвращающий блок с указанным идентификатором.
   * @throws {NotFoundException} Если блок с указанным идентификатором не найден.
   */
  async findOne(id: string): Promise<IMainPageBlock> {
    const mainPageBlock = await this.mainPageBlockRepository.findOne({
      where: { id },
      relations: ['products', 'products.description', 'products.images'],
    });
    if (!mainPageBlock) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.mainPageBlock.errorFindBlock(id)
      );
    }
    return mainPageBlock;
  }

  /**
   * Обновляет блок на главной странице.
   * @param {string} id - Идентификатор блока.
   * @param {UpdateMainPageBlockInputDTO} updateMainPageBlockInput - Данные для обновления блока.
   * @returns {Promise<IMainPageBlock>} Промис, возвращающий обновленный блок.
   * @throws {NotFoundException} Если блок с указанным идентификатором не найден.
   */
  async update(
    id: string,
    updateMainPageBlockInput: UpdateMainPageBlockInputDTO
  ): Promise<IMainPageBlock> {
    const products = updateMainPageBlockInput.products
      ? await this.productService.findByIds(updateMainPageBlockInput.products)
      : [];

    const mainPageBlock = await this.mainPageBlockRepository.preload({
      id,
      ...updateMainPageBlockInput,
      products,
    });

    if (!mainPageBlock) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.mainPageBlock.errorFindBlock(id)
      );
    }

    await this.cacheFeaturedService.delFeatureds(key);
    return await this.mainPageBlockRepository.save(mainPageBlock);
  }

  /**
   * Удаляет блок на главной странице.
   * @param {string} id - Идентификатор блока.
   * @returns {Promise<IMainPageBlock[]>} Промис, возвращающий массив всех блоков после удаления.
   * @throws {NotFoundException} Если блок с указанным идентификатором не найден.
   */
  async remove(id: string): Promise<IMainPageBlock[]> {
    const mainPageBlock = await this.mainPageBlockRepository.findOne({
      where: { id },
    });
    if (!mainPageBlock) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.mainPageBlock.errorFindBlock(id)
      );
    }
    const remove = await this.mainPageBlockRepository.remove(mainPageBlock);
    if (!remove) {
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.mainPageBlock.errorDelete
      );
    }
    const blocks = await this.findAll();
    await this.cacheFeaturedService.delFeatureds(key);
    return blocks;
  }
}
