import { Injectable, OnModuleInit } from '@nestjs/common';
import { MinioLocalService } from '@erist-opt/minio';

@Injectable()
export class JwtKeyService implements OnModuleInit {
  public publicKey!: string;

  constructor(private readonly minioLocalService: MinioLocalService) {}

  async onModuleInit() {
    try {
      const keys = await this.minioLocalService.getKeysCustomer();
      this.publicKey = keys.publicKey;
      console.log('Public key fetched successfully');
    } catch (error) {
      console.error('Failed to fetch public key:', error);
      throw new Error('Unable to retrieve public key from Minio');
    }
  }
}
