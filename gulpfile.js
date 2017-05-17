const gulp = require("gulp");
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");

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

gulp.task("default", function() {
  gulp.watch("./sass/**/*.sass", ["sass"]);
});
