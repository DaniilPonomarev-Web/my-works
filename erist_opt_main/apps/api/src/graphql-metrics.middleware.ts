import * as promClient from 'prom-client';
import promBundle from 'express-prom-bundle';

export const metricsMiddleware = promBundle({
  includeMethod: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

export const metricsClient = promClient;

export const graphqlRequestsTotal = new promClient.Counter({
  name: 'graphql_requests_total',
  help: 'Total GraphQL requests',
  labelNames: ['method', 'path', 'status'],
});
