const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const commonConfig = require('./webpack.config.common')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ngcWebpack = require('ngc-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin')


module.exports = (options) => {


    const production =  webpackMerge(commonConfig, {
        devtool: 'source-map',
        entry: {
            'app': options.isAot ? './client/main-aot.ts': './client/main.ts',
        },
        output: {
            path: helpers.root('dist/browser'),
            publicPath: '/',
            filename: '[name].[chunkhash].bundle.js',
            chunkFilename: '[name].[chunkhash].chunk.js',            
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: '@ngtools/webpack',
                    exclude: [
                        /\.spec\.ts$/,
                        /\.test\.ts$/,
                        /server/
                    ],
                    options: !options.isAot ? {
                        tsConfigPath: './client/tsconfig.aot.json',
                    }:
                    {},
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
            new ExtractTextPlugin('[name].[contenthash].css'),
            new PurifyPlugin(), /* buildOptimizer */
            new HashedModuleIdsPlugin(),
            new ModuleConcatenationPlugin(),
            new HtmlWebpackPlugin({
                template: 'client/index.html',
                excludeChunks: ['base'],
                filename: 'index.html',
                minify: {
                    caseSensitive: true,
                    collapseWhitespace: true,
                    keepClosingSlash: true
                }
            }),
         
            new UglifyJsPlugin({
                    sourceMap: false,
                    parallel: true,
                    uglifyOptions: 
                        { ecma: 5,
                        warnings: false,
                        ie8: false,
                        mangle: true,
                        compress: { pure_getters: true, passes: 2 },
                        output: { ascii_only: true, comments: false } 
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify('production'),
                    'process.env.NODE_ENV': JSON.stringify('production')
                }
            }),
        ]
    });

    if (options.isAot) {
        production.plugins.push(new ngcWebpack.NgcWebpackPlugin({
            AOT: true,                            // alias for skipCodeGeneration: false
            tsConfigPath: './client/tsconfig.aot.json',
            mainPath: './main-aot.ts'               // will auto-detect the root NgModule.
          }))
    }

    if (options.isPwa) {
        production.plugins.push(new CopyWebpackPlugin([
            { from: 'client/manifest.json', to: '' },
            { from: 'client/sw.js', to: '' },
        ]))
    }
    return production;
};
