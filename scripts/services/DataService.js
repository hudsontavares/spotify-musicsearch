define(["models/ResultSet", "models/ResultEntry"], function (ResultSet, ResultEntry) {
    var DataService = function ($http, LocalStorageService, $q) {
      var _this = this;
      this.baseUrl = 'https://api.spotify.com';

      /* Searches data from Spotify */
      this.search = function search (params) {
        return $http({
          "method": "GET",
          "url": _this.baseUrl + "/v1/search",
          "params": params || {}
        })
        .then( function (response) {
          return new ResultSet(response.data);
        }, function (error) {
          return error;
        });
      };

      /* Gets artist albums from Spotify */
      this.artistAlbums = function artistAlbums (entry) {
        return $http({
          "method": "GET",
          "url": _this.baseUrl + "/v1/artists/" + entry.id + "/albums",
          "params": {
            "type": "album",
            "limit": 20
          }
        })
        .then( function (response) {
          return response.data.items.map( function (item) {
            return item.id;
          });
        }, function (error) {
          return error;
        });
      };

      /* Get album details by ID */
      this.albums = function albums (ids, success, failure) {
        return $http({
          "method": "GET",
          "url": _this.baseUrl + "/v1/albums",
          "params": {
            "ids": ids.join(",")
          }
        })
        .then( function (response) {
          return response.data.albums.map( function (item) {
            return new ResultEntry(item);
          });
        }, function (error) {
          return error;
        });
      };

      return this;
    };

    /* Dependencies injection */
    DataService.$inject = ["$http", "LocalStorageService"];

    /* Assigns service an app instance */
    DataService.assign = function (app) {
      var _this = this;
      return app.factory("DataService", function ($http, LocalStorageService) {
        return new _this($http, LocalStorageService);
      });
    };

    return DataService;
});
