const Dotenv = require('dotenv-webpack');
const base = require('./webpack.base.config');

module.exports = {
  ...base,
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: './',
  },
  mode: 'development',
  plugins: [...base.plugins, new Dotenv({ path: './.env.development' })],
};
