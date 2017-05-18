define (["utils/index"], function (Utils) {

    var SearchBox = function (MessageService, $window) {
      this.params = {};
      var aliasList = {};
      this.search = function (event) {
        try {
          Utils.preventEvent(event);
          this.check(this.params);
          MessageService.trigger("searchbox:search", this.params);
        }
        catch (error) {
          $window.alert("Please provide a " + error + ".");
        }
      };
      this.init = function (index, value, alias) {
        this.params[index] = value;
        aliasList[index] = alias;
      };
      this.check = function(params) {
        Object.keys(params).forEach( function (index) {
          if (params[index] === "")
            throw aliasList[index];
        });
      }
    };

    /* Dependencies injection */
    SearchBox.$inject = ["MessageService", "$window"];

    /* Assigns directive to an app instance */
    SearchBox.assign = function (app) {
      var ref = this;
      return app.controller("SearchBoxController", function (MessageService) {
        return new ref(MessageService);
      });
    };

    return SearchBox;
});
