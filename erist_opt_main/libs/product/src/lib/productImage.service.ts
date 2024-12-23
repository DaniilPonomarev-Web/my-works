import { MinioLocalService } from '@erist-opt/minio';
import { IProductImage, ProductImage } from '@erist-opt/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AppLoggerLoki } from '@erist-opt/logs';
import sharp = require('sharp');
import axios from 'axios';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    private readonly minioLocalService: MinioLocalService,
    private readonly appLoggerLoki: AppLoggerLoki
  ) {}

  async updateProductImagesHrefs(): Promise<IProductImage[] | null> {
    const products = await this.getProductsImages();
    if (!products || products.length === 0) {
      return null;
    }
    for (const product of products) {
      const newImageUrl = await this.newImageUrl(product.imageNameMinio);
      await this.updateProductImages(product.id, newImageUrl);
    }

    return this.getProductsImages();
  }

  async updateProductImagesBase64(): Promise<IProductImage[] | null> {
    const products = await this.getProductsImages();
    if (!products || products.length === 0) {
      return null;
    }
    for (const product of products) {
      const newImageUrl = await this.generateBlurDataURL(product.image);

      await this.updateProductImageBase64(product.id, newImageUrl);
    }

    return this.getProductsImages();
  }

  async getProductsImages(): Promise<IProductImage[] | null> {
    const products = await this.productImageRepository.find({
      // where: {
      //   imageNameMinio: Not('no_image_product.webp'),
      // },
    });
    return products;
  }

  async generateBlurDataURL(imageUrl: string): Promise<string> {
    try {
      // Скачиваем изображение по URL  из s3
      const response = await axios({
        url: imageUrl,
        responseType: 'arraybuffer', //бинарник в ход
      });

      const buffer = await sharp(response.data)
        .webp()
        .resize({ width: 10, height: 15 }) // уменьшаем размер для blur
        .toBuffer();

      return `data:image/webp;base64,${buffer.toString('base64')}`;
    } catch (error) {
      this.appLoggerLoki.warn(`Ошибка при создании base64 изображения`);
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAYAAADd/14OAAABB2lDQ1BJQ0MgUHJvZmlsZQAAKM9jYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+sykA44U1KLk4H0ByBWKQJaDjRSBMgWSYewNUDsJAjbBsQuLykoAbIDQOyikCBnIDsFyNZIR2InIbGTC4pA6nuAbJvcnNJkhLsZeFLzQoOBNAcQyzAUMwQxuDM4gfwPUZK/iIHB4isDA/MEhFjSTAaG7a0MDBK3EGIqCxgY+FsYGLadR4ghwqQgsSgRLMQCxExpaQwMn5YzMPBGMjAIX2Bg4IqGBQQOtymA3ebOkA+E6Qw5DKlAEU+GPIZkBj0gy4jBgMGQwQwAptY/P1N/5B4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAIOSURBVChTTY97S1NxHMbPG+gy1F08l21Hd1V3dnZpZ27qNsulc6YzRWlYXhIVAqOMCCQC30QvoPfQH72E6K/ACLpRiUU0tamly08/8Z++8PB9eHi+D99HOjxqsP+nwS+B3cOzfSC0usCe4DWhfa8fI/HfHJ9AQ+B0/opdF6a9gyNq9d9I2z9qvPm4xdtPX3n3eYtNwV9/+Mbmlx22dxv83D9hq3aElJtdo7yyTra6ijG6SGJiCWN8GWvmPqN3N3j24iXPX71HKq0scmfjMfPrD5leW6W6do/hpVkKIyV6pivkb07RPzOFNDJfZHhugPJCkdHbVymM9VOpTlIsDJEezlCY6iVTtpCy4ym6K0l6JlJYpThdfQaTC49YePCUzLUx0mUfsWIQKT3RTfYUlRThQpjIQI6c+PHW8hP6BqskUwGiOS9S3/U0lwZNEoMJ9KxfXOcIJy4zVLpBtHecuGlhdorE5IBBW1JHjbfjirqJXsnTJIex25ycVzoJdefJJFJIwXQIe0jhnGJDjup4TQOHEkB26TQpXXisPAFTR2oJKshhGS3mxS+KKBEV0zDpCEbx+wJ4fC7kjotnRi3mQU224bZ8uAwVzeMmoPtxtcq0OOy0tjuQmtvtNIdc2Dtl1ISMM+LE4xfpegC36mV+cQ6nT0WyCXdzsBU5rqFbGvbgBZGoEYvE0bU2LFGkxWHjH1jUPSThBT6lAAAAAElFTkSuQmCC';
    }
  }

  // async getProductsImagesNoImage(id: string): Promise<boolean> {
  //   const product = await this.productImageRepository.find({
  //     where: {
  //       id: id,
  //       imageNameMinio: 'no_image_product.webp',
  //     },
  //   });
  //   if (!product) {
  //     return false;
  //   }
  //   return true;
  // }
  async getProductsImagesNoImage(id: string): Promise<boolean> {
    const productImages = await this.productImageRepository.find({
      where: {
        productId: id,
        imageNameMinio: Like('%no_image%'),
      },
    });
    if (!productImages) {
      return true;
    }

    return productImages.length > 0;
  }

  async updateProductImages(id: string, image: string): Promise<void> {
    const updateProductImage = await this.productImageRepository.findOne({
      where: { id },
    });
    if (!updateProductImage) {
      return;
    }
    updateProductImage.image = image;
    await this.productImageRepository.save(updateProductImage);
    return;
  }

  async updateProductImageBase64(
    id: string,
    base64Image: string
  ): Promise<void> {
    const updateProductImageBase64 = await this.productImageRepository.findOne({
      where: { id },
    });
    if (!updateProductImageBase64) {
      return;
    }
    updateProductImageBase64.blurDataURL = base64Image;
    await this.productImageRepository.save(updateProductImageBase64);
    return;
  }

  async newImageUrl(imageNameMinio: string): Promise<string> {
    const newUrl = await this.minioLocalService.getPublicUrl(
      'images',
      imageNameMinio
    );
    return newUrl;
  }
}
