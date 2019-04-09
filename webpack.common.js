'use strict';

let //webpack = require('webpack'),
  path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: './src/index.js',

  },
  output: {
    filename: '[name][hash].js',
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
        test: /\.worklet\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'worklet-loader',
          options: {
            name: '[name][hash].[ext]'
          }
        }],
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
  plugins: [
    //new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      showErrors: true,
    })
  ],
  stats: "minimal"
};
