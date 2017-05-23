define(["models/EventListener"], function (EventListener) {
  var MessageService = function () {
    var listeners = {};

    /* Registers a new event listener */
    this.register = function (list, action) {
      var output = [];
      list = Array.isArray(list) ? list : [list];
      for (var counter = 0, size = list.length; counter < size; counter++) {
        var event = list[counter];
        if (typeof (listeners[event]) === "undefined")
          listeners[event] = [];
        var listener = new EventListener(event, action);
        listeners[event].push(listener);
        output.push(listener);
      }
      return output.length === 1 ? output.pop() : output;
    };

    /* Retrieves all listeners for the specified event */
    this.listeners = function (event) {
      return typeof (listeners[event]) !== "undefined" ? listeners[event] : [];
    }

    /* Removes specified events list */
    this.unregister = function (list) {
      if (!Array.isArray(list))
        list = [list];

      for (var counter = 0, size = list.length; counter < size; counter++) {
        var listener = list[counter];
        if (typeof(listeners[listener.event]) !== "undefined") {
          var index = listeners[listener.event].indexOf(listener);
          if (index !== -1)
            listeners[listener.event].splice(index, 1);
        }
      }

      return this;
    }

    /* Removes all events */
    this.unregisterAll = function () {
      listeners = {};
      return this;
    }

    /* Triggers all the listeners for the specified event */
    this.trigger = function (event) {
      if (Array.isArray(listeners[event])) {
        var args = arguments;
        listeners[event].forEach( function (listener) {
          var params = Array.prototype.slice.call(args);
          listener.action.apply(listener, params.slice(1));
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
    var _this = this;
    return app.factory("MessageService", function () {
      return new _this();
    });
  };

  return MessageService;
});
