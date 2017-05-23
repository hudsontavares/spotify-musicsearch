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

    var SearchResults = function (MessageService, DataService, LocalStorageService) {
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
        entry.is_loading_details = true;
        MessageService.trigger("entry:details", entry);
        return this;
      };

      this.focus = function () {
        Utils.dom.scrollTo($element);
        return this;
      };

      MessageService.register(
        "searchbox:search",
        function (params) {
          var hash = Utils.request.getHash(DataService.search, params);
          _this.loader.set("Loading data, please wait...");
          _this.resultsShown = _this.resultsPerPage;
          if (_this.resultSet !== null)
            _this.resultSet.entries = [];
          LocalStorageService.contains(hash)
            .then( function (data) {
              console.log(data);
              return data.value;
            }, function () {
              return DataService.search(params);
            })
            .then( function (resultSet) {
              MessageService.trigger("searchbox:results", _this.resultSet = resultSet, _this.resultsPerPage);
              if (_this.resultSet.entries.length === 0) {
                _this.loader.message = "No results found.";
                return;
              }
              Utils.dom.addClass(document.body, "with-results");
              _this.loader.unset();
              MessageService.trigger("searchresults:render");
              return resultSet;
            },
            function (error) {
            Utils.dom.removeClass(document.body, "with-results");
            return _this.loader.set(error);
          })
          .then( function (resultSet) {
            LocalStorageService.object(hash, resultSet);
          });
      });

      MessageService.register("entry:details:done", function (entry) {
        return entry.is_loading_details = false;
      });

      MessageService.register("entry:details:error", function (error, entry) {
        return entry.is_loading_details = false;
      });
    };

    /* Dependencies injection */
    SearchResults.$inject = ["MessageService", "DataService", "LocalStorageService"];

    /* Assigns directive to an app instance */
    SearchResults.assign = function (app) {
      var _this = this;
      return app.controller("SearchResultsController", function (MessageService, DataService, LocalStorageService) {
        return new _this(MessageService, DataService, LocalStorageService);
      });
    };

    return SearchResults;
});
