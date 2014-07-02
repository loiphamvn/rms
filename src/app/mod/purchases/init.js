angular.module("rms.mod.purchases", [
    'ui.router',

    'rms.mod.purchases.controller'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('loggedIn.mod.purchases', {
      url: '/purchases',
      access_level: 1,
      views: {
        'main-content': {
          templateUrl: 'mod/purchases/views/index.tpl.html',
          controller: 'PurchasesController'
        }
      }
    });
  }
);