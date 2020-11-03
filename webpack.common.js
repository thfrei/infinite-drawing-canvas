const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/demo.js',
  },
  plugins: [
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
