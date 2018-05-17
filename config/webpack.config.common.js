const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = {
    entry: {
        'polyfills': './client/polyfills.ts',
        'app': './client/main.ts',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
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
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills']
        }),
        new CopyWebpackPlugin([
            { from: 'client/assets', to: 'assets' },
            { from: 'client/styles.css', to: '' },
          ]),
    ]
};

if(process.env.WEBPACK_ANALIZER == 1) {
    commonConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = commonConfig;