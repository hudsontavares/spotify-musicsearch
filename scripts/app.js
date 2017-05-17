define([
  "services/DataService",
  "services/MessageService",
  "directives/SearchHeader",
  "directives/SearchBox",
  "controllers/SearchBox"
], function (
  DataService,
  MessageService,
  SearchHeader,
  SearchBox,
  SearchBoxController
  ) {

  var app = angular.module("App", []);

  /* Services assignment */
  DataService.assign(app);
  MessageService.assign(app);

  /* Directives assignment */
  SearchHeader.assign(app);
  SearchBox.assign(app);

  /* Controller assignment */
  SearchBoxController.assign(app);

  return app;
});
