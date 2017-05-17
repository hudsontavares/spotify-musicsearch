define([
  "services/DataService",
  "services/MessageService",
  "directives/SearchHeader",
  "directives/SearchBox",
  "directives/SearchResults",
  "directives/SearchFooter",
  "controllers/SearchBox",
  "controllers/SearchResults"
], function (
  DataService,
  MessageService,
  SearchHeader,
  SearchBox,
  SearchResults,
  SearchFooter,
  SearchBoxController,
  SearchResultsController
  ) {

  var app = angular.module("App", []);

  /* Services assignment */
  DataService.assign(app);
  MessageService.assign(app);

  /* Directives assignment */
  SearchHeader.assign(app);
  SearchBox.assign(app);
  SearchResults.assign(app);
  SearchFooter.assign(app);

  /* Controllers assignment */
  SearchBoxController.assign(app);
  SearchResultsController.assign(app);

  return app;
});
