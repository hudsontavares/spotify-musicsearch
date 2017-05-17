define(['exports', 'models/EventListener'], function (exports, EventListener) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var MessageService = function () {
    var listeners = {};

    /* Registers a new event listener */
    this.register = function (event, action) {
      if (typeof (listeners[event]) === "undefined")
        listeners[event] = [];
      var listener = new EventListener(event, action);
      listeners[event].push(listener);
      return listener;
    };

    /* Retrieves all listeners for the specified event */
    this.listeners = function (event) {
      return typeof (listeners[event]) !== null ? listeners[event] : [];
    }

    /* Removes specified event */
    this.unregister = function (listener) {
      if (typeof(listeners[listener.event]) !== "undefined") {
        var index = listeners[listener.event].indexOf(listener);
        if (index !== -1)
          listeners[listener.event].splice(index, 1);
      }
      return this;
    }

    /* Triggers all the listeners for the specified event */
    this.trigger = function (event, params) {
      if (Array.isArray(listeners[event])) {
        listeners[event].forEach( function (listener) {
          listener.action(params);
        });
      }
      return this;
    };

    return this;
  };

  /* Dependencies injection */
  MessageService.$inject = [];

  /* Assigns service an app instance */
  MessageService.assign = function (app) {
    var ref = this;
    return app.factory("MessageService", function () {
      return new ref();
    });
  };

  return MessageService;
});
