define(["models/ResultSet"], function (ResultSet) {
    var DataService = function ($http) {
      this.baseUrl = 'https://api.spotify.com';

      /* Gets data from Spotify */
      this.get = function (params, success, failure) {
        return $http({
          "method": "GET",
          "url": this.baseUrl + "/v1/search",
          "params": params || {}
        })
        .then(function (response) {
          success(new ResultSet(response.data));
          return true;
        }, failure);
      };

      return this;
    };

    /* Dependencies injection */
    DataService.$inject = ['$http'];

    /* Assigns service an app instance */
    DataService.assign = function (app) {
      var ref = this;
      return app.factory("DataService", function ($http) {
        return new ref($http);
      });
    };

    return DataService;
});
