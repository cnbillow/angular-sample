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
            new webpack.ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)@angular/,
                helpers.root('./src'), // location of your src
                {} // a map of your routes
            )
        ]
    })
};
 