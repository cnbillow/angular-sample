var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./webpack/helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    'polyfills': './client/polyfills.ts',
    'vendor': './client/vendor.ts',
    'main': './client/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: '@ngtools/webpack',
        exclude: [
          /\.spec\.ts$/
        ],
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'to-string-loader' // creates style nodes from JS strings
          },
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, 
          {
              loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
        }
    ]
  },

  plugins: [
    new CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),

    new CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'inline'
    }),
    new CommonsChunkPlugin({
      name: 'main',
      async: 'common',
      children: true,
      minChunks: 2
    }),
    new CopyWebpackPlugin([
      { from: 'client/assets', to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      xhtml: true,
      minify: isProd ? {
        caseSensitive: true,
        collapseWhitespace: true,
        keepClosingSlash: true
      } : false
    }),
  ]
};