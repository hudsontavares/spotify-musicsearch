define([
  "services/DataService",
  "services/MessageService",
  "directives/SearchHeader",
  "directives/SearchBox",
  "directives/SearchResults",
  "directives/SearchResult",
  "directives/EntryDetails",
  "directives/SearchFooter",
  "controllers/SearchHeader",
  "controllers/SearchBox",
  "controllers/SearchResults",
  "controllers/EntryDetails",
  "ng-load"
], function (
  DataService,
  MessageService,
  SearchHeader,
  SearchBox,
  SearchResults,
  SearchResult,
  EntryDetails,
  SearchFooter,
  SearchHeaderController,
  SearchBoxController,
  SearchResultsController,
  EntryDetailsController
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
  EntryDetails.assign(app);
  SearchFooter.assign(app);

  /* Controllers assignment */
  SearchHeaderController.assign(app);
  SearchBoxController.assign(app);
  SearchResultsController.assign(app);
  EntryDetailsController.assign(app);

  return app;
});
