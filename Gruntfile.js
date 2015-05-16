var WebpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    grunt.initConfig({ pkg: grunt.file.readJSON('package.json'),
        webpack: {
            dev: WebpackConfig.make({dir: 'dev'}),
            devWatch: WebpackConfig.make({dir: 'dev', watch: true}),
            dist: WebpackConfig.make({
                dir: 'dist',
                minimize: true,
                compress: true
            })
        }
    });
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-keepalive');
    grunt.registerTask('dev-build', ['webpack:dev']);
    grunt.registerTask('dev-watch', ['webpack:devWatch', 'keepalive']);
    grunt.registerTask('dist', ['webpack:dist']);
}
