define ([], function () {
    var SearchResult = {
      "restrict": "E",
      "templateUrl": "/scripts/templates/SearchResult.html",
      "scope": {
        "entry": "=",
        "type": "@type",
        "title": "@title"
      }
    };

    /* Dependencies injection */
    SearchResult.$inject = [];

    /* Assigns directive to an app instance */
    SearchResult.assign = function (app) {
      var _this = this;
      return app.directive("searchResult", function () {
        return _this;
      });
    };

    return SearchResult;
});
