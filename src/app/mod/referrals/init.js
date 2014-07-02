angular.module("rms.mod.referrals", [
    'ui.router',

    'rms.mod.referrals.controller'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('loggedIn.mod.referrals', {
      url: '/referrals',
      access_level: 1,
      views: {
        'main-content': {
          templateUrl: 'mod/referrals/views/index.tpl.html',
          controller: 'ReferralsController'
        }
      }
    });
  });