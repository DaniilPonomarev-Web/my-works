import * as os from 'os';

export const clientParams = {
  deviceModel: 'Desktop',
  systemVersion: os.version(),
  appVersion: '2.7.1',
  langCode: 'en',
  useWSS: true,
  connectionRetries: 10,
  retryDelay: 1000,
  autoReconnect: true,
};
