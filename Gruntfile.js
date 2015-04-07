var _ = require('lodash');
var Webpack = require('webpack');
var Config = require('./config');

module.exports = function(grunt) {
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
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.css', '.less']
        },
        watch: config.watch || false
    }}
    grunt.initConfig({ pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'src/**/*.jsx', 'test/**/*.js'],
            options: {
                esnext: true
            }
        },
        webpack: {
            dev: webpackConfig({dir: 'dev'}),
            devWatch: webpackConfig({dir: 'dev', watch: true}),
            production: webpackConfig({dir: 'dist', plugins: [
                new Webpack.optimize.UglifyJsPlugin({
                    beautify: {
                        ascii_only: true
                    }
                })
            ]})
        },
        firebase: {
            options: {
                reference: Config.FIREBASE_ROOT,
                token: Config.FIREBASE_TOKEN,
            },
            backup: {
                options: {
                    mode: 'download',
                    dest: Config.BACKUP_DIR + '/' + (new Date()).toISOString()
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-keepalive');
    grunt.loadNpmTasks('grunt-firebase');
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('dev-build', ['webpack:dev']);
    grunt.registerTask('dev-watch', ['webpack:devWatch', 'keepalive']);
    grunt.registerTask('build', ['webpack:production']);
    grunt.registerTask('seed', ['firebase:seed']);
    grunt.registerTask('backup', ['firebase:backup']);
}
