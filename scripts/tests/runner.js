requirejs.config({
  "baseUrl": "/scripts/"
});

require(["app.specs"], function () {
  window.onload();
});
