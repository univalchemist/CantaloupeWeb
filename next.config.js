// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: (config, {defaultLoaders}) => {
    config.module.rules.push({
      test: /\.+(js|jsx|ts|tsx)$/,
      use: defaultLoaders.babel,
      include: [path.resolve(__dirname, '..', 'shared')],
    });

    return config;
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  future: {
    webpack5: true,
  },
};
