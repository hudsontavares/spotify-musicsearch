define ([], function () {
    var SearchFooter = {
      "restrict": "E",
      "templateUrl": "/scripts/templates/SearchFooter.html"
    };

    /* Dependencies injection */
    SearchFooter.$inject = [];

    /* Assigns directive to an app instance */
    SearchFooter.assign = function (app) {
      var ref = this;
      return app.directive("searchFooter", function () {
        return ref;
      });
    };

    return SearchFooter;
});
