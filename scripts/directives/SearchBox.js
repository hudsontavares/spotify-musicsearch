define (["controllers/SearchBox"], function (SearchBoxController) {
    var SearchBox = {
      "restrict": "E",
      "templateUrl": "./scripts/templates/SearchBox.html",
      "controller": SearchBoxController,
      "controllerAs": "searchBox",
      "bindToController": true,
      "transclude": true
    };

    /* Dependencies injection */
    SearchBox.$inject = [];

    /* Assigns directive to an app instance */
    SearchBox.assign = function (app) {
      var _this = this;
      return app.directive("searchBox", function () {
        return _this;
      });
    };

    return SearchBox;
});
