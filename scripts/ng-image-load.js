( function (angular) {

  angular.module("ngImageLoad", ["ng"])
    .directive("ngImageLoad", function () {
      var directive = {
        "restrict": "A",
        "link": function ($scope, $element, attr) {
          attr.$observe("ngHref", function (href) {
            var image = new Image();
            image.onload = function () {
              $scope.$eval(attr["ngImageLoad"]);
              $scope.$apply();
            };
            image.src = href;
          });
        }
      };

      return directive;
    });

})(angular);
