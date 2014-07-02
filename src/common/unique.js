angular.module('common.unique', ['common.api'])

  .factory('CommonUnique', function (CommonApi) {
    var data = {};

    data.checkUniqueValue = function (id, property, value) {
      if (!id) {
        id = 0;
      }

      return CommonApi.post("unique", {'id': id, 'property': property, 'value': value})
        .then(function (results) {
          return results.data.status;
        }
      );
    };

    return data;
  })

  .directive('myUnique', function (CommonUnique) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        element.bind('blur', function (e) {
            if (!ngModel || !element.val()) {
              return;
            }
            var keyProperty = scope.$eval(attrs.myUnique);
            var currentValue = element.val();

            CommonUnique.checkUniqueValue(keyProperty.key, keyProperty.property, currentValue)
              .then(function (unique) {
                if (currentValue == element.val()) {
                  ngModel.$setValidity('unique', unique);
                }
              }, function () {
                ngModel.$setValidity('unique', true);
              });
          }
        );
      }
    };
  }
);