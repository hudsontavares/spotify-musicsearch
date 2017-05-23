define(["jquery"], function ($) {

  var Utils = {
    "preventEvent": function (event) {
      if (typeof(event) === "undefined")
        return;
      event.preventDefault();
      event.stopPropagation();
    },
    "addClass": function (element, className) {
      return $(element).addClass(className)[0].className;
    },
    "removeClass": function (element, className) {
      return $(element).removeClass(className)[0].className;
    },
    "isVisibleAt": function (element, $window) {
      var markers = {
        "window": {
          "top": $window.scrollY,
          "bottom": $window.scrollY + $window.innerHeight
        },
        "element": {
          "top": element.getBoundingClientRect().top,
          "bottom": element.getBoundingClientRect().bottom
        }
      };
      return markers.element.top >= markers.window.top;
    },
    "scrollTo": function (element) {
      var target = $(element);
      $("html, body").animate({"scrollTop": target.offset().top});
    }
  };

  return Utils;
});
