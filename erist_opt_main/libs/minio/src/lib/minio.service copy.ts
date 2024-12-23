import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'nestjs-minio-client';
import { Readable } from 'stream';

@Injectable()
export class MinioLocalService {
  constructor(
    private readonly minioService: MinioService,
    private readonly configService: ConfigService
  ) {}

  async listAllBuckets() {
    return this.minioService.client.listBuckets();
  }

  async ensureBucketExists(bucketName: string) {
    const bucketExists = await this.minioService.client.bucketExists(
      bucketName
    );
    if (!bucketExists) {
      await this.minioService.client.makeBucket(bucketName, 'us-east-1');
    }
  }

  async uploadPdf(bucketName: string, fileName: string, fileContent: Buffer) {
    await this.ensureBucketExists(bucketName);
    await this.minioService.client.putObject(bucketName, fileName, fileContent);
  }

  async uploadImage(bucketName: string, fileName: string, fileContent: any) {
    await this.ensureBucketExists(bucketName);

    const readSream = fileContent.createReadStream();
    await this.minioService.client.putObject(
      bucketName,
      fileName,
      readSream,
      fileContent.size
    );
  }

  async getPublicUrl(bucketName: string, fileName: string): Promise<string> {
    const url = await this.minioService.client.presignedGetObject(
      bucketName,
      fileName,
      7 * 24 * 60 * 60
    );
    console.warn('первоначальный url - ' + url);

    if (process.env['NODE_ENV'] == 'production') {
      const externalHost = this.configService.get<string>(
        'MINIO_EXTERNAL_HOST'
      );

      if (externalHost) {
        const urlPath = url.replace(/http:\/\/.*:\d+/, '');
        const publicUrl = `${externalHost}${urlPath}`;
        console.warn('Полученный url - ' + publicUrl);

        return publicUrl;
      }
    }
    return url;
  }

  async generateNewPublicUrl(
    bucketName: string,
    fileName: string
  ): Promise<string> {
    const url = await this.minioService.client.presignedGetObject(
      bucketName,
      fileName,
      7 * 24 * 60 * 60
    );
    console.warn('первоначальный url - ' + url);

    if (process.env['NODE_ENV'] != 'production') {
      const externalHost = this.configService.get<string>(
        'MINIO_EXTERNAL_HOST'
      );

      if (externalHost) {
        const urlPath = url.replace(/http:\/\/.*:\d+/, '');
        const publicUrl = `${externalHost}${urlPath}`;
        console.warn('Полученный url - ' + publicUrl);

        return publicUrl;
      }
    }
    return url;
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
}
