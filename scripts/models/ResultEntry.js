define([], function () {

  function hasEntries(input) {
    return Array.isArray(input) && input.length > 0;
  }

  function externalUrl(input) {
    var keys = Object.keys(input.external_urls || {});
    return keys.length > 0 && input.external_urls[keys[0]];
  }

  return function ResultEntry(source) {
    this.type = source.album_type || source.type;
    this.title = source.name;
    this.image = hasEntries(source.images)? source.images[0] : {
      "url": "images/spotify.svg",
      "width": 470,
      "height": 480
    };
    this.id = source.id;
    this.release_year = (source.release_date || "Unknown").split("-")[0];
    this.external_url = externalUrl(source);
    this.loaded = !hasEntries(source.images);
    this.horizontal = this.image !== null && this.image.width >= this.image.height;
    this.has_details = this.type === "artist";
  }
});
