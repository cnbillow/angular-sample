var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var commonConfig = require('./webpack.config.common')
var webpackMerge = require('webpack-merge')
module.exports = (options) => {
    return webpackMerge(commonConfig, {
        output: {
            path: helpers.root('dist/browser'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[file].map',
            chunkFilename: '[id].chunk.js',      
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
                    ],
                }
            ]
        },
    
        plugins: [
        ]
    })
};
 