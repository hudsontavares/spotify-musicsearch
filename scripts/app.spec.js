define([
  "app",
  "models/ResultSet",
  "require.text!tests/sample.json",
  "require.text!tests/albums.json",
  "require.text!tests/details.json",
  "require.text!templates/SearchHeader.html",
  "require.text!templates/SearchBox.html",
  "require.text!templates/SearchResults.html",
  "require.text!templates/SearchResult.html",
  "require.text!templates/SearchFooter.html",
  "require.text!templates/EntryDetails.html"
], function (
  app,
  ResultSet,
  sampleJson,
  albumsJson,
  detailsJson,
  SearchHeaderTemplate,
  SearchBoxTemplate,
  SearchResultsTemplate,
  SearchResultTemplate,
  SearchFooterTemplate,
  EntryDetailsTemplate) {
    var MessageService;

    beforeEach(module("App"));
    beforeEach(inject ( function ($injector) {
      MessageService = $injector.get("MessageService");
    }));

    describe("MessageService service", function () {

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
        MessageService.trigger(eventName, true).unregister(eventName);
      });
    });

    describe("DataService service", function () {
      var DataService, $httpBackend, ids = [];

      beforeEach( inject( function ($injector) {
        DataService = $injector.get("DataService");
        $httpBackend = $injector.get("$httpBackend");
      }));

      it ("May be injected", function () {
        expect(DataService).toBeTruthy();
      });

      it ("Digests search Spotify API data properly", function (done) {
        DataService.search({
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
        $httpBackend.resetExpectations();
      });

      it("Digests artist albums Spotify API data properly", function (done) {
        DataService.artistAlbums({
          "id": "test"
        },
        function (entries) {
          expect(Array.isArray(entries)).toBe(true);
          expect(entries.length).toBe(20);
          ids = entries.map( function (item) {
            return item.id;
          });
          done();
        },
        function (error) {
          done.fail("It must not fail.");
        });

        $httpBackend.expect("GET", /api\.spotify\.com/gi).respond(JSON.parse(albumsJson));
        $httpBackend.flush();
        $httpBackend.resetExpectations();
      });

      it("Digest artist album details Spotify API data properly", function (done) {

        DataService.albums(
        ids,
        function (albums) {
          expect(Array.isArray(albums)).toBe(true);
          expect(albums.length).toBe(20);
          done();
        },
        function (error) {
          done.fail("It must not fail.");
        });

        $httpBackend.expect("GET", /api\.spotify\.com/gi).respond(JSON.parse(detailsJson));
        $httpBackend.flush();
        $httpBackend.resetExpectations();

      });
    });

    describe("SearchHeader controller", function () {
      var $controller, targetController = "SearchHeaderController";

      beforeEach( inject(function (_$controller_, $injector) {
        $controller = _$controller_;
      }));

      it("Triggers click notification", function (done) {
        var eventName = "searchheader:notify:click";
        MessageService.register(eventName, function (event) {
          expect(typeof(event) === "undefined").toBe(true);
          done();
        });
        var controller = $controller(targetController, { "$scope" : {} });
        controller.notify();
        MessageService.unregister(eventName);
      });
    });

    describe("SearchHeader directive", function () {
      var $compile, $rootScope;

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
      var $compile, $rootScope;

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
      });
    });

    describe("SearchBoxController controller", function () {
      var $controller, targetController = "SearchBoxController";

      beforeEach( inject(function (_$controller_, $injector) {
        $controller = _$controller_;
      }));

      it("Triggers search", function (done) {
        var eventName = "searchbox:search";
        MessageService.register(eventName, function (params) {
          expect(typeof(params) === "object").toBe(true);
          done();
        });
        var controller = $controller(targetController, { "$scope" : {} });
        controller.search();
        MessageService.unregister(eventName);
      });
    });

    describe("SearchResults / SearchResult directives", function () {
      var $compile, $rootScope, $httpBackend;

      beforeEach( inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = $injector.get("$templateCache");
        $httpBackend = $injector.get("$httpBackend");
        $templateCache.put("/scripts/templates/SearchResults.html", SearchResultsTemplate);
        $templateCache.put("/scripts/templates/SearchResult.html", SearchResultTemplate);
      }));

      it("Replaces HTML element", function () {
        $httpBackend.expect("GET", /api\.spotify\.com/gi).respond(JSON.parse(sampleJson));
        var element = $compile("<search-results></search-results>")($rootScope);
        $rootScope.$digest();
        MessageService.trigger("searchbox:search", {"q": "any"});
        $httpBackend.flush();
        $httpBackend.resetExpectations();

        var entries = element.find("search-result");
        expect(entries.length).toBe(55);
        var sample = entries.eq(0).find("div");
        expect(sample.length).toBe(1);
      });
    });

    describe("SearchResultsController controller", function () {
      var $controller, $httpBackend, targetController = "SearchResultsController";

      beforeEach( inject(function (_$controller_, $injector) {
        $controller = _$controller_;
        $httpBackend = $injector.get("$httpBackend");
      }));

      it("Triggers search", function (done) {
        $httpBackend.expect("GET", /api\.spotify\.com/gi).respond(JSON.parse(sampleJson));
        var controller = $controller(targetController, { "$scope" : {} }), eventName = "searchbox:results";
        MessageService.register(eventName, function (resultSet) {
          expect(typeof(resultSet) === "object").toBe(true);
          done();
        });
        MessageService.trigger("searchbox:search", {"q": "Sample Query"});
        $httpBackend.flush();
        $httpBackend.resetExpectations();
      });
    });

    describe("EntryDetails directive", function () {
      var $compile, $rootScope;

      beforeEach( inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = $injector.get("$templateCache");
        $templateCache.put("/scripts/templates/EntryDetails.html", EntryDetailsTemplate);
      }));

      it("Replaces HTML element", function () {
        var element = $compile("<entry-details></entry-details>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Albums");
      });
    });

    describe("EntryDetails controller", function () {
      var $controller, $window, $httpBackend, targetController = "EntryDetailsController";

      beforeEach( inject(function (_$controller_, $injector, _$window_) {
        $controller = _$controller_;
        $window = _$window_;
        $httpBackend = $injector.get("$httpBackend");
      }));

      it("Unsets all data", function (done) {
        var controller = $controller(targetController, { "$scope" : {} }), eventName = "entry:details:clear";
        MessageService.register(eventName, function(param) {
          expect(param).toBe(undefined);
          done();
        });
        controller.unset();
      });

      it("Attempts to open details from a non-detailed entry and opens external_link", function (done) {
          var entry = {
            "external_url": "https://www.sample.com",
            "has_details": false
          }, controller = $controller(targetController, { "$scope" : {} });

          spyOn($window, "open").and.callFake( function (url) {
            expect(url).toBe(entry.external_url);
            done();
          });

          MessageService.trigger("entry:details", entry);
      });

      it("Attempts to open details from a detailed entry and retrieves album data", function (done) {
          var entry = {
            "external_url": "https://www.sample.com",
            "has_details": true
          }, controller = $controller(targetController, { "$scope" : {} }), eventName = "entry:details:done";

          MessageService.register(eventName, function (entryFromResult, details) {
            expect(entryFromResult).toBe(entry);
            expect(Array.isArray(details)).toBe(true);
            expect(details.length).toBe(20);
            done();
          });
          MessageService.trigger("entry:details", entry);

          $httpBackend.expect("GET", /\/v1\/artists\/.{1,}\/albums/gi).respond(JSON.parse(albumsJson));
          $httpBackend.expect("GET", /\/v1\/albums/gi).respond(JSON.parse(detailsJson));
          $httpBackend.flush();
          $httpBackend.resetExpectations();
      });
    });

    describe("SearchFooter directive", function () {
      var $compile, $rootScope;

      beforeEach( inject(function (_$compile_, _$rootScope_, $injector) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $templateCache = $injector.get("$templateCache");
        $templateCache.put("/scripts/templates/SearchFooter.html", SearchFooterTemplate);
      }));

      it("Replaces HTML element", function () {
        var element = $compile("<search-footer></search-footer>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Powered by Spotify");
      });
    });
});
