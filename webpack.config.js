let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let rules = require('./webpack.config.rules')();
let path = require('path');
const regeneratorRuntime = require("regenerator-runtime/runtime");

rules.push({
        test: /\.css$/i,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ]
});

module.exports = {
    entry: {
        index: './src/js/index.js',
    },
    devServer: {
        index: './index.html'
    },
    output: {
        filename: 'js/[name].[fullhash].js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    module: { rules },
    optimization: {
        minimizer: [
          // we specify a custom UglifyJsPlugin here to get source maps in production
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: false,
              ecma: 6,
              mangle: true
            },
            // При запуске dev установить значение true, для build - false
            sourceMap: false
          })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
          }),
        new HtmlPlugin({ template: './index.html' }),
        new CleanWebpackPlugin(['dist'])
    ]
};
