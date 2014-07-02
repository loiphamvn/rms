angular.module('rms.loggedIn', [])

  .config(function ($stateProvider) {

    $stateProvider

    /**
     * The loggedIn state injects
     * our basic layout.
     */
      .state('loggedIn', {
        abstract: true,
        views: {
          'root': {
            templateUrl: 'layouts/content/layout-header-middle-footer.tpl.html'
          }
        },
        resolve: {
          // login required.
        }
      });
  });
