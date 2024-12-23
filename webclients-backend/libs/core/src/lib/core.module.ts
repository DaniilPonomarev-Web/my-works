import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RedisCache } from 'apollo-server-cache-redis';

import { ApolloServerPlugin } from '@apollo/server';
import { CoreResolver } from './core.resolver';
import { UptimeController } from './uptime.controller';
import { RabbitModule } from '@web-clients-backend/rabbit';
import {
  METRICS_PLUGIN_KEY,
  PromModule,
  TRACING_PLUGIN_KEY,
} from '@web-clients-backend/metrics';
import { ConfigurationRedis } from '@web-clients-backend/shared';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakModule } from '@web-clients-backend/keycloak';
import { KeycloakTokenGuard } from '@web-clients-backend/keycloak';

/**
 * @module CoreModule
 * @description Модуль для основной логики приложения, включающий поддержку GraphQL, Redis и других зависимостей.
 */
@Module({
  imports: [
    /**
     * @import ConfigModule
     * @description Модуль для работы с конфигурациями приложения.
     */
    ConfigModule,
    KeycloakModule,

    /**
     * @import GraphQLModule
     * @description Модуль для интеграции GraphQL с ApolloServer.
     * @type {GraphQLModule}
     * @returns {ApolloDriverConfig} Конфигурация для ApolloServer.
     * @properties
     *   @property {boolean} debug - Включает режим отладки.
     *   @property {boolean} uploads - Включает поддержку загрузки файлов.
     *   @property {boolean} introspection - Включает интроспекцию схемы.
     *   @property {boolean} playground - Включает GraphQL Playground.
     *   @property {boolean} installSubscriptionHandlers - Включает обработчики подписок.
     *   @property {Object} cors - Настройки CORS.
     *     @property {boolean} credentials - Включает поддержку учетных данных.
     *     @property {string} origin - Указывает источник для CORS.
     *   @property {Object} persistedQueries - Настройки для кеширования сохраненных запросов.
     *     @property {RedisCache} cache - Объект Redis для кеширования.
     *     @property {number} ttl - Время жизни кеша в секундах.
     *   @property {Array<ApolloServerPlugin>} plugins - Массив плагинов для ApolloServer.
     *   @property {string} autoSchemaFile - Файл для автоматического создания схемы.
     *   @property {boolean} sortSchema - Указывает, следует ли сортировать схему.
     */
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule, PromModule],
      useFactory: (
        configService: ConfigService,
        tracingPlugin: ApolloServerPlugin,
        metricsPlugin: ApolloServerPlugin
      ) => {
        const redisConfig = configService.get<ConfigurationRedis>('redis');
        const isPlayGround = configService.get<boolean>('playgroundGQL');
        if (!redisConfig) {
          throw new Error('Redis configuration is missing');
        }
        return {
          debug: true,
          uploads: true,
          introspection: true,
          playground: isPlayGround,
          installSubscriptionHandlers: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          cors: {
            credentials: true,
            origin: true,
          },
          persistedQueries: {
            cache: new RedisCache({
              host: redisConfig.host,
              port: redisConfig.port,
              password: redisConfig.pass,
            }),
            ttl: 86400, // Время жизни кеша
          },
          plugins: [tracingPlugin, metricsPlugin],
          autoSchemaFile: 'schema.gql',
          https: false, // Отключение проверки SSL TODO
          sortSchema: true,
        };
      },
      inject: [ConfigService, TRACING_PLUGIN_KEY, METRICS_PLUGIN_KEY],
    }),
    /**
     * @import RabbitModule
     * @description Модуль для работы с RabbitMQ.
     */
    RabbitModule,
  ],
  providers: [
    CoreResolver,
    {
      provide: APP_GUARD,
      useClass: KeycloakTokenGuard, // Установка глобального Guard
    },
  ],
  controllers: [UptimeController],
  exports: [],
})
export class CoreModule {
  /**
   * @method configure
   * @description Метод для применения промежуточного ПО к маршрутам.
   * @param {MiddlewareConsumer} consumer - Экземпляр MiddlewareConsumer для применения промежуточного ПО.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('*');
  }
}
