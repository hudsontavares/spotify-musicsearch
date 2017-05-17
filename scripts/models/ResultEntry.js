define([], function () {

  function hasEntries(input) {
    return Array.isArray(input) && input.length > 0;
  }

  return function ResultEntry(source) {
    this.type = source.album_type;
    this.title = source.name;
    this.image = hasEntries(source.images)? source.images[0].url : null;
    this.href = source.uri;
  }
});
