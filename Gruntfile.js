var _ = require('lodash');

module.exports = function(grunt) {
    var webpackBasic = {
        entry: './src/index.jsx',
        output: {
            filename: './index.js'
        },
        module: {
            loaders: [
                { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
                { test: /\.css$/, loader: 'style-loader!css-loader' }
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
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
        }
    });
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-keepalive');
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('dev-build', ['webpack:dev']);
    grunt.registerTask('dev-watch', ['webpack:devWatch', 'keepalive']);
    grunt.registerTask('build', ['webpack:production']);
}
