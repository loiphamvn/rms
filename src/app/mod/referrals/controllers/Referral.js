angular.module("rms.mod.referrals.controller", [
    'common.api',
    'common.unique',
    'ui.bootstrap'
  ])

  .controller("ReferralsController", function ($scope, CommonApi, $modal, $state) {
    CommonApi.all('referrals').then(function (referrals) {
      $scope.referrals = referrals.data;
    });
    var modalDefault;
    $scope.viewReferral = function (referral) {
      $modal.open({
        templateUrl: 'mod/referrals/views/detail.tpl.html',
        controller: function ($scope, $modalInstance) {
          $scope.referral = referral;

          $scope.title = 'View referral';

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      });
    };


    $scope.deleteReferral = function (referral) {
      $modal.open({
        templateUrl: 'common/templates/modal.html',
        controller: function ($scope, $modalInstance) {
          $scope.title = 'Delete a referral';

          $scope.body = 'Are you sure to delete this referral ???';

          $scope.ok = function () {
            CommonApi.post('referrals/delete', {'id': referral.id}).then(function (message) {
              $modalInstance.dismiss('cancel');
              $state.go('referrals', null, { reload: true });
            });
          };
          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      });
    };

    $scope.saveReferral = function (action) {
      if (action === 'add') {
        modalDefaults = {
          templateUrl: 'mod/referrals/views/formadd.tpl.html',
          controller: function ($scope, $modalInstance, CommonApi) {
            var preload = function () {
              $scope.formadd = {'date': new Date(), 'referrer': '', 'referred': '' };
              $scope.referrers = [];
              $scope.referreds = [];

              CommonApi.all("users").then(function (users) {
                $scope.referrers = users.data;
                $scope.referreds = users.data;
              });
            };

            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
            };

            $scope.title = 'Add a new referral';

            $scope.ok = function () {
              $scope.formadd.date = $scope.formadd.date.getTime();

              CommonApi.post('referrals/create', $scope.formadd).then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('referrals', null, { reload: true });
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
          templateUrl: 'mod/referrals/views/formadd.tpl.html',
          controller: function ($scope, $modalInstance) {
            var preload = function () {
              $scope.formadd = action;

              $scope.referrers = [];
              $scope.referreds = [];

              CommonApi.all("users").then(function (users) {
                $scope.referrers = users.data;
                $scope.referreds = users.data;
              });
            };

            $scope.title = 'Update referral';

            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
            };

            $scope.ok = function () {
              //$scope.formadd.date = $scope.formadd.date.getTime();

              CommonApi.post('referrals/update', $scope.formadd).then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('referrals', null, { reload: true });
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