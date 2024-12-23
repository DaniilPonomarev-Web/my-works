import { BadRequestException, Injectable } from '@nestjs/common';
import { SharpService } from 'nestjs-sharp';
import sharp, { Sharp } from 'sharp';
import { imageBase64 } from './image';

@Injectable()
export class ImageConverterService {
  constructor(private sharpService: SharpService) {}

  async convertBase64ToWebP(): Promise<Buffer> {
    try {
      const buffer = Buffer.from(imageBase64, 'base64');
      // return await this.sharpService.convertToWebP(buffer);
      return await this.convertToWebP(buffer);
    } catch (error) {
      throw new BadRequestException('Ошибка конверта в WebP');
    }
  }

  async convertToWebP(input: Buffer): Promise<Buffer> {
    try {
      return await sharp(input).webp().toBuffer();
    } catch (error) {
      throw new Error('Ошибка конвертации в WebP');
    }
  }
}
