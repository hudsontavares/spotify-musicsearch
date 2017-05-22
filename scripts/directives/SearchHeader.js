define ([], function () {
    var SearchHeader = {
      "restrict": "E",
      "templateUrl": "/scripts/templates/SearchHeader.html"
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
