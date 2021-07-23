const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
console.log(pkg.version);

module.exports = {
  entry: {
    app: './src/demo.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env.PKG_VERSION': JSON.stringify(pkg.version),
    }),
  ],
  externals: {
    jquery: 'jQuery',
    $: 'jQuery',
  },
  resolve: {
    fallback: {
      "util": false,
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
