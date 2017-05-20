define([
  "services/DataService",
  "services/MessageService",
  "directives/SearchHeader",
  "directives/SearchBox",
  "directives/SearchResults",
  "directives/SearchResult",
  "directives/SearchFooter",
  "controllers/SearchBox",
  "controllers/SearchResults",
  "ng-load"
], function (
  DataService,
  MessageService,
  SearchHeader,
  SearchBox,
  SearchResults,
  SearchResult,
  SearchFooter,
  SearchBoxController,
  SearchResultsController
  ) {

  var app = angular.module("App", ['ngLoad']);

  /* Services assignment */
  DataService.assign(app);
  MessageService.assign(app);

  /* Directives assignment */
  SearchHeader.assign(app);
  SearchBox.assign(app);
  SearchResults.assign(app);
  SearchResult.assign(app);
  SearchFooter.assign(app);

  /* Controllers assignment */
  SearchBoxController.assign(app);
  SearchResultsController.assign(app);

  return app;
});
