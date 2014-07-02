angular.module("rms.security.login", [
    'ui.router',
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/dashboard');

    /**
     * If an unmatched URL is found
     * go to the start of the application
     */
    $stateProvider

    /**
     * An initialization state, for when
     * the app starts for the first time
     * with no URL parameters
     */
      .state('login', {
        url: '/login',
        views: {
          'main-content': {
            templateUrl: 'mod/security/login/views/index.html'
          }
        }
      });
  }
);