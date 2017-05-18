requirejs.config({
  "baseUrl": "/scripts/"
});

require(["app"], function (app) {
  angular.bootstrap(document, ["App"]);
});
