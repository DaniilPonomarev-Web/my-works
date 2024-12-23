//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  images: {
    domains: ['erist.store'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'erist.store',
        port: '',
        pathname: '/image/cache/webp/catalog/**',
      },
      {
        protocol: 'https',
        hostname: 'static.erist.store',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      }
      
    ],
  },
  nx: {
    svgr: false,
  },
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
