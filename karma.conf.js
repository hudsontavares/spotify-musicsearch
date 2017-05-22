module.exports = function(config) {
  config.set({
    basePath: 'scripts',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: "app.js", included: false},
      {pattern: "app.spec.js", included: false},
      {pattern: "angular.js", included: true},
      {pattern: "angular-mocks.js", included: true},
      {pattern: "ng-load.js", included: false},
      {pattern: "require.text.js", included: false},
      {pattern: "tests/*.json", included: false},
      {pattern: "controllers/*.js", included: false},
      {pattern: "directives/*.js", included: false},
      {pattern: "models/*.js", included: false},
      {pattern: "services/*.js", included: false},
      {pattern: "utils/*.js", included: false},
      {pattern: "templates/*", included: false},
      {pattern: "tests/karma.js", included: true}
    ],
    plugins: [
      require("karma-jasmine"),
      require("karma-phantomjs-launcher"),
      require("karma-remap-istanbul"),
      require("karma-requirejs")
    ],
    browsers: ["PhantomJS"],
    reporters: ['progress'],
    colors: true
  });
};
