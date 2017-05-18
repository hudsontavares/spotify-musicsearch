define([], function () {
  var Utils = {
    "preventEvent": function (event) {
      if (typeof(event) === "undefined")
        return;
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return Utils;
});
