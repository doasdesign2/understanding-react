'use strict'

const CleanPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Default = require('./default')
const Webpack = require('webpack')

module.exports = {
  entry: [ ...Default.entry ],

  output: {
    filename: 'mini-react.js',
    path: Default.paths.dist,
    publicPath: ''
  },

  context: Default.paths.src,

  mode: 'production',

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
    new CleanPlugin(['dist'], {
      root: Default.paths.root
    }),

    new CopyWebpackPlugin([{
      from: Default.paths.public,
      to: Default.paths.dist
    }]),

    ...Default.plugins
  ],

  resolve: Default.resolve
}
