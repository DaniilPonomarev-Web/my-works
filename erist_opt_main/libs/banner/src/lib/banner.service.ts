import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppLoggerLoki } from '@erist-opt/logs';

import {
  Banner,
  HttpExceptionMessagesGraphQL,
  IBanner,
  ICreateBannerInput,
  IUpdateBannerInput,
} from '@erist-opt/shared';
import { MinioLocalService } from '@erist-opt/minio';
import { CacheBannersService } from '@erist-opt/redis';

const key = 'bannerCache';
//await this.cacheBannersService.setBannersData(key, banners);
@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannersRepository: Repository<Banner>,
    private AppLoggerLoki: AppLoggerLoki,
    private readonly minioLocalService: MinioLocalService,
    private readonly cacheBannersService: CacheBannersService
  ) {}

  async newImageUrlBanner(imageNameMinio: string): Promise<string> {
    const newUrl = await this.minioLocalService.getPublicUrl(
      'banners',
      imageNameMinio
    );
    return newUrl;
  }

  /**
   * Создает новый баннер.
   * Если статус нового баннера установлен в true, статус всех других баннеров устанавливается в false.
   * @param {ICreateBannerInput} createBannerInput - Данные для создания баннера.
   * @returns {Promise<IBanner[]>} Промис, возвращающий массив всех баннеров после создания.
   * @throws {Error} Если происходит ошибка в процессе создания баннера.
   */
  async create(createBannerInput: ICreateBannerInput): Promise<IBanner> {
    const queryRunner =
      this.bannersRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      if (createBannerInput.status) {
        // Устанавливаем статус false у всех других баннеров
        await queryRunner.manager.update(
          Banner,
          { status: true },
          { status: false }
        );
      }

      const hrefDesc = await this.newImageUrlBanner(createBannerInput.image);
      const hrefMobile = await this.newImageUrlBanner(
        createBannerInput.image_mob
      );
      const bannerWithImages = {
        name: createBannerInput.name,
        status: createBannerInput.status,
        title: createBannerInput.title,
        link: createBannerInput.link,
        image: createBannerInput.image,
        image_mob: createBannerInput.image_mob,
        image_href: hrefDesc,
        image_mob_href: hrefMobile,
      };
      // Создаем новый баннер
      const banner = this.bannersRepository.create(bannerWithImages);
      await queryRunner.manager.save(Banner, banner);

      await queryRunner.commitTransaction();
      this.AppLoggerLoki.log(`Админ создал баннер ${banner.name}`, 'api');
      return banner;
    } catch (error) {
      if (error instanceof Error) {
        this.AppLoggerLoki.error(
          `Админ не создал баннер, ошибка ${error.message}`,
          'api'
        );
      } else {
        this.AppLoggerLoki.error(
          `Админ не создал баннер, неизвестная ошибка`,
          'api'
        );
      }

      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.cacheBannersService.delBanners(key);
      await queryRunner.release();
    }
  }

  /**
   * Возвращает все баннеры.
   * @returns {Promise<IBanner[]>} Промис, возвращающий массив всех баннеров.
   */
  async findAll(): Promise<IBanner[]> {
    try {
      const banners = await this.bannersRepository.find();
      this.AppLoggerLoki.log(`Все баннеры запрошены успешно`, 'api');
      return banners;
    } catch (error) {
      this.AppLoggerLoki.error(`Ошибка при запросе всех баннеров`, 'api');
      throw new NotFoundException('ошибка при запросе всех баннеров');
    }
  }

  /**
   * Возвращает все активные баннеры.
   * @returns {Promise<IBanner[]>} Промис, возвращающий массив всех активных баннеров.
   */
  async findAllTrue(): Promise<IBanner[]> {
    try {
      const bannersCache = await this.cacheBannersService.getBanners(key);
      if (bannersCache && bannersCache.length > 0) {
        this.AppLoggerLoki.log(`Включенные баннеры запрошены из кэша`, 'api');
        return bannersCache;
      }
      const banners = await this.bannersRepository.find({
        where: { status: true },
      });
      await this.cacheBannersService.setBannersData(key, banners);
      this.AppLoggerLoki.log(
        `Включенные баннеры запрошены успешно и закешированы`,
        'api'
      );
      return banners;
    } catch (error) {
      this.AppLoggerLoki.error(`Ошибка при запросе включенных баннеров`, 'api');
      throw new NotFoundException('Ошибка при запросе включенных баннеров');
    }
  }

  /**
   * Возвращает баннер по его идентификатору.
   * @param {string} id - Идентификатор баннера.
   * @returns {Promise<IBanner>} Промис, возвращающий баннер с указанным идентификатором.
   * @throws {NotFoundException} Если баннер с указанным идентификатором не найден.
   */
  async findOne(id: string): Promise<IBanner> {
    const banner = await this.bannersRepository.findOne({ where: { id } });
    if (!banner) {
      this.AppLoggerLoki.error(`Ошибка при запросе  баннерa id=${id}`, 'api');
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.banner.errorFind
      );
    }
    this.AppLoggerLoki.log(`Баннер успешно запрошен ${banner.name}`, 'api');
    return banner;
  }

  /**
   * Обновляет баннер.
   * Если обновляемый баннер имеет статус true, статус всех других баннеров устанавливается в false.
   * @param {string} id - Идентификатор баннера.
   * @param {IUpdateBannerInput} updateBannerInput - Данные для обновления баннера.
   * @returns {Promise<IBanner>} Промис, возвращающий обновленный баннер.
   * @throws {NotFoundException} Если баннер с указанным идентификатором не найден.
   * @throws {Error} Если происходит ошибка в процессе обновления баннера.
   */
  async update(
    id: string,
    updateBannerInput: IUpdateBannerInput
  ): Promise<IBanner> {
    const queryRunner =
      this.bannersRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Если обновляемый баннер имеет статус true
      if (updateBannerInput.status) {
        // Устанавливаем статус false у всех других баннеров
        await queryRunner.manager.update(
          Banner,
          { status: true },
          { status: false }
        );
        this.AppLoggerLoki.log(
          `Все баннеры установлены в статус false. Новый баннер id=${id} будет установлен в true`,
          'api'
        );
      }

      const banner = await this.bannersRepository.preload({
        id,
        ...updateBannerInput,
      });

      if (!banner) {
        this.AppLoggerLoki.error(
          `Баннер с id=${id} не найден при обновлении`,
          'api'
        );
        throw new NotFoundException(
          HttpExceptionMessagesGraphQL.banner.errorFind
        );
      }
      const hrefDesc = await this.newImageUrlBanner(banner.image);
      const hrefMobile = await this.newImageUrlBanner(banner.image_mob);

      const savedBanner = await queryRunner.manager.save(Banner, {
        ...banner,
        image_href: hrefDesc,
        image_mob_href: hrefMobile,
      });
      await queryRunner.commitTransaction();
      this.AppLoggerLoki.log(
        `Баннер успешно обновлен ${savedBanner.name}`,
        'api'
      );
      return savedBanner;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.AppLoggerLoki.error(
        `Ошибка при обновлении баннера ${id}: ${error.message}`,
        'api'
      );
      throw error;
    } finally {
      await this.cacheBannersService.delBanners(key);
      await queryRunner.release();
    }
  }

  /**
   * Удаляет баннер.
   * @param {string} id - Идентификатор баннера.
   * @returns {Promise<IBanner[]>} Промис, возвращающий массив всех баннеров после удаления.
   * @throws {NotFoundException} Если баннер с указанным идентификатором не найден.
   */
  async remove(id: string): Promise<IBanner[]> {
    const bannersCount = await this.count();
    if (bannersCount === 1) {
      this.AppLoggerLoki.error(
        `Попытка удалить последний баннер с id=${id}. Удаление невозможно`,
        'api'
      );
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.banner.errorDeleteCount
      );
    }

    const banner = await this.findOne(id);
    if (!banner) {
      this.AppLoggerLoki.error(
        `Баннер с id=${id} не найден при удалении`,
        'api'
      );
      throw new NotFoundException(
        HttpExceptionMessagesGraphQL.banner.errorFind
      );
    }

    await this.bannersRepository.remove(banner);
    const banners = await this.findAll();
    this.AppLoggerLoki.log(`Баннер с id=${id} успешно удален`, 'api');
    await this.cacheBannersService.delBanners(key);
    return banners;
  }

  /**
   * счетчик баннеров
   * @returns {Promise<IBanner[]>} Промис, возвращающий массив всех баннеров после удаления.
   */
  async count(): Promise<number> {
    const bannerCount = await this.bannersRepository.count();
    this.AppLoggerLoki.log(`Количество баннеров: ${bannerCount}`, 'api');
    return bannerCount;
  }
}
