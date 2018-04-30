const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./config/helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'main': './client/main.ts'
    },
    output: {
      path: helpers.root('dist/server'),
      filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
          {
            test: /\.tsx?$/,
            loaders: [
              'awesome-typescript-loader',
              'angular2-template-loader',
              'angular-router-loader?debug=false',
            ],
            exclude: [
              /\.spec\.ts$/
            ]
          },
          {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
              loader: 'file-loader?name=assets/[name].[hash].[ext]'
          },
          {
              test: /\.scss$/,
              use: ['to-string-loader', 'css-loader', 'sass-loader'],
          }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: 'client/assets', to: 'assets' },
          ])
    ]
};