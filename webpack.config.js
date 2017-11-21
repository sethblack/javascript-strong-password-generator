const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './lib/jsspg.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'jsspg.min.js'
  },
  plugins: [
    new UglifyJsPlugin({
      extractComments: true,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
};