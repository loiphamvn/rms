angular.module("rms.mod.users", [
    'ui.router',

    'rms.mod.users.controller'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('loggedIn.mod.users', {
      url: '/users',
      access_level: 1,
      views: {
        'main-content': {
          templateUrl: 'mod/users/views/index.tpl.html',
          controller: 'UsersController'
        }
      }
    });
  }
);