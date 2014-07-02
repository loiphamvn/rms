angular.module("rms.mod.users.controller", [
    'common.api',
    'common.unique',
    'ui.bootstrap'
  ])

  .controller("UsersController", function ($scope, CommonApi, $modal, $state) {
    CommonApi.all('users').then(function (users) {
      $scope.users = users.data;
    });

    $scope.deleteUser = function (user) {
      var modalDefaults = {
        templateUrl: 'common/templates/modal.html',
        controller: function ($scope, $modalInstance) {
          $scope.title = 'Delete user ' + user.firstname + ' ' + user.lastname;

          $scope.body = 'Are you sure to delete this user ???';

          $scope.ok = function () {
            CommonApi.post('users/delete', {'id': user.id}).then(function (message) {
              $modalInstance.dismiss('cancel');
              $state.go('users', null, { reload: true });
            });
          };
          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      };

      $modal.open(modalDefaults);
    };


    $scope.viewUser = function (user) {
      var modalDefaults = {
        templateUrl: 'mod/users/views/detail.tpl.html',
        controller: function ($scope, $modalInstance) {
          $scope.user = user;

          $scope.title = 'View user ' + user.firstname + ' ' + user.lastname;

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }
      };

      $modal.open(modalDefaults);
    };

    $scope.saveUser = function (action) {
      if (action === 'add') {
        var modalDefaults = {
          templateUrl: 'mod/users/views/formadd.tpl.html',
          controller: function ($scope, $modalInstance) {
            $scope.formadd = {'firstname': '', 'lastname': '', 'email': '', 'referral_code': ''};

            $scope.title = 'Add a new user';

            $scope.ok = function () {
              CommonApi.post('users/create', $scope.formadd).then(function (message) {
                $modalInstance.dismiss('cancel');
                $state.go('users', null, { reload: true });
              });
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }
        };

        $modal.open(modalDefaults);

      } else {
        $modal.open(
          {
            templateUrl: 'mod/users/views/formadd.tpl.html',
            controller: function ($scope, $modalInstance) {
              $scope.formadd = action;

              $scope.title = 'Update user ' + action.firstname + ' ' + action.lastname;

              $scope.ok = function () {
                CommonApi.post('users/update', $scope.formadd).then(function (message) {
                  $modalInstance.dismiss('cancel');
                  $state.go('users', null, { reload: true });
                });
              };
              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
            }
          }
        );
      }
    };
  }
);