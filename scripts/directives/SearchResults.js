define (["controllers/SearchResults"], function (SearchResultsController) {
    var SearchResults = {
      "restrict": "E",
      "templateUrl": "./scripts/templates/SearchResults.html",
      "scope": {
        "resultsPerPage": "@resultsPerPage"
      },
      "controller": SearchResultsController,
      "controllerAs": "searchResults",
      "bindToController": true
    };

    /* Dependencies injection */
    SearchResults.$inject = [];

    /* Assigns directive to an app instance */
    SearchResults.assign = function (app) {
      var _this = this;
      return app.directive("searchResults", function () {
        return _this;
      });
    };

    return SearchResults;
});
