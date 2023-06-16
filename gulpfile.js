"use strict";

const gulp = require("gulp");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

const sass = require("gulp-sass")(require('sass'));

sass.compiler = require("node-sass"); //Necessário para funcionar gulp-sass

gulp.task('default', watch, browserSync.init({
  server: {
      baseDir: "./",
      port: 8080
  }
})
);

gulp.task("sass", compilaSass);

gulp.watch("src/scss/*.scss").on('change', browserSync.reload);
gulp.watch("*.html").on('change', browserSync.reload);

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./",
          port: 8080
      }
  });
});

function compilaSass() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError)) // Converte Sass para CSS mimificado com gulp-sass
    .pipe(gulp.dest("src/css"));
}

function watch() {
  gulp.watch("src/scss/**/*.scss", compilaSass);
}
