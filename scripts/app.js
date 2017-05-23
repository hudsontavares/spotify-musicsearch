define([
  "services/LocalStorageService",
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
  "controllers/SearchFooter",
  "ng-image-load"
], function (
  LocalStorageService,
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
  EntryDetailsController,
  SearchFooterController
  ) {

  var app = angular.module("App", ["ngImageLoad"]);

  /* Services assignment */
  LocalStorageService.assign(app);
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
  SearchFooterController.assign(app);

  return app;
});
