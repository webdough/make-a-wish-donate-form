module.exports = function(grunt) {
    require('time-grunt')(grunt);
    grunt.initConfig({
        directories: {
            project: 'app',
            jquery: 'components/public/jquery/dist',
            jqueryUI: 'components/public/jquery-ui',
            jqueryInputMask: 'components/public/jquery.inputmask',
            jqueryValidation: 'components/public/jquery-validation',
            modernizr: 'components/public/modernizr',
            bootstrap: 'components/public/bootstrap-sass/assets/javascripts'
        },
        pkg: grunt.file.readJSON('package.json'),
        /** ===================================================================================
         * CSS - Sass
         =================================================================================== */
        sass: {
            dist: {
                files: {
                    '<%= directories.project %>/css/main.css': '<%= directories.project %>/scss/main.scss'
                }
            }
        },
        /** ===================================================================================
         * CSS - Auto Pre-fixer
         =================================================================================== */
        autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            },
            dist: {
                files: {
                    '<%= directories.project %>/css/main.css': '<%= directories.project %>/css/main.css'
                }
            }
        },
        /** ===================================================================================
         * CSS - Combine Media Queries
         =================================================================================== */
        cmq: {
            options: {
                log: false
            },
            dist: {
                files: {
                    '<%= directories.project %>/css/': ['<%= directories.project %>/css/main.css']
                }
            }
        },
        /** ===================================================================================
         * CSS - Minification
         =================================================================================== */
        cssmin: {
            options: {
                rebase: false
            },
            dist: {
                expand: true,
                cwd: '<%= directories.project %>/css/',
                src: ['main.css'],
                dest: '<%= directories.project %>/css/',
                ext: '.min.css'
            }
        },
        /** ===================================================================================
         * Javascript - Combine
         =================================================================================== */
        concat: {
            dist: {
                src: [
                    '<%= directories.jquery %>/jquery.min.js',
                    '<%= directories.jqueryUI %>/jquery-ui.min.js',
                    '<%= directories.jqueryInputMask %>/dist/jquery.inputmask.bundle.min.js',
                    '<%= directories.jqueryValidation %>/dist/jquery.validate.min.js',
                    '<%= directories.modernizr %>/modernizr.js',
                    '<%= directories.bootstrap %>/bootstrap.js',
                    '<%= directories.project %>/javascript/thirdparty/*.js',
                    '<%= directories.project %>/javascript/src/*.js'
                ],
                dest: '<%= directories.project %>/javascript/build/script.js'
            }
        },
        /** ===================================================================================
         * Javascript - Minification
         =================================================================================== */
        uglify: {
            build: {
                src: '<%= directories.project %>/javascript/build/script.js',
                dest: '<%= directories.project %>/javascript/build/script.min.js'
            }
        },
        /** ===================================================================================
         * Tests - CSS
         =================================================================================== */
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['<%= directories.project %>/css/main.min.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['<%= directories.project %>/css/main.min.css']
            }
        },
        /** ===================================================================================
         * Tests - Javascript
         =================================================================================== */
        jshint: {
            all: ['<%= directories.project %>/javascript/src/*.js']
        },
        /** ===================================================================================
         * Watch Task
         =================================================================================== */
        watch: {
            dist: {
                files: ['<%= directories.project %>/scss/**/*.scss'],
                tasks: ['sass:dist', 'autoprefixer:dist', 'cmq:dist', 'cssmin:dist'],
                options: {
                    spawn: false
                }
            },
            jsConcat: {
                files: ['<%= directories.project %>/javascript/src/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });
    /**
     * Use "matchdep" to load all of our NPM tasks.
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default',['watch']);
}