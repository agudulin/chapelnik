var prodLikeEnvs = ["production"];

module.exports = {
  bundle: {
    vendor: {
      scripts: [
        {
          src: "./bower_components/angular/angular.js",
          minSrc: "./bower_components/angular/angular.min.js"
        }, {
          src: "./bower_components/angular-route/angular-route.js",
          minSrc: "./bower_components/angular-route/angular-route.min.js"
        }, {
          src: "./bower_components/angular-resource/angular-resource.js",
          minSrc: "./bower_components/angular-resource/angular-resource.min.js"
        }, {
          src: "./bower_components/jquery/dist/jquery.js",
          minSrc: "./bower_components/jquery/dist/jquery.min.js"
        }, {
          src: "./bower_components/bootstrap/dist/js/bootstrap.js",
          minSrc: "./bower_components/bootstrap/dist/js/bootstrap.min.js"
        }
      ],
      options: {
        useMin: prodLikeEnvs,
        uglify: false,
        minCSS: false,
        rev: prodLikeEnvs
      }
    },

    main: {
      scripts: "./app/client/**/*.js",
      styles: "./app/client/**/*.css",
      options: {
        uglify: prodLikeEnvs,
        minCSS: prodLikeEnvs,
        rev: prodLikeEnvs
      }
    }
  },

  copy: {
    src: "./bower_components/bootstrap/dist/fonts/**/*.*",
    base: "./bower_components/bootstrap/dist/",
    watch: false
  }
};
