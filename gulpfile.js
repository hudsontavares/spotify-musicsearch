const gulp = require("gulp");
const sass = require("gulp-sass");
const util = require("gulp-util");
const prefix = require("gulp-autoprefixer");
const karma = require("karma").Server;

gulp.task("sass", function () {
  gulp
    .src(["./sass/**/*.sass"])
    .pipe(sass({
      "includePaths": ["./sass/"],
      "outputStyle": "expanded"
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest("./css/"));
});

gulp.task("test", function (done) {
  var server = new karma({
    "configFile": `${__dirname}/karma.conf.js`,
    "singleRun": true,
    "autoWatch": false
  });
  util.log("Starting unit tests...");
  server.start();
});

gulp.task("default", function() {
  gulp.watch("./sass/**/*.sass", ["sass"]);
});
