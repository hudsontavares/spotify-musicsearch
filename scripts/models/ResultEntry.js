define([], function () {

  function hasEntries(input) {
    return Array.isArray(input) && input.length > 0;
  }

  return function ResultEntry(source) {
    this.type = source.album_type || source.type;
    this.title = source.name;
    this.image = hasEntries(source.images)? source.images[0] : null;
    this.href = source.uri;
    this.loaded = this.image === null;
    this.horizontal = this.image !== null && this.image.width >= this.image.height;
  }
});
