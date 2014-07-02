angular.module("rms.mod.settings", [
    'ui.router',

    'rms.mod.settings.controller'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('loggedIn.mod.settings', {
      url: '/settings',
      access_level: 1,
      views: {
        'main-content': {
          templateUrl: 'mod/settings/views/index.tpl.html',
          controller: 'SettingsController'
        }
      }
    });
  });