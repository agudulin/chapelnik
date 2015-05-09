var gulp = require("gulp");

// gulp plugins
var jshint = require("gulp-jshint");
var clean = require("gulp-clean");
var bundle = require("gulp-bundle-assets");
var less = require("gulp-less");

// tasks
gulp.task("lint", function() {
  gulp.src(["./src/client/**/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});

gulp.task("clean", function() {
    gulp.src("./public/*")
      .pipe(clean({force: true}));
});

gulp.task("less", function() {
  return gulp.src("./src/client/stylesheets/app.less")
    .pipe(less())
    .pipe(gulp.dest("./src/client/stylesheets"));
});

gulp.task("bundle", function() {
  return gulp.src("./bundle.config.js")
    .pipe(bundle())
    .pipe(gulp.dest("./public"));
});

gulp.task("copy-bower-components", function () {
  gulp.src("./bower_components/**")
    .pipe(gulp.dest("public/bower_components"));
});

gulp.task("copy-html-files", function () {
  gulp.src("./src/client/**/*.html")
    .pipe(gulp.dest("public/"));
});


gulp.task("default", ["less", "bundle"], function() {
  gulp.watch("./src/client/**/*.less", ["less"]);
  gulp.watch("./src/client/**/*.+(js|css|html)", ["bundle"]);
});

gulp.task("build",
  ["lint", "bundle", "copy-html-files", "copy-bower-components"]
);
