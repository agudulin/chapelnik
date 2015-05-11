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
  return gulp.src("./src/client/stylesheets/app.less")
    .pipe(less())
    .pipe(gulp.dest("./src/client/stylesheets"));
});

gulp.task("bundle", function() {
  return gulp.src("./bundle.config.js")
    .pipe(bundle())
    .pipe(gulp.dest("./public"));
});

gulp.task("copy-html-files", function () {
  gulp.src("./src/client/**/*.html")
    .pipe(gulp.dest("public/"));
});


gulp.task("default", ["less", "bundle", "copy-html-files"], function() {
  gulp.watch("./src/client/**/*.less", ["less"]);
  gulp.watch("./src/client/**/*.+(js|css)", ["bundle"]);
  gulp.watch("./src/client/**/*.html", ["copy-html-files"]);
});

gulp.task("build",
  ["less", "bundle", "copy-html-files"]
);
