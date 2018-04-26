var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./webpack/helpers');
const OptimizeJsPlugin = require('optimize-js-plugin');

const webpack = require('webpack');
const CompressionWebpackPlugin = require("compression-webpack-plugin")

const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourceMapEnabled = process.env.SOURCE_MAP === '1';


const ngToolsWebpack = require('@ngtools/webpack');


module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist/browser'),
    publicPath: '/',
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    sourceMapFilename: '[file].map',
  },

  plugins: [
    new ngToolsWebpack.AngularCompilerPlugin({
      tsConfigPath: './client/tsconfig.aot.json',
      entryModule: './client/app.module#AppModule',
      sourceMap: true
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
      sourceRoot: 'webpack:///'
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new PurifyPlugin(),
    new HashedModuleIdsPlugin(),
    new ModuleConcatenationPlugin(),
    /**
       * Plugin: UglifyJsPlugin
       * Description: Minimize all JavaScript output of chunks.
       * Loaders are switched into minimizing mode.
       *
       * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
       *
       * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
       */
    new UglifyJsPlugin({}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

  ]
});