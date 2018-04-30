const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const commonConfig = require('./webpack.config.common')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const AotPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            /* new BundleAnalyzerPlugin() */
        ]
    });

    console.log(options.isPwa == true)
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
            { from: 'client/sw.js', to: '' }
        ]))
    }
    return production;
};
