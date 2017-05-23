define([], function () {
  var LocalStorageService = function ($window, $q) {
    var _this = this, storage = $window.localStorage, isJson = function (text) {
      if (typeof (text) !== "string")
        return false;
      return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g, '')));
    };

    this.object = function (key, value) {
      if (storage === undefined)
        return storage;

      key = isJson(key) ? $window.JSON.stringify(key) : key;

      if (value === undefined) {
        var output = storage[key];
        return isJson(output) ? $window.JSON.parse(output) : output;
      }

      storage[key] = $window.JSON.stringify(value);
      return this;
    };

    this.contains = function (key) {
      var defer = $q.defer(), value = _this.object(key);
      if (value === undefined)
        defer.reject();
      else
        defer.resolve({
          "key": key,
          "value": value
        });
      return defer.promise;
    };

    this.clear = function () {
      if (storage === undefined)
        return storage;
      storage.clear();
      return _this;
    };

    return this;
  };

  /* Dependencies injection */
  LocalStorageService.$inject = ["$window", "$q"];

  /* Assigns service an app instance */
  LocalStorageService.assign = function (app) {
    var _this = this;
    return app.factory("LocalStorageService", function ($window, $q) {
      return new _this($window, $q);
    });
  };

  return LocalStorageService;
});
