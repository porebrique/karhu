/*global require,  module */

// Generated on 2014-09-15 using generator-angular 0.9.8
(function () {
    'use strict';

    // # Globbing
    // for performance reasons we're only matching one level down:
    // 'test/spec/{,*/}*.js'
    // use this if you want to recursively match all subfolders:
    // 'test/spec/**/*.js'

    module.exports = function (grunt) {

        // Load grunt tasks automatically
        require('load-grunt-tasks')(grunt);

        // Time how long tasks take. Can help when optimizing build times
        require('time-grunt')(grunt);

        // Configurable paths for the application
        var appConfig = {
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        };



        
        // Define the configuration for all the tasks
        grunt.initConfig({

            // Project settings
            yeoman: appConfig,

            // Watches files for changes and runs tasks based on the changed files
            watch: {
                bower: {
                    files: ['bower.json'],
                    tasks: ['wiredep']
                },
                js: {
                    files: ['<%= yeoman.app %>/src/{,*/}*.js'],
                    tasks: ['newer:jshint:all'],
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    }
                },
                jsTest: {
                    files: ['test/spec/{,*/}*.js'],
                    tasks: ['newer:jshint:test', 'karma']
                },
                styles: {
                    files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                    tasks: ['newer:copy:styles', 'autoprefixer']
                },
                gruntfile: {
                    files: ['Gruntfile.js']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= yeoman.app %>/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            },

            // The actual grunt server settings
            connect: {
                options: {
                    port: 9000,
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: 35729
                },
                livereload: {
                    options: {
                        open: true,
                        middleware: function (connect) {
                            return [
                                connect.static('.tmp'),
                                connect().use(
                                    '/bower_components',
                                    connect.static('./bower_components')
                                ),
                                connect.static(appConfig.app)
                            ];
                        }
                    }
                },
                test: {
                    options: {
                        port: 9001,
                        middleware: function (connect) {
                            return [
                                connect.static('.tmp'),
                                connect.static('test'),
                                connect().use(
                                    '/bower_components',
                                    connect.static('./bower_components')
                                ),
                                connect.static(appConfig.app)
                            ];
                        }
                    }
                },
                dist: {
                    options: {
                        open: true,
                        base: '<%= yeoman.dist %>'
                    }
                }
            },

            // Make sure code styles are up to par and there are no obvious mistakes
            jshint: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                all: {
                    src: [
                        'Gruntfile.js',
                        '<%= yeoman.app %>/src/{,*/}*.js'
                    ]
                },
                test: {
                    options: {
                        jshintrc: 'test/.jshintrc'
                    },
                    src: ['test/spec/{,*/}*.js']
                }
            },

            // Empties folders to start fresh
            clean: {
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/{,*/}*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }]
                },
                server: '.tmp'
            },

            // Add vendor prefixed styles
            autoprefixer: {
                options: {
                    browsers: ['last 1 version']
                },
                dist: {
                    files: [{
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }]
                }
            },

            // Automatically inject Bower components into the app
            wiredep: {
                app: {
                    src: ['<%= yeoman.app %>/index.html'],
                    ignorePath: /\.\.\//
                }
            },
            
            ngtemplates: {
                App: {
                    options: {
                       // usemin: 'dist/vendors.js', // <~~ This came from the <!-- build:js --> block
//                        usemin: 'js/templates.js'
                        prefix: '/static/ngadmin'
//                        prefix: ''
                    },
//                    cwd: 'app',
                    src: ['app/templates/**.html', 'app/**/templates/**.html'],
                    dest: '<%= yeoman.dist %>/js/templates.js'
                }
            },

            replace: {
                cssurls: {
                    src:  ['<%= yeoman.dist %>/styles/main.css',
                           '<%= yeoman.dist %>/styles/vendor.css'],
                    dest: '<%= yeoman.dist %>/styles/',
                    replacements: [
                        {
//                            http://www.regexr.com/
                            from: /(url)\([\" \']?\/?(([A-Z a-z \d \. \-])*\/)*([A-Z a-z \d \-]*)\.([A-Z a-z \d \.]*)[\" \']?\)/igm,
                            to: function (matched) {
//                                console.log('matched:', matched);
                                var arr = matched.split('/'),
                                    filename = arr[arr.length - 1].replace(')', ''),
                                    ext, type, path;
                                filename = filename.replace('"', '');
                                filename = filename.replace("'", '');
//                                console.log('filename:', filename);
                                ext = filename.split('.')[1];
//                                console.log('type is', ext);
                                if (ext === 'gif' || ext === 'png' || ext === 'jpg') {
                                    type = 'images';
                                } else {
                                    type = 'fonts';
                                }
                                path = 'url("/static/ngadmin/dist/' + type + '/' + filename + '")';
//                                console.log('returning ', path);
                                return path;
                                
                            }
                        }
                    ]
                },
                
                rewriteurlsinhtml: {
                    src: ['<%= yeoman.dist %>/index.html'], // source files array (supports minimatch)
                    dest: '<%= yeoman.dist %>/index.html', // destination directory or file
                    replacements: [
                        {
                            from: 'styles/vendor.css',
                            to: '/static/ngadmin/dist/styles/vendor.css'
                        },
                        {
                            from: 'styles/main.css',
                            to: '/static/ngadmin/dist/styles/main.css'
                        },
                        {
                            from: 'app/styles',
                            to: '/static/ngadmin/dist/styles'
                        },
//                        {from: 'js/src.js', to: '/static/ngadmin/dist/js/src.js'},
//                        {from: 'js/vendor.js', to: '/static/ngadmin/dist/js/vendor.js'},
                        {from: 'js/', to: '/static/ngadmin/dist/js/'},
                        {
                            from: 'app/src/',
                            to: '/static/ngadmin/dist/js/'
                        }
//                        {
//                            from: 'bower_components/jcrop//static/',  //guess here must be regexp
//                            to:   '/static/'
//                        }
                        
                    ]
                },
                includetemplates: {
//                    src: ['<%= yeoman.app %>/index.html'],
//                    dest: ['<%= yeoman.app %>/index.html'],
                    src: ['<%= yeoman.dist %>/index.html'],
                    dest: ['<%= yeoman.dist %>/index.html'],
                    replacements: [{
//                        from: '</body>',
                        from: '<!-- [ngtemplates] -->',
                        to: '<script src="/static/ngadmin/dist/js/templates.js"></script>'
                        
                    }]
                    
                },
                cleandjango: {
                    src: ['<%= yeoman.app %>/index.html'], // source files array (supports minimatch)
                    dest: '<%= yeoman.app %>/', // destination directory or file
                    replacements: [
                        {
                            from: /(\{\s?%)\s?(static)\s?\'(\S*)\'\s?(%\s?\})/igm,
                            to: function (match) {
//                                console.log('match', match);
                                var answer = match;
                                answer = answer
                                    .replace("{%", "")
                                    .replace("%}", "")
                                    .replace("'", "")
                                    .replace("'", "")
                                    .replace('"', "")
                                    .replace("static", "")
                                    .replace("ngadmin/", "")
                                    .trim();
//                                console.log('replace by', answer);
                                return answer;
                            }
                        }
                    ]
                }
            },
            
            // Renames files for browser caching purposes
            filerev: {
                dist: {
                    src: [
                        '<%= yeoman.dist %>/src/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            },

            // Reads HTML for usemin blocks to enable smart builds that automatically
            // concat, minify and revision files. Creates configurations in memory so
            // additional tasks can operate on them
            useminPrepare: {
                html: '<%= yeoman.app %>/index.html',
                options: {
                    dest: '<%= yeoman.dist %>',
                    flow: {
                        html: {
                            steps: {
                                js: ['concat', 'uglifyjs'],
                                css: ['cssmin']
                            },
                            post: {}
                        }
                    }
                }
            },

            // Performs rewrites based on filerev and the useminPrepare configuration
            usemin: {
                html: ['<%= yeoman.dist %>/{,*/}*.html'],
                css: ['<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/app/styles/{,*/}*.css'],
                options: {
                    //dirs: ['<%= yeoman.dist %>'],
                    assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
                }
            },

            // The following *-min tasks will produce minified files in the dist folder
            // By default, your `index.html`'s <!-- Usemin block --> will take care of
            // minification. These next options are pre-configured if you do not wish
            // to use the Usemin blocks.
            // cssmin: {
            //   dist: {
            //     files: {
            //       '<%= yeoman.dist %>/styles/main.css': [
            //         '.tmp/styles/{,*/}*.css'
            //       ]
            //     }
            //   }
            // },
            // uglify: {
            //   dist: {
            //     files: {
            //       '<%= yeoman.dist %>/scripts/scripts.js': [
            //         '<%= yeoman.dist %>/scripts/scripts.js'
            //       ]
            //     }
            //   }
            // },
            // concat: {
            //   dist: {}
            // },

            imagemin: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }]
                }
            },

            svgmin: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }]
                }
            },

            htmlmin: {
                dist: {
                    options: {
                        collapseWhitespace: true,
                        conservativeCollapse: true,
                        collapseBooleanAttributes: true,
                        removeCommentsFromCDATA: true,
                        removeOptionalTags: true
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }]
                }
            },

            // ng-annotate tries to make the code safe for minification automatically
            // by using the Angular long form for dependency injection.
            ngAnnotate: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: '.tmp/concat/src',
                        src: ['*.js', '!oldieshim.js'],
                        dest: '.tmp/concat/src'
                    }]
                }
            },

            // Replace Google CDN references
            cdnify: {
                dist: {
                    html: ['<%= yeoman.dist %>/*.html']
                }
            },


            // Copies remaining files to places other tasks can use
            copy: {
                backup: {
                    files: [{
                        expand: true, //?
                        dot: true, //?
                        cwd: '<%= yeoman.app %>',
//                        dest: '<%= yeoman.dist %>/backup',
                        dest: '.tmp/',
                        src: [
                            'index.html'
                        ]
                    }]
                },
                unbackup: {
                    files: [{
                        expand: true, //?
                        dot: true, //?
//                        cwd: '<%= yeoman.dist %>/backup',
                        cwd: '.tmp/',
                        dest: '<%= yeoman.app %>',
                        src: [
                            'index.html'
                        ]
                    }]
                },

                themes: {
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/styles/themes',
                        dest: '<%= yeoman.dist %>/styles/themes',
                        src: ['**/*.css', '**/*.png', '**/*.gif', '**/*.jpg', '**/*.woff', '**/*.otf']
                    }]
                },
                notminified: {
                    files: [{
                        expand: true,
                        cwd: '<%= yeoman.app %>/src',
                        dest: '<%= yeoman.dist %>/js/',
                        src: ['resolves.js']
                    }
//                            {
//                        expand: true,
//                        flatten: true,
//                        cwd: 'bower_components/jcrop',
//                        dest: '<%= yeoman.dist %>/js/',
//                        src: ['**/jquery.Jcrop.min.js']
//                    }
                           ]
                },
                dist: {
                    files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            //'views/{,*/}*.html',
                            'images/{,*/}*.{webp}',
                            'fonts/*'
                        ]
                    }, {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }]
                },
                fonts: {
                    expand: true,
                    flatten: true,
                    cwd: 'bower_components/',
                    src: ['**/*.otf', '**/*.woff'],
                    dest: '<%= yeoman.dist %>/fonts/'
                    
                },
                styles: {
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    dest: '.tmp/styles/',
                    src: '{,*/}*.css'
                }
            },

            // Run some tasks in parallel to speed up the build process
            concurrent: {
                server: [
                    'copy:styles'
                ],
                test: [
                    'copy:styles'
                ],
                dist: [
                    'copy:styles',
                    'copy:fonts',
                    'imagemin',
                    'svgmin'
                ]
            },

            // Test settings
            karma: {
                unit: {
                    configFile: 'test/karma.conf.js',
                    singleRun: false
                }
            }
        });


        grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
            if (target === 'dist') {
                return grunt.task.run(['build', 'connect:dist:keepalive']);
            }

            grunt.task.run([
                'clean:server',
                'wiredep',
                'concurrent:server',
                'autoprefixer',
                'connect:livereload',
                'watch'
            ]);
        });

        grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
            grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
            grunt.task.run(['serve:' + target]);
        });

        grunt.registerTask('test', [
            'clean:server',
            'concurrent:test',
            'autoprefixer',
            'connect:test',
            'karma'
        ]);

        grunt.loadNpmTasks("grunt-css-url-rewrite");
//        grunt.loadNpmTasks("grunt-css-url-replace");
//        grunt.registerTask('css-url-replace', ['css-url-replace']);
        
        grunt.registerTask('build', [
            'clean:dist',
            'copy:backup', //my stuff
//            'wiredep',

            'replace:cleandjango', //my
            
            'useminPrepare',
            'concurrent:dist',
//            'autoprefixer',
            'concat',
            'ngAnnotate',
            'copy:dist',
            'copy:themes',
            'copy:notminified',
            'cdnify',
            'cssmin',
            
          //  'filerev',  I dont care about revision for now
            
            //'htmlmin',
            'replace:rewriteurlsinhtml', //my
            'replace:cssurls', //my
            'ngtemplates', //my
            'replace:includetemplates', //my
            'uglify',
            'usemin',
            
            'copy:unbackup' //my stuff
           
        ]);

        grunt.registerTask('default', [
            'newer:jshint',
            'test',
            'build'
        ]);
    };

}());