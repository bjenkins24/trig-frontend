// Webpack uses this to work with directories
const path = require("path");

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "eval-source-map",
  mode: "development"
};
