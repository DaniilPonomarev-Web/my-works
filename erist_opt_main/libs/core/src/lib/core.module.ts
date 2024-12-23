import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './configuration';
import { validationSchema } from './validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlUploadExpress } from 'graphql-upload';

import { getConnectionOptions, getMetadataArgsStorage } from 'typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RedisCache } from 'apollo-server-cache-redis';

import { ApolloServerPlugin } from '@apollo/server';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CoreResolver } from './core.resolver';
import { UptimeController } from './uptime.controller';
import { RabbitModule } from '@erist-opt/rabbit';
import {
  METRICS_PLUGIN_KEY,
  PromModule,
  TRACING_PLUGIN_KEY,
} from '@erist-opt/metrics';

const isPlayGround = process.env['NODE_ENV'] == 'development' ? true : false;

const vhost = process.env['RMQ_VHOST'] || '';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ERIST_OPT',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env['RMQ_URL']}${vhost}`],
          queue: process.env['RMQ_QUEUE'],
          noAck: true,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (
        tracingPlugin: ApolloServerPlugin,
        metricsPlugin: ApolloServerPlugin
      ) => ({
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
          origin: '*', //TODO сделать админку
        },
        persistedQueries: {
          cache: new RedisCache({
            host: process.env['REDIS_HOST'],
            port: process.env['REDIS_PORT']
              ? parseInt(process.env['REDIS_PORT'])
              : 6379,
            password: process.env['REDIS_PASS'],
          }),
          ttl: 86400,
        },
        plugins: [tracingPlugin, metricsPlugin],
        autoSchemaFile: 'schema.gql',
        sortSchema: true,
      }),
      inject: [TRACING_PLUGIN_KEY, METRICS_PLUGIN_KEY],
      imports: [PromModule],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: getMetadataArgsStorage().tables.map((tbl) => {
            return tbl.target;
          }),
        }),
    }),
    RabbitModule,
  ],
  providers: [CoreResolver],
  controllers: [UptimeController],
  exports: [],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('*');
  }
}
