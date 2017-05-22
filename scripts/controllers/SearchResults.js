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
      var _this = this;

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

      this.showDetails = function (entry) {
        MessageService.trigger("entry:details", entry);
        return this;
      };

      this.focus = function () {
        Utils.scrollTo($element);
        return this;
      };

      MessageService.register(
        "searchbox:search",
        function (params) {
          _this.loader.set("Loading data, please wait...");
          _this.resultsShown = _this.resultsPerPage;
          if (_this.resultSet !== null)
            _this.resultSet.entries = [];
          DataService.search(params, function (resultSet) {
          MessageService.trigger("searchbox:results", _this.resultSet = resultSet, _this.resultsPerPage);
          if (_this.resultSet.entries.length === 0) {
            _this.loader.message = "No results found.";
            return;
          }
          Utils.addClass(document.body, "with-results");
          _this.loader.unset();
          MessageService.trigger("searchresults:render");
        },
        function (error) {
          Utils.removeClass(document.body, "with-results");
          return _this.loader.set(error);
        }
      );
      });
    };

    /* Dependencies injection */
    SearchResults.$inject = ["MessageService", "DataService"];

    /* Assigns directive to an app instance */
    SearchResults.assign = function (app) {
      var _this = this;
      return app.controller("SearchResultsController", function (MessageService, DataService) {
        return new _this(MessageService, DataService);
      });
    };

    return SearchResults;
});
