define( function () {
  return function (name, action) {
    this.name = name;
    this.action = action;
    return this;
  };
});
