'use strict'

const { join } = require('path')
const Default = require('./default')
const Webpack = require('webpack')

module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    ...Default.entry
  ],

  output: {
    filename: 'mini-react.js',
    publicPath: ''
  },

  context: Default.paths.src,

  devServer: {
    contentBase: Default.paths.public,
    historyApiFallback: true,
    hot: true,
    port: 8080,
    stats: { colors: true }
  },

  devtool: 'inline-source-map',

  mode: 'development',

  module: {
    rules: [
      Default.preLoader,
      Default.tsLoader,
      Default.jsLoader,
      Default.scssLoader,
      Default.fileLoader
    ]
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    ...Default.plugins
  ],

  resolve: Default.resolve
}
