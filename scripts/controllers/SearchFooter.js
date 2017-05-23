define (["utils/index"], function (Utils) {

    var SearchFooter = function (MessageService) {
      var _this = this;

      this.notify = function (event) {
        Utils.dom.preventEvent(event);
        MessageService.trigger("searchfooter:to-top");
      };
    };

    /* Dependencies injection */
    SearchFooter.$inject = ["MessageService"];

    /* Assigns directive to an app instance */
    SearchFooter.assign = function (app) {
      var _this = this;
      return app.controller("SearchFooterController", function (MessageService) {
        return new _this(MessageService);
      });
    };

    return SearchFooter;
});
