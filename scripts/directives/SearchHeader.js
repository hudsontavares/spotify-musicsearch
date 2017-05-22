define (["controllers/SearchHeader"], function (SearchHeaderController) {
    var SearchHeader = {
      "restrict": "E",
      "templateUrl": "/scripts/templates/SearchHeader.html",
      "controller": SearchHeaderController,
      "controllerAs": "searchHeader",
      "bindToController": true
    };

    /* Dependencies injection */
    SearchHeader.$inject = [];

    /* Assigns directive to an app instance */
    SearchHeader.assign = function (app) {
      var _this = this;
      return app.directive("searchHeader", function () {
        return _this;
      });
    };

    return SearchHeader;
});
