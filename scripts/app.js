define([
  "services/DataService",
  "services/MessageService",
  "directives/SearchHeader"
], function (
  DataService,
  MessageService,
  SearchHeader
  ) {

  var app = angular.module("App", []);

  /* Services assignment */
  DataService.assign(app);
  MessageService.assign(app);

  /* Directives assignment */
  SearchHeader.assign(app);

  return app;
});
