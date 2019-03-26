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
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    contentBase: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Simulation",
      showErrors: true,
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },

    })
  ],
  stats: "minimal"
};
