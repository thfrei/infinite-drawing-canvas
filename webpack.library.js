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
  <script src="./assets/jquery.3.4.1.min.js"></script>
  <script src="./assets/jquery.hotkeys.js"></script>

  before we can start using
  only valid externals might be jquery, maybe not even these...
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

