module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        react: {
            options: {
                harmony: true
            },
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.jsx'],
                        dest: 'dist',
                        ext: '.js'
                    }
                ]
            }
        },
        browserify: {
            browserifyOptions: {
                transform: [ require('grunt-react').browserify ]
            },
            app: {
                src: 'dist/index.js',
                dest: 'index.js'
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.jsx', 'test/**/*.js'],
            options: {
                esnext: true
            }
        },
    });
    grunt.loadNpmTasks('grunt-jsxhint');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('default', ['react', 'browserify']);
}
