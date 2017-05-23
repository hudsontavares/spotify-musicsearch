define (["utils/index"], function (Utils) {

    var SearchBox = function (MessageService, $window, $element) {
      this.params = {};
      var aliasList = {};
      this.search = function (event) {
        try {
          Utils.dom.preventEvent(event);
          this.check(this.params);
          MessageService.trigger("searchbox:search", this.params);
        }
        catch (error) {
          $window.alert("Please provide a " + error + ".");
        }
        return this;
      };
      this.init = function (index, value, alias) {
        this.params[index] = value;
        aliasList[index] = alias;
        return this;
      };
      this.check = function(params) {
        Object.keys(params).forEach( function (index) {
          if (params[index] === "")
            throw aliasList[index];
        });
        return this;
      };
      this.focus = function () {
        Utils.dom.scrollTo($element);
        return this;
      };

      MessageService.register("searchheader:notify:click", this.focus);
      MessageService.register("searchresults:render", this.focus);
    };

    /* Dependencies injection */
    SearchBox.$inject = ["MessageService", "$window", "$element"];

    /* Assigns directive to an app instance */
    SearchBox.assign = function (app) {
      var _this = this;
      return app.controller("SearchBoxController", function (MessageService, $window, $element) {
        return new _this(MessageService, $window, $element);
      });
    };

    return SearchBox;
});
