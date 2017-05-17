define (["controllers/SearchResults"], function (SearchResultsController) {
    var SearchResults = {
      "restrict": "E",
      "templateUrl": "/scripts/templates/SearchResults.html",
      "controller": SearchResultsController,
      "controllerAs": "vm"
    };

    /* Dependencies injection */
    SearchResults.$inject = [];

    /* Assigns directive to an app instance */
    SearchResults.assign = function (app) {
      var ref = this;
      return app.directive("searchResults", function () {
        return ref;
      });
    };

    return SearchResults;
});
