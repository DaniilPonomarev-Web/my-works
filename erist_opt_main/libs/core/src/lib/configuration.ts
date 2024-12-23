export const configuration = () => ({
  environment: process.env['NODE_ENV'],
  port: parseInt(process.env['PORT'] || '3000', 10),
  amqp: process.env['RMQ_URL'],
});
