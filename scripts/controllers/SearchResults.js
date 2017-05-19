define (["utils/index"], function (Utils) {
    function Loader(loading, message) {
      this.loading = loading;
      this.message = message;
      this.set = function (message) {
        this.loading = true;
        this.message = message;
        return this;
      };
      this.unset = function () {
        this.loading = false;
        return this;
      };
      return this;
    };

    var SearchResults = function (MessageService, DataService) {
      var ref = this;

      this.resultSet = null;
      this.loader = new Loader(true, "Your results will appear here");
      this.utils = Utils;

      this.resultsPerPage = this.resultsPerPage || 0;
      this.resultsShown = 0;

      this.hasMore = function () {
        return this.resultSet !== null && this.resultsShown < this.resultSet.entries.length;
      };

      this.showMore = function() {
        this.resultsShown = parseInt(this.resultsShown) + parseInt(this.resultsPerPage);
        return this;
      };

      MessageService.register(
        "searchbox:search",
        function (params) {
          ref.loader.set("Loading data, please wait...");
          ref.resultsShown = ref.resultsPerPage;
          DataService.get(params, function (resultSet) {
          MessageService.trigger("searchbox:results", ref.resultSet = resultSet, this.resultsPerPage);
          if (ref.resultSet.entries.length === 0) {
            ref.loader.message = "No results found.";
            return;
          }
          Utils.addClass(document.body, "with-results");
          ref.loader.unset();
        },
        function (error) {
          Utils.removeClass(document.body, "with-results");
          return ref.loader.set(error);
        }
      );
      });
    };

    /* Dependencies injection */
    SearchResults.$inject = ["MessageService", "DataService"];

    /* Assigns directive to an app instance */
    SearchResults.assign = function (app) {
      var ref = this;
      return app.controller("SearchResultsController", function (MessageService, DataService) {
        return new ref(MessageService, DataService);
      });
    };

    return SearchResults;
});
