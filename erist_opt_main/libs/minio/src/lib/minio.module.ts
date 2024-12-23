import { Module } from '@nestjs/common';
import { MinioLocalService } from './minio.service';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MinioModule.registerAsync({
      useFactory: (config: ConfigService) => {
        const endPoint =
          config.get<string>('NODE_ENV') === 'production'
            ? 'minio'
            : 'localhost';
        const port = 9000;
        const accessKey = config.get<string>('MINIO_ROOT_USER');
        const secretKey = config.get<string>('MINIO_ROOT_PASSWORD');

        if (!accessKey) {
          throw new Error('MINIO_ROOT_USER is not defined');
        }
        if (!secretKey) {
          throw new Error('MINIO_ROOT_PASSWORD is not defined');
        }

        return {
          endPoint,
          port,
          useSSL: false,
          accessKey,
          secretKey,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MinioLocalService],
  exports: [MinioLocalService],
})
export class MinioLocalModule {}
// MinioModule.register({
//   endPoint: process.env['MINIO_ENDPOINT'] || 'localhost',
//   port: MINIO_PORT,
//   useSSL: process.env['MINIO_USE_SSL'] === 'true',
//   accessKey: process.env['MINIO_ROOT_USER'] || 'admin',
//   secretKey: process.env['MINIO_ROOT_PASSWORD'] || 'admin',
// }),
