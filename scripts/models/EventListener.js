define( function () {
  return function EventListener (name, action) {
    this.name = name;
    this.action = action;
    return this;
  };
});
