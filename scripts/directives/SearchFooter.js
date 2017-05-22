define ([], function () {
    var SearchFooter = {
      "restrict": "E",
      "templateUrl": "/scripts/templates/SearchFooter.html"
    };

    /* Dependencies injection */
    SearchFooter.$inject = [];

    /* Assigns directive to an app instance */
    SearchFooter.assign = function (app) {
      var _this = this;
      return app.directive("searchFooter", function () {
        return _this;
      });
    };

    return SearchFooter;
});
