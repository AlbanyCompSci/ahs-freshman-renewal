// NOTE: this is not a traditional webpack.config.js (it does not directly
// export the confirguration) and so cannot be used to run Webpack from the
// command line.

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports.make = function(config) {return {
    entry: './src/main.jsx',
    output: {
        path: __dirname + '/' + (config.dir || '.'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx?harmony' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ],
        // TODO: new version of Parse (expected mid Apr. 2015) should fix
        // the import for Parse and make this unecessary
        noParse: /parse-latest.js/
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less']
    },
    optimize: {
        minimize: config.minimize || false
    },
    watch: config.watch || false,
    plugins: [new HtmlWebpackPlugin({
        title: 'Albany High School Freshman Debates',
        filename: 'index.html'
    })]
}}
