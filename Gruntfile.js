module.exports = function(grunt) {
    [
        'grunt-contrib-jshint',
        'grunt-contrib-clean',
        'grunt-contrib-copy',
        'grunt-contrib-concat',
        'grunt-contrib-uglify',
        'grunt-contrib-cssmin',
        'grunt-contrib-concat',
        'grunt-usemin'
    ].forEach(function(task) { grunt.loadNpmTasks(task); });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'web-app/',
                    dest: 'dist/',
                    src: [
                        'index.html',
                        'css/**',
                        'js/**',
                        'images/**'
                    ],
                    filter: 'isFile'
                }]
            }
        },
        useminPrepare: {
            html: ['dist/index.html']
        },
        usemin: {
            html: ['dist/index.html']
        }
    });
    // Default task
    grunt.registerTask('default', ['clean', 'copy',
                                   'useminPrepare',
                                   'concat', 'uglify', 'cssmin',
                                   'usemin']);
};
