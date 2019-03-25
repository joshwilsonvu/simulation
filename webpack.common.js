'use strict';

let path = require('path'),
  webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, '/src/client'),
  entry: './index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js')
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
  plugins: [],
  stats: "minimal"
};
