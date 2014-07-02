angular.module('rms.mod', [
    'rms.mod.dashboard',
    'rms.mod.users',
    'rms.mod.referrals',
    'rms.mod.purchases',
    'rms.mod.payouts',
    'rms.mod.security',
    'rms.mod.settings',

    'common.api',

    "directive.navbar"
  ])

  .config(function ($stateProvider) {

    // Top state for the planning section
    $stateProvider
      .state('loggedIn.mod', {
        abstract: true,
        url: '/mod',
        views: {
          'header': {
            templateUrl: 'layouts/header/header.tpl.html'
          },
          'middle-container': {
            templateUrl: 'layouts/content/layout-mod.tpl.html'
          },
          'footer': {
            templateUrl: 'layouts/footer/footer.tpl.html'
          }
        }
      });
  })

  .controller('ModController', function ($scope) {

  });
