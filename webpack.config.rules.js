module.exports = function() {
    return [
        {
            test: /\.html$/i,
            loader: 'html-loader',
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.hbs/,
            use: 'handlebars-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg|)$/i,
            use: 'file-loader?name=images/[fullhash].[ext]'
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: 'file-loader?name=fonts/[fullhash].[ext]'
        }
    ];
};
