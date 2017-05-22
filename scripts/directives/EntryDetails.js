define (["controllers/EntryDetails"], function (EntryDetailsController) {
    var EntryDetails = {
      "restrict": "E",
      "templateUrl": "/scripts/templates/EntryDetails.html",
      "controller": EntryDetailsController,
      "controllerAs": "entryDetails",
      "bindToController": true
    };

    /* Dependencies injection */
    EntryDetails.$inject = [];

    /* Assigns directive to an app instance */
    EntryDetails.assign = function (app) {
      var _this = this;
      return app.directive("entryDetails", function () {
        return _this;
      });
    };

    return EntryDetails;
});
