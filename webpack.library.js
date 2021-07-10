const path = require('path');
const webpack = require('webpack');

const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const common = require('./webpack.common.js');

/**
 * work in progress
 * 
 * most pressing issue are the as external defined libraries
 * it might not be very user friendly, if we need to include
 * 
 *   <script src="./assets/jquery.3.4.1.min.js"></script>
  <script src="./assets/jquery.hotkeys.js"></script>
  <script src="./assets/fabric.4.1.0.custom.js"></script>
  <script src="./assets/hammer.2.0.8.min.js"></script>
  <script src="./assets/jquery.hammer.js"></script>
  <script src="https://cdn.rawgit.com/adriancooney/console.image/c9e6d4fd/console.image.min.js"></script>

  before we can start using
  only valid externals might be jquery and fabric..., maybe not even these...
 */
module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'infinite-drawing-canvas.js',
        library: {
            name: 'InfiniteDrawingCanvas',
            type: 'umd',
        },
    },
});

