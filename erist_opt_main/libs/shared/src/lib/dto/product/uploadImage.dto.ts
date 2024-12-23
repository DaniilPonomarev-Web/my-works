import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { HttpExceptionMessagesGraphQL } from '../../http-exceptions-messages';

@InputType({ description: 'Инпут для загрузки картинки в MINIO для товара' })
export class InputProductImageUploadDTO {
  @IsOptional()
  @Field(() => GraphQLUpload, {
    nullable: true,
    description: 'Прикрепить изображение',
  })
  image: Promise<FileUpload> | null;

  constructor(image: Promise<FileUpload> | null) {
    this.image = image;
  }
}

@ObjectType({ description: 'Изображение товара' })
export class ProductUploadImageDTO {
  @Field({ description: 'Название изображения в minio' })
  imageName: string;
  constructor(imageName: string) {
    this.imageName = imageName;
  }
}
