module.exports = {
  stories: ['../components/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    'storybook-formik/register',
    '@storybook/addon-jest',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  exclude: [/node_modules/],
};
