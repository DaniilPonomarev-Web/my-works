import { Module } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as https from 'https';
import { ConfigurationKeycloak } from '@web-clients-backend/shared';
import { KeycloakTokenGuard } from './tokenGuard.guard';

@Module({
  imports: [
    /**
     * @import HttpModule
     * @description Модуль для работы с HTTP-запросами.
     * @type {HttpModule}
     * @returns {HttpModuleOptions} Настройки для HTTP-клиента.
     * @properties
     *   @property {string} baseURL - Базовый URL для API Me.
     *   @property {number} timeout - Таймаут запросов в миллисекундах.
     *   @property {number} maxRedirects - Максимальное количество перенаправлений.
     *   @property {https.Agent} httpsAgent - Настройки HTTPS агента.
     */
    HttpModule.registerAsync({
      imports: [ConfigModule],
      /**
       * @method useFactory
       * @description Фабричный метод для асинхронной настройки HTTP-модуля.
       * @param {ConfigService} configService - Сервис для получения конфигураций.
       * @returns {Promise <HttpModuleOptions>} Объект настроек для HTTP-клиента.
       * @throws {Error} Если конфигурация API Me отсутствует.
       */
      useFactory: async (
        configService: ConfigService
      ): Promise<HttpModuleOptions> => {
        const keycloakConfig =
          configService.get<ConfigurationKeycloak>('keycloak');

        if (!keycloakConfig) {
          throw new Error('Keycloak configuration is missing');
        }
        return {
          baseURL: `${keycloakConfig.host}/realms/${keycloakConfig.realm}`,
          timeout: 10000,
          maxRedirects: 300,
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  // controllers: [KeycloakController],
  providers: [KeycloakService, KeycloakTokenGuard],
  exports: [KeycloakService, KeycloakTokenGuard],
})
export class KeycloakModule {}
