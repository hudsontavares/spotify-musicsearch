requirejs.config({
  "baseUrl": "/scripts/"
});

require(["app.spec"], function () {
  window.onload();
});
