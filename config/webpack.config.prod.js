var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var commonConfig = require('./webpack.config.common')
var webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
var helpers = require('./helpers');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ngcWebpack = require('ngc-webpack');

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
            new UglifyJsPlugin({
                sourceMap: false,
                parallel: true,
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify('production'),
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new BundleAnalyzerPlugin()
        ]
    });
    if (options.isAot) {
        /* production.plugins.push(new AotPlugin({
            tsConfigPath: './client/tsconfig.aot.json',
            entryModule: helpers.root('client/app.module#AppModule')
        })) */

        production.plugins.push(new ngcWebpack.NgcWebpackPlugin({
            AOT: true,                            // alias for skipCodeGeneration: false
            tsConfigPath: './client/tsconfig.aot.json',
            mainPath: './main-aot.ts'               // will auto-detect the root NgModule.
          }))
    }
    return production;
};