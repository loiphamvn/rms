angular.module("rms.mod.purchases.controller", [
    'common.api',
    'common.unique',
    'ui.bootstrap'
  ])

  .controller("PurchasesController", function ($scope, CommonApi, $modal, $state) {
    CommonApi.all('purchases').then(function (purchases) {
      $scope.purchases = purchases.data;
    });

    $scope.viewPurchase = function (purchase) {
      var modalDefaults = {
        templateUrl: 'mod/purchases/views/detail.tpl.html',
        controller: function ($scope, $modalInstance) {
          $scope.purchase = purchase;

          $scope.title = 'View purchase';

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      };

      $modal.open(modalDefaults);
    };

    $scope.deletePurchase = function (purchase) {
      var modalDefaults = {
        templateUrl: 'common/templates/modal.html',
        controller: function ($scope, $modalInstance) {
          $scope.title = 'Delete a purchase';

          $scope.body = 'Are you sure to delete this purchase ???';

          $scope.ok = function () {
            CommonApi.post('purchases/delete', {'id': purchase.id}).then(function (message) {
              $modalInstance.dismiss('cancel');
              $state.go('purchases', null, { reload: true });
            });
          };
          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      };

      $modal.open(modalDefaults);
    }

    $scope.savePurchase = function (action) {
      if (action === 'add') {
        var modalDefaults = {
          templateUrl: 'mod/purchases/views/formadd.tpl.html',
          controller: function ($scope, $modalInstance, CommonApi) {
            var preload = function () {
              $scope.formadd = {'date': new Date(), 'referrer': '', 'purchaser': '', 'amount': '0', 'commission_amount': '0', 'referral_eligible': false, 'confirmed': false, 'payout': ''};
              $scope.referrers = [];
              $scope.purchasers = [];
              $scope.payouts = [];

              CommonApi.all("users").then(function (users) {
                $scope.purchasers = users.data;
              });

              CommonApi.all("payouts").then(function (payouts) {
                $scope.payouts = payouts.data;
              });
            }

            $scope.chooseReferrer = function () {
              CommonApi.post("referrals", {'purchaser_id': $scope.formadd.purchaser}).then(function (referrals) {
                $scope.referrers = referrals.data;
              });
            }

            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
            }

            $scope.title = 'Add a new purchase';

            $scope.ok = function () {
              $scope.formadd.date = $scope.formadd.date.getTime();

              CommonApi.post('purchases/create', $scope.formadd).then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('purchases', null, { reload: true });
              });
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

            preload();
          }
        };
      } else {
        var modalDefaults = {
          templateUrl: 'mod/purchases/views/formadd.tpl.html',
          controller: function ($scope, $modalInstance) {
            var preload = function () {
              $scope.formadd = action;
              $scope.referrers = [];
              $scope.purchasers = [];
              $scope.payouts = [];

              CommonApi.post("referrals", {'purchaser_id': $scope.formadd.purchaser}).then(function (referrals) {
                $scope.referrers = referrals.data;
              });

              CommonApi.all("users").then(function (users) {
                $scope.purchasers = users.data;
              });

              CommonApi.all("payouts").then(function (payouts) {
                $scope.payouts = payouts.data;
              });
            }

            $scope.title = 'Update referral';

            $scope.chooseReferrer = function () {
              CommonApi.post("referrals", {'purchaser_id': $scope.formadd.purchaser}).then(function (referrals) {
                $scope.referrers = referrals.data;
              });
            }

            $scope.open = function ($event) {
              $event.preventDefault();
              $event.stopPropagation();

              $scope.opened = true;
            }

            $scope.ok = function () {
              //$scope.formadd.date = $scope.formadd.date.getTime();

              CommonApi.post('purchases/update', $scope.formadd).then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('purchases', null, { reload: true });
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
  })