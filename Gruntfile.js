var _ = require('lodash');
var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var Config = require('./config');

var webpackConfig = function(config) {return {
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

module.exports = function(grunt) {
    grunt.initConfig({ pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js*', 'test/**/*.js'],
            options: {
                esnext: true
            }
        },
        webpack: {
            dev: webpackConfig({dir: 'dev'}),
            devWatch: webpackConfig({dir: 'dev', watch: true}),
            dist: webpackConfig({dir: 'dist', minimize: true})
        }
    });
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-keepalive');
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('dev-build', ['webpack:dev']);
    grunt.registerTask('dev-watch', ['webpack:devWatch', 'keepalive']);
    grunt.registerTask('dist', ['webpack:dist']);
}
