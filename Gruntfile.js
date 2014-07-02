module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');


  var userConfig = require('./build.config.js');

  //TASK CONFIG
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),

    karmaconfig: {
      unit: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/common/directives/*.js',
          '<%= build_dir %>/common/*.js',

          '<%= build_dir %>/app/**/**/*.js',
          '<%= build_dir %>/app/**/init.js',

          '<%= build_dir %>/app.js',
          '<%= test_files.js %>'
        ]
      }
    },

    karma: {
      options: {
        configFile: '<%= build_dir %>/test/karma.conf.js',
      },
      unit: {
        autoWatch: true
      },
      continuous: {
        singleRun: true
      }
    },

    clean: [
      '<%= build_dir %>'
    ],

    /**
     * The `index` task compiles the `index.html` file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {
      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/common/directives/*.js',
          '<%= build_dir %>/common/*.js',

          '<%= build_dir %>/app/**/**/*.js',
          '<%= build_dir %>/app/**/init.js',

          '<%= html2js.common.dest %>',
          '<%= html2js.app.dest %>',

          '<%= build_dir %>/app.js',
          '<%= vendor_files.css %>'
        ]
      }
    },

    /**
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) and javascripts into
     * `build_dir`, and then to copy the assets to `compile_dir`.
     */
    copy: {
      build: {
        files: [
          {
            src: [ '**' ],
            dest: '<%= build_dir %>/',
            cwd: "src/",
            expand: true
          }
        ]
      }
    },

    /**
     * HTML2JS is a Grunt plugin that takes all of your template files and
     * places them into JavaScript files as strings that are added to
     * AngularJS's template cache. This means that the templates too become
     * part of the initial payload as one JavaScript file. Neat!
     */
    html2js: {

      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: 'src/app'
        },
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/templates-app.js'
      },

      /**
       * These are the templates from `src/common`.
       */
      common: {
        options: {
          base: 'src/common'
        },
        src: [ '<%= app_files.ctpl %>' ],
        dest: '<%= build_dir %>/templates-common.js'
      }
    }
  };//END TASK CONFIG

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.registerTask('test', [
    'karma'
  ]);

  grunt.registerTask('build', [
    //'clean','copy:build', 'index:build', 'karmaconfig', 'karma'
    'clean', 'html2js', 'copy:build', 'index:build', 'karmaconfig', 'karma'
  ]);

  grunt.registerTask('watch', [ 'build' ]);

  /**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS(files) {
    return files.filter(function (file) {
      return file.match(/^vendor/g);
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

  /**
   * A utility function to get all app CSS app sources.
   */
  function filterForJSAppTest(files) {
    return files.filter(function (file) {
      return file.match(/^(?!vendor)/);
    });
  }

  function filterForJSApp(files) {
    return filterForJSAppTest(files).filter(function (file) {
      return file.match(/^((?!spec).)*$/);
    });
  }

  String.prototype.insert = function (index, string) {
    if (index > 0)
      return this.substring(0, index) + string + this.substring(index, this.length);
    else
      return string + this;
  };

  /**
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask('index', 'Process index.html template', function () {
    var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');

    var jsFiles = filterForJS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    var jsAppFiles = filterForJSApp(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filterForCSS(this.files[0].orig.src).map(function (file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scriptsApp: jsAppFiles,
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });

  /**
   * In order to avoid having to specify manually the files needed for karma to
   * run, we use grunt to manage the list for us. The `karma/*` files are
   * compiled as grunt templates for use by Karma. Yay!
   */
  grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
    var jsFiles = filterForJS(this.filesSrc);
    var jsAppFiles = filterForJSAppTest(this.filesSrc);

    grunt.file.copy('src/test/karma.conf.js', this.data.dir + '/test/karma.conf.js', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scriptsApp: jsAppFiles,
            scripts: jsFiles
          }
        });
      }
    });
  });
}