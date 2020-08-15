const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = {
  ...base,
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    ...base.plugins,
    new Dotenv({ path: './.env.production' }),
    new CopyPlugin({
      patterns: [{ from: '_redirects' }, { from: '_headers' }],
    }),
  ],
};
