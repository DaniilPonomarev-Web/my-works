import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import createMetricsPlugin from 'apollo-metrics';
import { plugin as apolloTracingPlugin } from 'apollo-tracing';
import { register } from 'prom-client';

export const TRACING_PLUGIN_KEY = 'TRACING_PLUGIN_KEY';
export const METRICS_PLUGIN_KEY = 'METRICS_PLUGIN_KEY';

/**
 * @module PromModule
 * @description Модуль для интеграции мониторинга и трассировки в приложении NestJS.
 * Этот модуль предоставляет поддержку для Prometheus и интеграцию с Apollo для сбора метрик и трассировки.
 */
@Module({
  imports: [PrometheusModule.register()], // Импорт модуля Prometheus для работы с метриками
  providers: [
    {
      provide: TRACING_PLUGIN_KEY, // Провайдер для плагина трассировки Apollo
      useValue: apolloTracingPlugin(), // Инициализация плагина трассировки
    },
    {
      provide: METRICS_PLUGIN_KEY, // Провайдер для плагина метрик Apollo
      useValue: createMetricsPlugin(register), // Инициализация плагина метрик с использованием регистра prom-client
    },
  ],
  exports: [TRACING_PLUGIN_KEY, METRICS_PLUGIN_KEY], // Экспорт провайдеров для использования в других модулях
})
export class PromModule {}
