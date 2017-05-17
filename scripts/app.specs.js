define([
  "app",
  "models/ResultSet",
  "require.text!tests/sample.json",
  "require.text!templates/SearchHeader.html",
  "require.text!templates/SearchBox.html"
], function (app, ResultSet, sampleJson, SearchHeaderTemplate, SearchBoxTemplate) {

    beforeEach(module("App"));

    describe("MessageService service", function () {
      var MessageService;

      beforeEach( inject( function ($injector) {
        MessageService = $injector.get("MessageService").unregisterAll();
      }));

      it ("May be injected", function () {
        expect(MessageService).toBeTruthy();
      });

      it ("Registers a new event", function () {
        var eventName = "sample-event";
        var listener = MessageService.register(eventName, function () {});
        expect(Array.isArray(MessageService.listeners(eventName))).toBe(true);
      });

      it ("Triggers an event properly", function (done) {
        var eventName = "triggerable-event";
        var listener = MessageService.register(eventName, function (params) {
          expect(params).toBe(true);
          done();
        });
        MessageService.trigger(eventName, true);
      });
    });

    describe("DataService service", function () {
      var DataService, $httpBackend;

      beforeEach( inject( function ($injector) {
        DataService = $injector.get("DataService");
        $httpBackend = $injector.get("$httpBackend");
      }));

      it ("May be injected", function () {
        expect(DataService).toBeTruthy();
      });

      it ("Digests Spotify API data properly", function (done) {
        DataService.get({
          "q": "Kirk Franklin",
          "type": "album"
        },
        function (resultSet) {
          expect(resultSet).toBeTruthy();
          expect(resultSet instanceof ResultSet).toBe(true);
          expect(Array.isArray(resultSet.entries)).toBe(true);
          done();
        },
        function (error) {
          done.fail("It must not fail.");
        });

        $httpBackend.expect("GET", /api\.spotify\.com/gi).respond(JSON.parse(sampleJson));
        $httpBackend.flush();
      });
    });

    describe("SearchHeader directive", function () {
      var $compile, $rootScope, $httpBackend;

      beforeEach( inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = $injector.get("$templateCache");
        $templateCache.put("/scripts/templates/SearchHeader.html", SearchHeaderTemplate);
      }));

      it("Replaces HTML element", function () {
        var element = $compile("<search-header></search-header>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Powered by Spotify");
      });
    });

    describe("SearchBox directive", function () {
      var $compile, $rootScope, $httpBackend;

      beforeEach( inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = $injector.get("$templateCache");
        $templateCache.put("/scripts/templates/SearchBox.html", SearchBoxTemplate);
      }));

      it("Replaces HTML element", function () {
        var element = $compile("<search-box><input type='text' name='SampleTranscludeField' ng-model='vm.params.q' /></search-box>")($rootScope);
        $rootScope.$digest();
        var form = element.find("form");
        expect(form.length).toBe(1);
        form.triggerHandler("submit");
      });
    });

    describe("SearchBoxController controller", function () {
      var $controller, MessageService;

      beforeEach( inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        MessageService = $injector.get("MessageService").unregisterAll();
      }));

      it("Triggers search", function (done) {
        MessageService.register("searchbox:search", function (params) {
          expect(typeof(params) === "object").toBe(true);
          done();
        });
        var controller = $controller("SearchBoxController", { "$scope" : {} });
        controller.search();
      });
    });
});
