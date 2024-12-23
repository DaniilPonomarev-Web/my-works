import { Module } from '@nestjs/common';
import { JwtCustomerService } from './jwt-customer.service';
import { RefreshTokenCustomer } from '@erist-opt/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GglAuthCustomerGuard } from './guards/ggl-auth.guard';
import { JwtAuthCustomerGuard } from './guards/jwt-auth.guard';
import { JwtCustomerGuard } from './guards/jwt.guard';
import { RoleCustomerGuard } from './guards/role.guard';
import { TokenCleanupCustomerService } from './tokenCleanup.service';
import * as fs from 'fs';
import { MinioLocalModule, MinioLocalService } from '@erist-opt/minio';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, MinioLocalModule],
      useFactory: async (
        configService: ConfigService,
        minioLocalService: MinioLocalService
      ) => {
        const { privateKey, publicKey } =
          await minioLocalService.getKeysCustomer();

        const options: JwtModuleOptions = {
          privateKey: privateKey,
          publicKey: publicKey,
          signOptions: {
            issuer: 'AuthCustomerService',
            expiresIn: configService.get<string>('JWT_TIME_CUSTOMER') || '1d',
            algorithm: 'RS256',
          },
        };
        return options;
      },
      inject: [ConfigService, MinioLocalService],
    }),
    TypeOrmModule.forFeature([RefreshTokenCustomer]),
  ],
  providers: [
    JwtCustomerService,
    TokenCleanupCustomerService,
    GglAuthCustomerGuard,
    JwtAuthCustomerGuard,
    JwtCustomerGuard,
    RoleCustomerGuard,
  ],
  exports: [
    TokenCleanupCustomerService,
    JwtCustomerService,
    GglAuthCustomerGuard,
    JwtAuthCustomerGuard,
    JwtCustomerGuard,
    RoleCustomerGuard,
  ],
})
export class JwtCustomerModule {}
