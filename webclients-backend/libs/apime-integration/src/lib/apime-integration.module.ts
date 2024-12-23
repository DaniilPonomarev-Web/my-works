import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as https from 'https';
import { ApimeIntegrationService } from './apime-integration.service';
import { ApimeConnectionGuard } from './ApiMeConnectionGuard';
import { ConfigurationApiMe } from '@web-clients-backend/shared';
import { SearchApimeService } from './search/search-apime.service';

/**
 * @module ApimeIntegrationModule
 * @description Модуль для интеграции с API Me, включая настройку HTTP клиента.
 */
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
       * @returns {Promise<HttpModuleOptions>} Объект настроек для HTTP-клиента.
       * @throws {Error} Если конфигурация API Me отсутствует.
       */
      useFactory: async (configService: ConfigService) => {
        const apiMeConfig = configService.get<ConfigurationApiMe>('apime');

        if (!apiMeConfig) {
          throw new Error('ApiMe configuration is missing');
        }
        return {
          baseURL: apiMeConfig.uri,
          timeout: 100000,
          maxRedirects: 300,
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    ApimeIntegrationService,
    ApimeConnectionGuard,
    SearchApimeService,
  ],
  exports: [ApimeIntegrationService, ApimeConnectionGuard, SearchApimeService],
})
export class ApimeIntegrationModule {}
