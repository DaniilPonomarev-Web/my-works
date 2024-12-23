import { Module } from '@nestjs/common';
import { JwtUserService } from './jwt-user.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from '@erist-opt/shared';

import { TokenCleanupService } from './tokenCleanup.service';
import { GglAuthGuard } from './guards/ggl-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtGuard } from './guards/jwt.guard';
import { MinioLocalModule, MinioLocalService } from '@erist-opt/minio';
import { LogsModule } from '@erist-opt/logs';

@Module({
  imports: [
    LogsModule,
    ScheduleModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, MinioLocalModule],
      useFactory: async (
        configService: ConfigService,
        minioLocalService: MinioLocalService
      ) => {
        const { privateKey, publicKey } = await minioLocalService.getKeysUser();

        const options: JwtModuleOptions = {
          privateKey: privateKey,
          publicKey: publicKey,
          signOptions: {
            issuer: 'AuthCustomerService',
            expiresIn: configService.get<string>('JWT_TIME_CUSTOMER'),
            algorithm: 'RS256',
          },
        };
        return options;
      },
      inject: [ConfigService, MinioLocalService],
    }),
    TypeOrmModule.forFeature([RefreshToken]),
  ],
  providers: [
    JwtUserService,
    TokenCleanupService,
    GglAuthGuard,
    JwtAuthGuard,
    JwtGuard,
  ],
  exports: [
    JwtUserService,
    TokenCleanupService,
    GglAuthGuard,
    JwtAuthGuard,
    JwtGuard,
  ],
})
export class JwtUserModule {}
