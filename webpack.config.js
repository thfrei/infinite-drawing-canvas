const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: false,
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Development',
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  externals: {
    jquery: 'jQuery',
    $: 'jQuery',
    fabric: 'fabric',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
