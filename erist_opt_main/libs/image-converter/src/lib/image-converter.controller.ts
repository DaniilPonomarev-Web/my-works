import { Controller, Post, Body } from '@nestjs/common';
import { ImageConverterService } from './image-converter.service';

@Controller('images')
export class ImageConverterController {
  constructor(private readonly imageConverterService: ImageConverterService) {}

  @Post('convert')
  async convertImage() {
    const webPImage = await this.imageConverterService.convertBase64ToWebP();
    return {
      webPImage: webPImage.toString('base64'),
    };
  }
}
