// Gulp tasks for Tachyons

// Load plugins
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    rename = require('gulp-rename');

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
  gulp.src('./box_sizing.scss')
      .pipe(watch('./box_sizing.scss', function(files) {
        return files.pipe(sass())
          .pipe(size({gzip: false, showFiles: true, title:'un-prefixed css'}))
          .pipe(size({gzip: true, showFiles: true, title:'un-prefixed gzipped css'}))
          .pipe(prefix())
          .pipe(size({gzip: false, showFiles: true, title:'prefixed css'}))
          .pipe(size({gzip: true, showFiles: true, title:'prefixed css'}))
          .pipe(gulp.dest('./'))
          .pipe(minifyCSS())
          .pipe(rename('box_sizing.min.css'))
          .pipe(gulp.dest('./'))
          .pipe(size({gzip: false, showFiles: true, title:'minified css'}))
          .pipe(size({gzip: true, showFiles: true, title:'minified css'}))
      }));
});

/*
   DEFAULT TASK
*/

gulp.task('default', ['pre-process'], function(){
  gulp.start('pre-process');
  gulp.watch('*.scss', ['pre-process']);
});

