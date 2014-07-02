/**
 * @ngdoc overview
 * @name rms
 * @description
 * # rns
 *
 * Main module of the application.
 */
angular.module('rms', [
    'ui.router',
    'ngCookies',
    'templates-app',
    'templates-common',

    'rms.mod',
    'rms.loggedIn',
    'common.api',

    "directive.navbar"
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    /**
     * Set up URL-based navigation.
     * If an unmatched URL is found,
     * go to the start of the application.
     */
    $urlRouterProvider
      .otherwise('/');


    $stateProvider
      // Layout: Blank
      .state('blank', {
        abstract: true,
        views: {
          'root': {
            templateUrl: 'layouts/content/layout-blank.tpl.html'
          }
        }
      })

      /*
       * An initialization state, for when
       * the app starts for the first time
       * with no URL parameters
       */
      .state('init', {
        url: '/',
        resolve: {
          initData: function ($state, $cookieStore, $location) {
            if (true) {
              //$state.go('loggedIn.mod.dashboard', {});
              $location.path('mod/dashboard');
            }
            else {
            }
          }
        }
      });
  })

  .controller("MainController", function ($scope) {
    console.log("MainController");
  });