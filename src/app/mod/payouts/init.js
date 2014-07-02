angular.module("rms.mod.payouts", [
    'ui.router',

    'rms.mod.payouts.controller'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('loggedIn.mod.payouts', {
      url: '/payouts',
      access_level: 1,
      views: {
        'main-content': {
          templateUrl: 'mod/payouts/views/index.tpl.html',
          controller: 'PayoutsController'
        }
      }
    });
  }
);