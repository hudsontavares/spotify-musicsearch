/* TODO: finish setup of Karma */
module.exports = function(config) {
  config.set({
    basePath: './scripts/',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      "tests/runner.js"
    ],
    plugins: [
      require("karma-jasmine"),
      require("karma-phantomjs-launcher"),
      require("karma-remap-istanbul"),
      require("karma-requirejs")
    ],
    browsers: ["PhantomJS"]
  });
};
