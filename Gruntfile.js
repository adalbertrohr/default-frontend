module.exports = function(grunt) {

    var pathConfig = require('./grunt-settings.js');

    // tasks configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: pathConfig,

        // Clean dist files
        clean: {
            options: {
                force: true
            },
            dist: {
                src: ["<%= config.assets_dist_dir %>"]
            }
        },

        // sass compilation
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<&= config.assets_src_dir %><%= config.scss_dir %>',
                    src: [ '**/*.scss', '!<%= config.sass_main_file %>.scss' ],
                    dest: '<%= config.assets_dist_dir %><%= config.css_dir %>',
                    ext: '.css'
                }, {
                    src: '<%= config.assets_src_dir %><%= config.scss_dir %><%= config.sass_main_file %>.scss',
                    dest: '<%= config.assets_src_dir %><%= config.css_dir %><%= config.css_main_file %>.css'
                }]
            }
        },

        // css minify
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.assets_src_dir %><%= config.css_dir %>',
                    src: [ '*.css', '!*.<%= config.concat_ending %>.css' ],
                    dest: '<%= config.assets_dist_dir %><%= config.css_dir %>',
                    ext: '.<%= config.concat_ending %>.css'
                }]
            }
        },

        // copy files & directories
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.assets_src_dir %>',
                    src: [
                        '**',
                        '!<%= config.css_dir %>/**',
                        '!<%= config.js_dir %>/**',
                        '!<%= config.scss_dir %>/**',
                        '!**/**/.svn/**'
                    ],
                    dest: '<%= config.assets_dist_dir %>'
                }]
            }
        },
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // register tasks
    grunt.registerTask('css', [ 'sass:dist', 'cssmin:dist' ]);

    grunt.registerTask('dist', [ 'clean:dist', 'css', 'copy:dist' ]);

};
