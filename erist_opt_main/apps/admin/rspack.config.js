const { composePlugins, withNx, withReact } = require('@nx/rspack');
const { rspack } = require('@rspack/core');

function customDefinePlugin() {
  return (webpackConfig, { options, context }) => {
    const defines = {};
    Object.keys(process.env).forEach(function (key) {
      if (key.startsWith('NX_')) {
        defines['process.env.' + key] = JSON.stringify(process.env[key]);
      }
    });
    webpackConfig.plugins.push(new rspack.DefinePlugin(defines));
    return webpackConfig;
  };
}

module.exports = composePlugins(
  withNx(),
  withReact(),
  customDefinePlugin(),
  (config) => {
    return config;
  }
);
