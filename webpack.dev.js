// const path = require('path');
// const webpack = require('webpack');
const { merge } = require('webpack-merge');

// running on gitpod - need to tell webpack dev-server to have the correct url
let publicUrl;
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://')
  const publicUrl = `8080-${host}`
}

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    open: false,
    public: publicUrl,
  },
});
