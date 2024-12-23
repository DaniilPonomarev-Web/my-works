import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as stream from 'stream';

@Injectable()
export class MinioLocalService {
  private readonly logger: Logger;
  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioLocalService');
  }

  async listAllBuckets() {
    try {
      this.logger.debug('Attempting to list all buckets...');
      const buckets = await this.client.listBuckets();
      this.logger.debug('Buckets listed successfully:', buckets);
      return buckets;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error listing buckets',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async checkConnection() {
    try {
      const buckets = await this.client.listBuckets();
      console.log('Successfully connected to Minio. Buckets:', buckets);
    } catch (error) {
      console.error('Error connecting to Minio:', error);
    }
  }

  private getMinioEndpoint(): string {
    return process.env['NODE_ENV'] === 'production'
      ? `https://${process.env['MINIO_ENDPOINT']}` ||
          'https://static.erist.store'
      : `http://${process.env['MINIO_ENDPOINT']}` || 'http://localhost';
  }

  async createBucketIfNotExists(bucketName: string) {
    try {
      const bucketExists = await this.client.bucketExists(bucketName);
      if (!bucketExists) {
        await this.client.makeBucket(bucketName);
        await this.setBucketPolicyPublic(bucketName);
      }
    } catch (error) {
      console.error(
        `Error in createBucketIfNotExists for bucket ${bucketName}:`,
        error
      );
      throw error;
    }
  }

  async setBucketPolicyPublic(bucketName: string) {
    const policy = this.getPublicReadPolicy(bucketName);
    try {
      await this.client.setBucketPolicy(bucketName, policy);
    } catch (error) {
      console.error(`Error setting bucket policy for ${bucketName}:`, error);
      throw error;
    }
  }

  private getPublicReadPolicy(bucketName: string): string {
    return JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: '*',
          },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    });
  }

  async uploadSnapshot(bucketName: string, fileName: string, fileContent: any) {
    await this.createBucketIfNotExists(bucketName);
    try {
      await this.client.putObject(
        bucketName,
        fileName,
        fileContent,
        fileContent.length
      );
    } catch (error) {
      console.error(
        `Error uploading logs1cInApi to bucket ${bucketName}`,
        error
      );
      throw error;
    }
  }

  async uploadPdf(bucketName: string, fileName: string, fileContent: any) {
    await this.createBucketIfNotExists(bucketName);
    try {
      await this.client.putObject(
        bucketName,
        fileName,
        fileContent,
        fileContent.length
      );
    } catch (error) {
      console.error(`Error uploading PDF to bucket ${bucketName}:`, error);
      throw error;
    }
  }

  async uploadImage(bucketName: string, fileName: string, fileContent: any) {
    try {
      await this.createBucketIfNotExists(bucketName);

      const readStream = fileContent.createReadStream();
      await this.client.putObject(
        bucketName,
        fileName,
        readStream,
        fileContent.size
        // metaData
      );
    } catch (error) {
      console.error(`Error uploading image to bucket ${bucketName}:`, error);
      throw error;
    }
  }

  async getPublicUrl(bucketName: string, fileName: string): Promise<string> {
    const url = `${this.getMinioEndpoint()}${
      process.env['NODE_ENV'] === 'production'
        ? ''
        : `:${process.env['MINIO_PORT']}`
    }/${bucketName}/${fileName}`;
    return url;
  }

  async getMinioFileUrl(
    bucketName: string,
    fileName: string
  ): Promise<string | null> {
    try {
      const url = await this.client.presignedUrl(
        'GET',
        bucketName,
        fileName,
        6 * 24 * 60 * 60
      );
      return url;
    } catch (error) {
      console.error('Error generating Minio file URL:', error);
      return null;
    }
  }

  async getObject(bucketName: string, objectName: string): Promise<string> {
    const objStream: stream.Readable = await this.client.getObject(
      bucketName,
      objectName
    );
    return new Promise((resolve, reject) => {
      let data = '';
      objStream.on('data', (chunk: Buffer) => {
        data += chunk.toString();
      });
      objStream.on('end', () => {
        resolve(data);
      });
      objStream.on('error', (err: Error) => {
        reject(err);
      });
    });
  }
  async getKeysCustomer() {
    console.warn('keys');

    const privateKey = await this.getObject(
      'keys',
      'access-token-private-key-customer.key'
    );
    const publicKey = await this.getObject(
      'keys',
      'access-token-public-key-customer.pub'
    );
    console.warn('вернули keys');

    return { privateKey, publicKey };
  }

  async getKeysUser() {
    const privateKey = await this.getObject(
      'keys',
      'access-token-private-key.key'
    );
    const publicKey = await this.getObject(
      'keys',
      'access-token-public-key.pub'
    );
    return { privateKey, publicKey };
  }
}
