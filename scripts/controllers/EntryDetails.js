define(["utils/index"], function (Utils) {
  var EntryDetails = function (MessageService, DataService, $window) {
    var _this = this;

    this.entry = null;
    this.details = [];

    this.unset = function (event) {
      Utils.preventEvent(event);
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

      var ids = [];

      DataService.artistAlbums(
        entry,
        function (entries) {
          ids = entries.map( function (item) {
            return item.id;
          });
        },
        function (error) {
          /* TODO: error treatment */
          console.log(error);
        }
      ).then( function () {
        DataService.albums(
          ids,
          function (entries) {
            MessageService.trigger("entry:details:done", _this.entry = entry, _this.details = entries);
          },
          function (error) {
            /* TODO: error treatment */
            console.log(error);
          }
        );
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
  EntryDetails.$inject = ["MessageService", "DataService", "$window"];

  /* Assigns directive to an app instance */
  EntryDetails.assign = function (app) {
    var _this = this;
    return app.controller("EntryDetailsController", function (MessageService, DataService, $window) {
      return new _this(MessageService, DataService, $window);
    });
  };

  return EntryDetails;
});
