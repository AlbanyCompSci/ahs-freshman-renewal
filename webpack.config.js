// NOTE: this is not a traditional webpack.config.js (it does not directly
// export the confirguration) and so cannot be used to run Webpack from the
// command line.

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var stylish = require('eslint/lib/formatters/stylish');
var stripColorCodes = require('stripcolorcodes');

var JSFILE = 'index.js';

module.exports.make = function(config) {return {
    entry: './src/main.js',
    output: {
        path: __dirname + '/' + (config.dir || '.'),
        filename: JSFILE
    },
    module: {
        preLoaders: [
            { test: /\.jsx?/, loaders: ['eslint-loader'], exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel-loader'] },
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
        minimize: config.minimize || false,
        dedupe: true
    },
    watch: config.watch || false,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Albany High School Freshman Debates',
            filename: 'index.html',
            assets: {index: config.compress ? JSFILE + '.gz' : JSFILE}
        })
    ].concat(config.compress ? [new CompressionPlugin()] : []),
    eslint: {
        configFile: './.eslintrc',
        // Remove colors, which don't show up well with a Solarized console
        formatter: function(results) {
            return stripColorCodes(stylish(results));
        }
    }
}}
