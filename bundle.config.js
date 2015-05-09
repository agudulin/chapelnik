var prodLikeEnvs = ["production"];

module.exports = {
  bundle: {
    vendor: {
      scripts: [
        {
          src: "./bower_components/jquery/dist/jquery.js",
          minSrc: "./bower_components/jquery/dist/jquery.min.js"
        }, {
          src: "./bower_components/bootstrap/dist/js/bootstrap.js",
          minSrc: "./bower_components/bootstrap/dist/js/bootstrap.min.js"
        }, {
          src: "./bower_components/angular/angular.js",
          minSrc: "./bower_components/angular/angular.min.js"
        }
      ],
      styles: {
        src: "./bower_components/bootstrap/dist/css/bootstrap.css",
        minSrc: "./bower_components/bootstrap/dist/css/bootstrap.min.css"
      },
      options: {
        useMin: prodLikeEnvs,
        uglify: false,
        minCSS: false,
        rev: prodLikeEnvs
      }
    },

    main: {
      scripts: "./src/client/**/*.js",
      styles: "./src/client/**/*.css",
      options: {
        uglify: prodLikeEnvs,
        minCSS: prodLikeEnvs,
        rev: prodLikeEnvs
      }
    }
  }
};
