define(["utils/index"], function (Utils) {
  var EntryDetails = function (MessageService, DataService, LocalStorageService, $window) {
    var _this = this;

    this.entry = null;
    this.details = [];

    this.unset = function (event) {
      Utils.dom.preventEvent(event);
      MessageService.trigger("entry:details:clear");
      return _this;
    };

    this.openExternal = function (entry) {
      $window.open(entry.external_url, "_blank");
    }

    MessageService.register("entry:details", function (entry) {
      if (!entry.has_details) {
        _this.openExternal(entry);
        return _this;
      }

      var hashes = {
        "artistAlbums": Utils.request.getHash(DataService.artistAlbums, entry),
        "albums": null
      };

      LocalStorageService.contains(hashes.artistAlbums)
        .then( function (data) {
          return data.value;
        }, function () {
          return DataService.artistAlbums(entry);
        })
        .then( function (ids) {
          return LocalStorageService
          .object(hashes.artistAlbums, ids)
          .contains(hashes.albums = Utils.request.getHash(DataService.albums, ids));
        },
        function (error) {
          $window.alert([
            "The following error happened while retrieving artist albums data:",
            Utils.request.getMessage(error)
          ].join("\n"));
          MessageService.trigger("entry:details:error", error, entry);
        })
        .then( function (data) {
          return data.value;
        }, function () {
          return DataService.albums(LocalStorageService.object(hashes.artistAlbums));
        })
        .then( function (entries) {
          MessageService.trigger("entry:details:done", _this.entry = entry, _this.details = entries);
          return entries;
        },
        function (error) {
          $window.alert([
            "The following error happened while retrieving artist album details data:",
            Utils.request.getMessage(error)
          ].join("\n"));
          MessageService.trigger("entry:details:error", error, entry);
        })
        .then( function (entries) {
          LocalStorageService.object(hashes.albums, entries);
        });

      return _this;
    });

    MessageService.register("entry:details:clear", function () {
      _this.entry = null;
      _this.details = [];
      return _this;
    });

    return this;
  };

  /* Dependencies injection */
  EntryDetails.$inject = ["MessageService", "DataService", "LocalStorageService", "$window"];

  /* Assigns directive to an app instance */
  EntryDetails.assign = function (app) {
    var _this = this;
    return app.controller("EntryDetailsController", function (MessageService, DataService, LocalStorageService, $window) {
      return new _this(MessageService, DataService, LocalStorageService, $window);
    });
  };

  return EntryDetails;
});
