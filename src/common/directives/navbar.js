angular.module("directive.navbar", [])

  .directive('activeLink', function ($location) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var sref = attrs.uiSref;

        scope.location = $location;

        scope.$watch('location.path()', function (newPath, oldPath) {
          if ('/' + sref === newPath) {
            element.addClass('active');
          }
          else {
            element.removeClass('active');
          }
        });
      }
    };
  }
);