'use strict'

const { join, resolve } = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require('webpack')

const paths = {
  dist: join(__dirname, '..', 'dist'),
  public: join(__dirname, '..', 'public'),
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src')
}

const pluginsList = {
  miniCssExtractPlugin: new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })

}

module.exports = {
  paths,

  entry: [
    join(paths.src, 'ts', 'index'),
    join(paths.src, 'scss', '_styles.scss')
  ],

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
  },

  scssLoader: {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          minimize: true,
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [ resolve(paths.src) ]
        }
      }
    ]
  },

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
    include: paths.src,
    exclude: /node_modules/,
    use: {
      loader: 'file-loader',
      options: {
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  plugins: [
    pluginsList.miniCssExtractPlugin
  ]
}
