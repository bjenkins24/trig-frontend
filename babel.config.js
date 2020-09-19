const isTest = String(process.env.NODE_ENV) === 'test';

// eslint-disable-next-line func-names
module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/env',
    ['@babel/preset-react', { modules: isTest ? 'commonjs' : false }],
  ];

  const plugins = ['babel-plugin-styled-components'];

  if (isTest) {
    plugins.push('transform-require-context');
    plugins.push('@babel/plugin-transform-runtime');
  }

  return {
    presets,
    plugins,
  };
};
