angular.module("rms.mod.payouts.controller", [
    'common.api',
    'common.unique',
    'ui.bootstrap'
  ])

  .controller("PayoutsController", function ($scope, CommonApi, $modal, $state) {
    var modalDefaults;

    CommonApi.all('payouts').then(function (payouts) {
      $scope.payouts = payouts.data;
    });

    $scope.viewPayout = function (payout) {
      modalDefaults = {
        templateUrl: 'mod/payouts/views/detail.tpl.html',
        controller: function ($scope, $modalInstance) {
          $scope.payout = payout;

          $scope.title = 'View payout';

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      };

      $modal.open(modalDefaults);
    };

    $scope.deletePayout = function (payout) {
      modalDefaults = {
        templateUrl: 'common/templates/modal.html',
        controller: function ($scope, $modalInstance) {
          $scope.title = 'Delete payout';

          $scope.body = 'Are you sure to delete this payout ???';

          $scope.ok = function () {
            CommonApi.post('payouts/delete', {'id': payout.id})
              .then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('payouts', null, { reload: true });
              });
          };
          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      };

      $modal.open(modalDefaults);
    };

    $scope.savePayout = function (action) {
      if (action === 'add') {
        modalDefaults = {
          templateUrl: 'mod/payouts/views/formadd.tpl.html',
          controller: function ($scope, $modalInstance, CommonApi) {
            var preload = function () {
              $scope.formadd = {'date': new Date(), 'recipient': '', 'amount': 0 };
              $scope.recipients = [];

              CommonApi.all("users").then(function (users) {
                $scope.recipients = users.data;
              });
            };

            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
            };

            $scope.title = 'Add a new payout';

            $scope.ok = function () {
              $scope.formadd.date = $scope.formadd.date.getTime();

              CommonApi.post('payouts/create', $scope.formadd).then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('payouts', null, { reload: true });
              });
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            preload();
          }
        };
      } else {
        modalDefaults = {
          templateUrl: 'mod/payouts/views/formadd.tpl.html',
          controller: function ($scope, $modalInstance) {
            var preload = function () {
              $scope.formadd = action;

              $scope.recipients = [];

              CommonApi.all("users").then(function (users) {
                $scope.recipients = users.data;
              });
            };

            $scope.title = 'Update payout';

            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
            };

            $scope.ok = function () {
              //$scope.formadd.date = $scope.formadd.date.getTime();

              CommonApi.post('payouts/update', $scope.formadd).then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('payouts', null, { reload: true });
              });
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            preload();
          }
        };
      }

      $modal.open(modalDefaults);
    };
  });