const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'force-strict-loader',
        options: {
          sourceMap: true
        },
      },
      exclude: /node_modules/,
    }],
  },
  // devtool: 'source-map',
  plugins: [new htmlPlugin({
    title: path.basename(__dirname)
  })],
  devServer: {
    publicPath: '/',
  },
};