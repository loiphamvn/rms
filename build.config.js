/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',

  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  vendor_files: {
    js: [
      'vendor/angular/angular.js',
      "vendor/angular-ui-router/release/angular-ui-router.js",
      'vendor/angular-bootstrap/ui-bootstrap.min.js',
      "vendor/angular-bootstrap/ui-bootstrap-tpls.min.js",
      "vendor/angular-route/angular-route.min.js",
      "vendor/angular-cookies/angular-cookies.min.js",
      "vendor/lodash/dist/lodash.compat.min.js",
      "vendor/restangular/dist/restangular.js"
    ],
    css: [
      'css/bootstrap.css',
      'css/plugins.css',
      'css/main.css',
      'css/themes.css'
    ],
  }
};
