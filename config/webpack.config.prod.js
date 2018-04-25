var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var commonConfig = require('./webpack.config.common')
var webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');


module.exports = (options) => {
    return webpackMerge(commonConfig, {
        devtool: 'source-map',
        output: {
            path: helpers.root('dist/browser'),
            publicPath: '/',
            filename: '[name].[chunkhash].bundle.js',
            chunkFilename: '[name].[chunkhash].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: '@ngtools/webpack',
                    exclude: [
                        /\.spec\.ts$/
                    ],
                    options: {
                        tsConfigPath: "./client/tsconfig.app.json",
                    },
                   
                },
            ]
        },

        plugins: [
            new SourceMapDevToolPlugin({
                filename: '[file].map[query]',
                moduleFilenameTemplate: '[resource-path]',
                fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
                sourceRoot: 'webpack:///'
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new UglifyJsPlugin({
                sourceMap: false,
                parallel: true,
            }),
            new ExtractTextPlugin('[name].[hash].css'),
            new webpack.DefinePlugin({
                'process.env': {
                  'ENV': JSON.stringify('production')
                }
            }),
        ]
    })
};
