angular.module('common.modal', ['ui.bootstrap'])

  .service('CommonModal', function ($modal) {
    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      templateUrl: 'common/templates/modal.html'
    };

    var modalOptions = {
      closeButtonText: 'Close',
      actionButtonText: 'Save',
      headerText: 'Proceed?',
      bodyText: 'Perform this action'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
      if (!customModalDefaults) {
        customModalDefaults = {};
      }
      customModalDefaults.backdrop = 'static';
      return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
      var tempModalDefaults = {};
      var tempModalOptions = {};

      angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

      angular.extend(tempModalOptions, modalOptions, customModalOptions);

      if (!tempModalDefaults.controller) {
        tempModalDefaults.controller = function ($scope, $modalInstance) {
          $scope.modalOptions = tempModalOptions;

          $scope.modalOptions.ok = function (result) {
            $modalInstance.close(result);
          };

          $scope.modalOptions.close = function (result) {
            $modalInstance.dismiss('cancel');
          };
        };
      }

      return $modal.open(tempModalDefaults).result;
    };
  }
);