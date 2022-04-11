module.exports = {
  presets: ['next/babel'],
  plugins: [['styled-components', {ssr: true}]],
  env: {
    test: {
      plugins: ['transform-dynamic-import'],
    },
  },
};
