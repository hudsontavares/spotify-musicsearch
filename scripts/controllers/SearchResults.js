define ([], function () {
    function Loader(loading, message) {
      this.loading = typeof(loading) === "boolean" ? loading : false;
      this.message = typeof(message) === "string" ? message : "Loading data, please wait...";
      return this;
    };

    var SearchResults = function (MessageService, DataService) {
      var ref = this;
      ref.resultSet = null;
      ref.loader = new Loader();
      MessageService.register(
        "searchbox:search",
        function (params) {
          DataService.get(params, function (resultSet) {
          MessageService.trigger("searchbox:results",
            ref.resultSet = ref.resultSet === null ? resultSet : ref.resultSet.merge(resultSet)
          );
          return true;
        },
        function (error) {
          /* TODO: error handling */
          console.log(error);
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
