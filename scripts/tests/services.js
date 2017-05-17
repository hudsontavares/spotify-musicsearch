requirejs.config({
  "baseUrl": "/scripts/"
});

require(["app"], function () {

    beforeEach( function () {
      module('App');
    });

    describe("MessageService object", function () {
      var MessageService;

      beforeEach( inject( function ($injector) {
        MessageService = $injector.get('MessageService');
      }));

      it ('May be injected', function () {
        expect(MessageService).toBeTruthy();
      });

      it ('Registers a new event', function () {
        var eventName = 'sample-event';
        var listener = MessageService.register(eventName, function () {});
        expect(Array.isArray(MessageService.listeners(eventName))).toBe(true);
        MessageService.unregister(listener);
      });

      it ('Triggers an event properly', function (done) {
        var eventName = 'triggerable-event';
        var listener = MessageService.register(eventName, function (params) {
          expect(params).toBe(true);
          done();
        });
        MessageService.trigger(eventName, true);
      });
    });

    describe("DataService object", function () {
      var DataService, $httpBackend;

      beforeEach( inject( function ($injector) {
        DataService = $injector.get('DataService');
        $httpBackend = $injector.get('$httpBackend');
      }));

      it ('May be injected', function () {
        expect(DataService).toBeTruthy();
      });

      it ('Retrieves Spotify API data properly', function (done) {
        DataService.get({
          "q": "Norah Jones",
          "type": "artist"
        },
        function (response) {
          expect(response).toBeTruthy();
          done();
        },
        function (error) {
          done.fail("It must not fail.");
        });

        $httpBackend.expect('GET', /api\.spotify\.com/gi).respond(200);

        $httpBackend.flush();
      });
    });
});
