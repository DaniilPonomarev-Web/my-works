import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { BannerService } from './banner.service';
import {
  BannerDTO,
  BannersListDTO,
  BannerUploadImageDTO,
  CreateBannerInputDTO,
  CustomerRole,
  filesFunctions,
  HttpExceptionMessagesGraphQL,
  IBanner,
  IBannersList,
  InputBannerImageUploadDTO,
  OrdersPaginationAdminDTO,
  UpdateBannerInputDTO,
} from '@erist-opt/shared';
import { MinioLocalService } from '@erist-opt/minio';

import {
  HttpException,
  HttpStatus,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { LogsAdminService } from '@erist-opt/logs';

/**
 * Resolver для управления операциями с баннерами.
 * Admin
 */
@Resolver(() => BannerDTO)
export class BannerAdminResolver {
  constructor(
    private readonly bannerService: BannerService,
    private readonly minioLocalService: MinioLocalService,
    private logsAdminService: LogsAdminService
  ) {}

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Query(() => BannersListDTO, {
    name: 'getAllBannersAdmin',
    description: 'Получает все баннеры',
  })
  async getAllBannersAdmin(
    @Args('sortBy', {
      nullable: true,
      defaultValue: 'sortOrder',
      description: 'параметр сортировки по полю',
    })
    sortBy: string,

    @Args('sortOrder', {
      nullable: true,
      defaultValue: 'ASC',
      description: 'параметр порядка сортировки',
    })
    sortOrder: string,

    @Args('pagination', { nullable: false })
    pagination: OrdersPaginationAdminDTO
  ): Promise<IBannersList> {
    const banners = await this.bannerService.findAll();

    let bannersAdmin = banners;

    if (sortBy) {
      bannersAdmin.sort((a, b) => {
        if (sortOrder.toLowerCase() === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }
    const total = bannersAdmin.length;
    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    bannersAdmin = bannersAdmin.slice(startIndex, endIndex);

    const bannersAdminList: BannersListDTO = {
      banners: bannersAdmin,
      total: total,
    };

    return bannersAdminList;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Query(() => BannerDTO, {
    name: 'banner',
    description: 'Получает один баннер по id',
  })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<IBanner> {
    const banner = await this.bannerService.findOne(id);
    return banner;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => BannerDTO, {
    name: 'createBanner',
    description:
      'Создается новый баннер. При статусе true выключает остальные баннеры',
  })
  async createBanner(
    @Context() context: any,
    @Args('createBannerInput') createBannerInput: CreateBannerInputDTO
  ): Promise<IBanner> {
    const banner = await this.bannerService.create(createBannerInput);
    const userContext = context.req.user;
    await this.logsAdminService.createLog(
      'Banner',
      userContext.login,
      `Cоздал баннер с  id = ${banner.id}`,
      createBannerInput
    );
    return banner;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => BannerDTO, {
    name: 'updateBanner',
    description:
      'Обновляет баннер. При статусе true выключает остальные баннеры',
  })
  async updateBanner(
    @Context() context: any,
    @Args('updateBannerInput') updateBannerInput: UpdateBannerInputDTO
  ): Promise<IBanner> {
    const userContext = context.req.user;
    const banners = await this.bannerService.update(
      updateBannerInput.id,
      updateBannerInput
    );
    await this.logsAdminService.createLog(
      'Banner',
      userContext.login,
      `Изменил баннер ${updateBannerInput.id}`,
      updateBannerInput
    );
    return banners;
  }

  @UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
  @SetMetadata('roles', [CustomerRole.Admin, CustomerRole.Manager])
  @Mutation(() => [BannerDTO], {
    name: 'removeBanner',
    description: 'Удаляет баннер',
  })
  async removeBanner(
    @Context() context: any,
    @Args('id', { type: () => ID }) id: string
  ): Promise<IBanner[]> {
    const userContext = context.req.user;

    const banners = await this.bannerService.remove(id);

    await this.logsAdminService.createLog(
      'Banner',
      userContext.login,
      `Удалил баннер с id = ${id}`,
      {
        id,
      }
    );
    return banners;
  }

  @Mutation(() => BannerUploadImageDTO, {
    name: 'uploadBannerImageToMinio',
    description:
      'Отправка файла изображения для баннера его в minio. Вернется его название',
    complexity: 15,
  })
  async uploadBannerImageToMinio(
    @Args('BannerUploadImageDTO', {
      name: 'BannerUploadImageDTO',
      description: 'Загрузка изображения в minio для баннера',
    })
    bannerUploadImageDTO: InputBannerImageUploadDTO
  ) {
    let fileName: string;

    try {
      if (bannerUploadImageDTO.image) {
        const file = await bannerUploadImageDTO.image;

        if (file) {
          const readStream = file.createReadStream();
          const fileSize = await filesFunctions.getFileSize(readStream);

          if (fileSize > 5 * 1024 * 1024) {
            throw new HttpException(
              HttpExceptionMessagesGraphQL.valiadtions.imageError.fileSize,
              HttpStatus.BAD_REQUEST
            );
          }

          fileName = (await bannerUploadImageDTO.image).filename; // Имя файла, включая расширение
          const fileExtension = await filesFunctions.getFileExtension(
            file.filename
          ); // расширение файла

          if (!fileExtension) {
            throw new HttpException(
              HttpExceptionMessagesGraphQL.valiadtions.imageError.fileException,
              HttpStatus.BAD_REQUEST
            );
          }
          if (!filesFunctions.isValidFileType(fileExtension)) {
            throw new HttpException(
              HttpExceptionMessagesGraphQL.valiadtions.imageError.fileException,
              HttpStatus.BAD_REQUEST
            );
          }

          // const fileBuffer = await this.minioLocalService.streamToBuffer(
          //   readStream
          // );

          const fileupload = await this.minioLocalService.uploadImage(
            'banners',
            fileName,
            file
          );

          const test: BannerUploadImageDTO = {
            imageName: fileName,
          };
          return test;
        }
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        throw new HttpException(
          (error as { message: string }).message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      } else {
        throw new HttpException(
          (error as { message: string }).message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
