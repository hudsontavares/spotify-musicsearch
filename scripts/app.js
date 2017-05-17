define([
  "services/DataService",
  "services/MessageService",
], function (
  DataService,
  MessageService
  ) {

  var app = angular.module("App", []);

  DataService.assign(app);
  MessageService.assign(app);

  return app;
});
