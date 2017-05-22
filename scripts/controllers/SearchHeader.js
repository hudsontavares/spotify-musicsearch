define (["utils/index"], function (Utils) {

    var SearchHeader = function (MessageService, $window, $element, $scope) {
      var _this = this;
      this.visible= true;

      this.notify = function (event) {
        Utils.preventEvent(event);
        MessageService.trigger("searchheader:notify:click", event);
      };

      angular.element($window).on("scroll", function (event) {
        _this.visible = Utils.isVisibleAt($element[0], $window);
        $scope.$apply();
      });

      MessageService.register("searchfooter:to-top", function () {
        Utils.scrollTo($element);
        return this;
      });
    };

    /* Dependencies injection */
    SearchHeader.$inject = ["MessageService", "$window", "$element", "$scope"];

    /* Assigns directive to an app instance */
    SearchHeader.assign = function (app) {
      var _this = this;
      return app.controller("SearchHeaderController", function (MessageService, $window, $element, $scope) {
        return new _this(MessageService, $window, $element, $scope);
      });
    };

    return SearchHeader;
});
