var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  var returnValue = path.replace(/^\/base\//, '').replace(/\.js$/, '');
  return returnValue;
};

if (typeof (window.__karma) !== "undefined") {
  Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
      // Normalize paths to RequireJS module names.
      allTestFiles.push(pathToModule(file));
    }
  });
}

requirejs.config({
  "baseUrl": "/scripts/"
});

require(["app.specs"], function () {
  window.onload();
});
