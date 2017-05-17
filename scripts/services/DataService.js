define(["models/ResultSet"], function (ResultSet) {
    var DataService = function ($http) {
      this.baseUrl = 'https://api.spotify.com';

      /* Gets data from Spotify */
      this.get = function (params, success, failure) {
        params = params || {};
        params.limit = params.limit || 12;

        return $http.get(this.baseUrl + '/v1/search', params)
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
