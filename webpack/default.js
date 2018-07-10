'use strict'

const { join, resolve } = require('path')
const Webpack = require('webpack')

const paths = {
  dist: join(__dirname, '..', 'dist'),
  public: join(__dirname, '..', 'public'),
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src')
}

module.exports = {
  paths,

  entry: join(paths.src, 'ts', 'index'),

  resolve: {
    modules: [resolve(__dirname), '..', 'node_modules'],
    extensions: ['.js', '.ts']
  },

  preLoader: {
    test: /\.js$/,
    loader: 'source-map-loader'
  },

  jsLoader: {
    test: /\.js?$/,
    include: paths.src,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-typescript'
        ]
      }
    }
  },

  tsLoader: {
    test: /\.ts?$/,
    use: 'awesome-typescript-loader',
    exclude: /node_modules/
  }
}
