const path = require('path');
const webpack = require('webpack');

const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'example'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, 'dist')
      ],
    }),
  ],
});
