var gulp = require("gulp");

// gulp plugins
var clean = require("gulp-clean");
var bundle = require("gulp-bundle-assets");
var less = require("gulp-less");

// tasks
gulp.task("clean", function() {
    gulp.src("./public/*")
      .pipe(clean({force: true}));
});

gulp.task("less", function() {
  return gulp.src("./app/client/stylesheets/app.less")
    .pipe(less())
    .pipe(gulp.dest("./app/client/stylesheets"));
});

gulp.task("bundle", function() {
  return gulp.src("./bundle.config.js")
    .pipe(bundle())
    .pipe(bundle.results("./"))
    .pipe(gulp.dest("./public"));
});

gulp.task("copy-html-files", function () {
  gulp.src("./app/client/**/*.html")
    .pipe(gulp.dest("./public/"));
});


gulp.task("default", ["less", "bundle", "copy-html-files"], function() {
  gulp.watch("./app/client/**/*.less", ["less"]);
  gulp.watch("./app/client/**/*.+(js|css)", ["bundle"]);
  gulp.watch("./app/client/**/*.html", ["copy-html-files"]);
});

gulp.task("build",
  ["less", "bundle", "copy-html-files"]
);
