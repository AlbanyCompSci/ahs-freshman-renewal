module.exports = function(grunt) {
    grunt.initConfig({ pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'src/**/*.jsx', 'test/**/*.js'],
            options: {
                esnext: true
            }
        },
    });
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.registerTask('lint', ['jshint']);
}
