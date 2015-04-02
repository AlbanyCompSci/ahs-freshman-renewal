var _ = require('lodash');
var Config = require('./config');

module.exports = function(grunt) {
    var webpackBasic = {
        entry: './src/index.jsx',
        output: {
            filename: './index.js'
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
        }
    }
    grunt.initConfig({ pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'src/**/*.jsx', 'test/**/*.js'],
            options: {
                esnext: true
            }
        },
        webpack: {
            dev: webpackBasic,
            devWatch: _.assign(_.clone(webpackBasic), {watch: true}),
            production: _.assign(
                _.clone(webpackBasic),
                {
                    optimize: {minimize: true},
                    output: {filename: 'deploy/index.js'}
                }
            )
        },
    });
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-keepalive');
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('dev-build', ['webpack:dev']);
    grunt.registerTask('dev-watch', ['webpack:devWatch', 'keepalive']);
    grunt.registerTask('build', ['webpack:production']);
}
