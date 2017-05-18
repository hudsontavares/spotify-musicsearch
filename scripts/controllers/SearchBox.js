define (["utils/index"], function (Utils) {

    var SearchBox = function (MessageService) {
      this.params = {};
      this.search = function (event) {
        Utils.preventEvent(event);
        MessageService.trigger("searchbox:search", this.params);
        return true;
      };
    };

    /* Dependencies injection */
    SearchBox.$inject = ["MessageService"];

    /* Assigns directive to an app instance */
    SearchBox.assign = function (app) {
      var ref = this;
      return app.controller("SearchBoxController", function (MessageService) {
        return new ref(MessageService);
      });
    };

    return SearchBox;
});
