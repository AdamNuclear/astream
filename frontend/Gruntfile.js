/**
 * Created by Krtkoff on 12.12.2015.
 */


module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadTasks(   './modules/routes/tasks');

    var buildConfig = require('./build.config.js');

    var defaultConfig = {
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all:[
                '<%= build_dir %>',
                '<%= compile_dir %>'
            ],
            compile: {src:['<%= compile_dir %>/**/*','!<%= compile_dir %>/*.gz']},
            compilefull: ['<%= compile_dir %>'],
            build: ['<%= build_dir %>']
        },
        copy: {
            build_app_assets: {

                src: [ '**','!node_modules/**' ],
                dest: '<%= build_dir %>/client/assets',
                cwd: '<%= app_dir %>/assets',
                expand: true

            },
            build_vendor_assets: {

                src: [ '<%= vendor_files.assets %>' ],
                dest: '<%= build_dir %>/client/assets',
                cwd: '<%= vendor_dir %>',
                expand: true,
                flatten: true

            },
            build_appjs: {

                src: [ '<%= app_files.js %>' ],
                dest: '<%= build_dir %>/client/js',
                cwd: '<%= app_dir %>',
                expand: true

            },
            build_vendorjs: {
                src: [ '<%= vendor_files.js %>' ],
                dest: '<%= build_dir %>/client/js/vendor',
                cwd: '<%= vendor_dir %>',
                expand: true
            },
            compile_appconfig: {

                src: '<%= copy.build_appjs.dest %>/app/config.js',
                dest: '<%= compile_dir %>/client/js/<%= pkg.name %>-config.default.js'

            },
            compile_assets: {

                src: [ '**' ],
                dest: '<%= compile_dir %>/client',
                cwd: '<%= build_dir %>/client/assets',
                expand: true

            },

            compile_server: {
                files: [
                    {
                        src: ['config.defoult.json', 'production.js'],
                        dest: '<%= compile_dir %>/server',
                        cwd: 'server',
                        expand: true
                    },
                    {
                        cwd: '<%= build_dir %>/server',
                        src: ['**'],
                        dest: '<%= compile_dir %>/server',
                        expand: true

                    },
                    {
                        src: ['package.json'],
                        dest: '<%= compile_dir %>',
                        expand:true
                    }
                ]
            }
        },
        uglify: {
            compile: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapIn: '<%= concat.compile_js.dest %>.map',
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'client/src/app'
                },
                expand: true,
                cwd: '<%= app_dir %>',
                src: [ '<%= app_files.atpl %>' ],
                dest: '<%= build_dir %>/client/js/templates-app.js',
                rename: function(dest) {return dest;}
            },

            /**
             * These are the templates from `src/common`.
             */
            common: {
                options: {
                    base: 'client/src/common'
                },
                expand: true,
                cwd: '<%= app_dir %>',
                src: [ '<%= app_files.ctpl %>' ],
                dest: '<%= build_dir %>/client/js/templates-common.js',
                rename: function(dest) {return dest;}
            }
        },
        concat: {
            /**
             * The `build_css` target concatenates compiled CSS and vendor CSS
             * together.
             */
            build_css: {
                src: [
                    buildConfig.vendor_files.css.map(function(file){ return buildConfig.vendor_dir +"/"+ file;}),
                    '<%= sass.build.dest %>'
                ],
                dest: '<%= sass.build.dest %>'

            },
            /**
             * The `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compile_js: {
                options: {
                    sourceMap: true,
                    separator: ';'+grunt.util.linefeed
                },

                src:[
                    buildConfig.vendor_files.js.map(function(file){ return buildConfig.vendor_dir +"/"+ file;}),
                    'client/module.prefix',
                    '<%= build_dir %>/client/js/**/*.module.js',
                    '<%= build_dir %>/client/js/**/*.config.js',
                    '<%= build_dir %>/client/js/**/*.js',
                    '!<%= build_dir %>/client/js/app/config.js',
                    '!<%= copy.build_vendorjs.dest %>/**',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    'client/module.suffix'
                ],

                dest: '<%= compile_dir %>/client/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        sass: {
            options: {
                loadPath: [],
                trace: true,
                sourcemap: 'auto'
            },
            watcher: {
                options: {
                    style: 'compact'
                },
                expand: true,
                cwd: '<%= app_files_dir %>',
                src: '<%= app_files.sass %>',
                dest: '<%= app_files_dir %>/<%= app_files.sass %>.css',
                rename: rename
            },
            build: {
                options: {
                    style: 'compact'
                },
                expand: true,
                cwd: '<%= app_dir %>',
                src: '<%= app_files.sass %>',
                dest: '<%= build_dir %>/client/styles/<%= pkg.name %>-<%= pkg.version %>.css',
                rename: rename
            },
            compile:{
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                src: '<%= sass.build.dest %>',
                dest: '<%= compile_dir %>/client/styles/<%= pkg.name %>-<%= pkg.version %>.css'
            }
        },
        index: {

            build: {
                dir:'<%= build_dir %>/client',
                files: [
                    {expand:true,cwd:'<%= copy.build_vendorjs.dest %>',src:['<%= vendor_files.js %>']},
                    {expand:true,cwd:'<%= copy.build_appjs.dest %>',src:['**/*.js','!vendor/**']},
                    {src:['<%= sass.build.dest %>']}
                ],
                target: '<%= build_dir %>/client/index.html'
            },

            compile: {
                dir: '<%= compile_dir %>/client',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= compile_dir %>/client/js/<%= pkg.name %>-config.js',
                    '<%= sass.compile.dest %>'
                ],
                nonull:true,
                target: '<%= compile_dir %>/client/index.html'
            }
        },
        jshint: {
            src: {
                files: [
                    {
                        expand:true,
                        cwd:'<%= app_dir %>',
                        src:'<%= app_files.js %>'
                    }
                ]
            },
            //test: {
            //    files: [
            //        {
            //            src:'<%= app_files.jsunit %>',
            //            cwd:'<%= app_files_dir %>',
            //            expand:true
            //        }
            //    ]
            //},
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },
        expressroutes: {
            build: {
                dir: './client/src/app',
                target: '<%= build_dir %>/server/validRoutes.json'
            }
        },
        ngAnnotate: {
            compile: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        cwd: '<%= build_dir %>/client/js',
                        dest: '<%= build_dir %>/client/js',
                        expand: true
                    }
                ]
            }
        },
        compress: {
            options: {
                mode: 'tgz',
                archive: '<%= compile_dir %>/<%= pkg.name %>.<%= pkg.version %>.tar.gz'
            },
            compile: {
                expand: true,
                cwd: '<%= compile_dir %>/',
                src: ['**/*','!node_modules/**','!**/*config.js*'],
                dest: ''
            }
        }
    };



    // Project configuration.
    grunt.initConfig(grunt.util._.extend(buildConfig, defaultConfig));


    grunt.registerTask('default', [ 'test', 'build', 'compile' ]);

    grunt.registerTask('test', [ 'jshint' ]);

    grunt.registerTask('build', [

        'clean:build',

        'html2js',

        'sass:build',
        'concat:build_css',

        'copy:build_app_assets',
        'copy:build_vendor_assets',
        'copy:build_appjs',
        'copy:build_vendorjs',

        'index:build',

        'expressroutes:build'

    ]);
    grunt.registerTask('compile', [

        'clean:compilefull',

        'copy:compile_assets',
        'sass:compile',

        'ngAnnotate',

        'concat:compile_js',
        'uglify',

        'copy:compile_appconfig',

        'index:compile',

        'copy:compile_server'
    ]);

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + this.data.dir + '|client)\/', 'g');

        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        this.data.target = this.data.target || 'index.html';
        this.data.target = grunt.template.process(this.data.target);

        grunt.file.copy('client/src/index.html', this.data.target, {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        title: 'nothing',
                        jsFiles: jsFiles,
                        cssFiles: cssFiles,
                        additional_headers: '',
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    function rename(dest){return dest;}
};