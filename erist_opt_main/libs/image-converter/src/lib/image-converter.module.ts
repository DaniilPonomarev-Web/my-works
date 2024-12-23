import { Module } from '@nestjs/common';
import { ImageConverterService } from './image-converter.service';
import { ImageConverterController } from './image-converter.controller';
import { SharpModule } from 'nestjs-sharp';

@Module({
  imports: [SharpModule],
  controllers: [ImageConverterController],
  providers: [ImageConverterService],
  exports: [ImageConverterService],
})
export class ImageConverterModule {}
