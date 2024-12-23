import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import {
  InputCreateProductDTO,
  ITransformedProduct,
  ProductDTO,
  TransformedProductDTO,
  InputProductImageUploadDTO,
  ProductUploadImageDTO,
  HttpExceptionMessagesGraphQL,
  filesFunctions,
  CustomerRole,
  TransformedProductsDTO,
  OrdersPaginationAdminDTO,
  ProductsFilterAdminDTO,
  ITransformedProducts,
  InputUpdateProductDTO,
} from '@erist-opt/shared';
import { ProductAdminService } from './productAdmin.service';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MinioLocalService } from '@erist-opt/minio';
import {
  JwtAuthCustomerGuard,
  RoleCustomerGuard,
} from '@erist-opt/jwt-customer';
import { ProductUserService } from './productUser.service';

@UseGuards(JwtAuthCustomerGuard, RoleCustomerGuard)
@SetMetadata('roles', [
  CustomerRole.Admin,
  CustomerRole.Manager,
  CustomerRole.Context,
])
@Resolver(() => ProductDTO)
export class ProductAdminResolver {
  constructor(
    private readonly productAdminService: ProductAdminService,
    private readonly productUserService: ProductUserService,
    private readonly minioLocalService: MinioLocalService
  ) {}

  @Query(() => TransformedProductsDTO, {
    name: 'getProductsAdmin',
    description: 'Получить все продукты',
  })
  async getProductsAdmin(
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
    pagination: OrdersPaginationAdminDTO,

    @Args('filter', { nullable: true }) filter?: ProductsFilterAdminDTO
  ): Promise<ITransformedProducts> {
    const { priceFrom, priceTo, name, colors, sizes } = filter || {};

    const categoryId = filter?.categoryId ?? null;
    const mainCategoryId = filter?.mainCategoryId ?? null;
    const products = await this.productUserService.findAllForAdmin(
      categoryId,
      mainCategoryId
    );

    let filterProducts = await this.productAdminService.filterProducts(
      products,
      priceFrom,
      priceTo,
      name,
      colors,
      sizes
    );

    // console.warn(filterProducts.length);

    if (filter?.status !== null) {
      filterProducts = filterProducts.filter(
        (item) => item.status === filter?.status
      );
    }

    if (sortBy && sortOrder) {
      filterProducts = await this.productAdminService.sortProducts(
        filterProducts,
        sortBy,
        sortOrder
      );
    }

    const filterProductsLenght = filterProducts.length;

    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;

    filterProducts = filterProducts.slice(startIndex, endIndex);

    const productsData: ITransformedProducts = {
      data: filterProducts,
      total: filterProductsLenght,
    };

    return productsData;
  }

  @Mutation(() => TransformedProductDTO, { description: 'Создание продукта' })
  async createProduct(
    @Args('createProductInput') createProductInput: InputCreateProductDTO
  ): Promise<ITransformedProduct | null> {
    const createProduct = await this.productAdminService.createProduct(
      createProductInput
    );

    if (!createProduct) {
      return null;
    }
    const product = await this.productAdminService.transformProduct(
      createProduct
    );
    return product;
  }

  @Mutation(() => ProductUploadImageDTO, {
    name: 'uploadProductImageToMinio',
    description:
      'Отправка файла изображения для загрузки его в minio. Вернется его название',
    complexity: 15,
  })
  async uploadProductImageToMinio(
    @Args('ProductUploadImageDTO', {
      name: 'ProductUploadImageDTO',
      description: 'Загрузка изображения в minio',
    })
    productUploadImageDTO: InputProductImageUploadDTO
  ) {
    let fileName: string;

    try {
      if (productUploadImageDTO.image) {
        const file = await productUploadImageDTO.image;

        if (file) {
          const readStream = file.createReadStream();
          const fileSize = await filesFunctions.getFileSize(readStream);

          if (fileSize > 10 * 1024 * 1024) {
            throw new HttpException(
              HttpExceptionMessagesGraphQL.valiadtions.imageError.fileSize,
              HttpStatus.BAD_REQUEST
            );
          }

          fileName = (await productUploadImageDTO.image).filename; // Имя файла, включая расширение

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
            'images',
            fileName,
            file
          );

          const test: ProductUploadImageDTO = {
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

  @Query(() => TransformedProductDTO, {
    name: 'getProductByIdAdmin',
    description: 'Получить продукт по ID',
  })
  async getProductByIdAdmin(
    @Args('id', { type: () => String }) id: string
  ): Promise<TransformedProductDTO> {
    const product = await this.productUserService.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }
    return product;
  }

  @Mutation(() => TransformedProductDTO, {
    description: 'Обновление продукта',
  })
  async updateProduct(
    @Args('updateProductInput') updateProductInput: InputUpdateProductDTO
  ): Promise<ITransformedProduct | null> {
    const updatedProduct = await this.productAdminService.updateProduct(
      updateProductInput
    );
    if (!updatedProduct) {
      throw new NotFoundException(
        `Продукт с ID ${updateProductInput.id} не найден`
      );
    }
    const product = await this.productAdminService.transformProduct(
      updatedProduct
    );
    return product;
  }
}
