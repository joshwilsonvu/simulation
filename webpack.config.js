'use strict';

let path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    host: '127.0.0.1',
    publicPath: '/',
    contentBase: '/',
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      showErrors: true,
    })
  ],
  stats: "minimal"
};
