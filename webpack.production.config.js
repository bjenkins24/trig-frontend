const CopyPlugin = require('copy-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = {
  ...base,
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    ...base.plugins,
    new CopyPlugin({
      patterns: [{ from: '_redirects' }],
    }),
  ],
};
