define([], function () {
  var Utils = {
    "preventEvent": function (event) {
      if (typeof(event) === "undefined")
        return;
      event.preventDefault();
      event.stopPropagation();
    },
    "addClass": function (element, className) {
      var classes = element.className.split(' ').filter( function (item) {
        return item !== "";
      }), index = classes.indexOf(className);
      if (index === -1)
        classes.push(className);
      return element.className = classes.join(' ');
    },
    "removeClass": function (element, className) {
      var classes = element.className.split(' ').filter( function (item) {
        return item !== "";
      }), index = classes.indexOf(className);
      if (index !== -1)
        classes.splice(index, 1);
      return element.className = classes.join(' ');
    }
  };

  return Utils;
});
