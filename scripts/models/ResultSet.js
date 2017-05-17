define(["models/ResultEntry"], function (ResultEntry) {
  return function ResultSet(source) {
    var target = Object.keys(source)[0];
    this.totalEntries = source[target].total;
    this.limit = source[target].limit;
    this.offset = source[target].offset;
    this.entries = source[target].items.map(function (item) {
      return new ResultEntry(item);
    });
  }
});
