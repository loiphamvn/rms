angular.module("rms.mod.dashboard", [
    'rms.mod.dashboard.controller'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('loggedIn.mod.dashboard', {
      url: '/dashboard',
      views: {
        'main-content': {
          templateUrl: 'mod/dashboard/views/index.tpl.html',
          controller: 'DashboardController'
        }
      }
    });
  });