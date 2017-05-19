define(["models/ResultEntry"], function (ResultEntry) {
  return function ResultSet(source, limit) {
    this.entries = [];

    for (var keys = Object.keys(source).reverse(), counter = 0, size = keys.length; counter < size; counter++) {
      var key = keys[counter];
      this.entries = this.entries.concat(source[key].items.map( function (item) {
        return new ResultEntry(item);
      }));
    }

    return this;
  }
});
