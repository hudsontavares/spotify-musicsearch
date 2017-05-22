define(["models/ResultSet", "models/ResultEntry"], function (ResultSet, ResultEntry) {
    var DataService = function ($http) {
      var _this = this;
      this.baseUrl = 'https://api.spotify.com';

      /* Searches data from Spotify */
      this.search = function (params, success, failure) {
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

      /* Gets artist albums from Spotify */
      this.artistAlbums = function (entry, success, failure) {
        return $http({
          "method": "GET",
          "url": this.baseUrl + "/v1/artists/" + entry.id + "/albums",
          "params": {
            "type": "album",
            "limit": 20
          }
        })
        .then( function (response) {
          success(response.data.items);
          return true;
        }, failure);
      };

      /* Get album details by ID */
      this.albums = function (ids, success, failure) {
        return $http({
          "method": "GET",
          "url": this.baseUrl + "/v1/albums",
          "params": {
            "ids": ids.join(",")
          }
        })
        .then( function (response) {
          success(response.data.albums.map( function (item) {
            return new ResultEntry(item);
          }));
          return true;
        }, failure);
      };

      return this;
    };

    /* Dependencies injection */
    DataService.$inject = ['$http'];

    /* Assigns service an app instance */
    DataService.assign = function (app) {
      var _this = this;
      return app.factory("DataService", function ($http) {
        return new _this($http);
      });
    };

    return DataService;
});
