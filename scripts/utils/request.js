define([], function () {
  var request = {
    "getMessage": function (error) {
      var output = error.statusText;
      if (error.status <= 0)
        output = "An unknown error happened.";
      return output;
    },
    "getHash": function (method, params) {
      return method.name + JSON.stringify(params);
    }
  };

  return request;
});
