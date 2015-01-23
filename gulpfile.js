var gulp = require('gulp'),
    rename = require('gulp-rename'),
    basswork = require('gulp-basswork'),
    minifyCss = require('gulp-minify-css'),
    transform = require('vinyl-transform'),
    size = require('gulp-size'),
    webserver = require('gulp-webserver');

gulp.task('css', function() {
  gulp.src('./src/tachyons-box-sizing.css')
    .pipe(basswork())
    .pipe(size({gzip: true, showFiles: true, title:'prefixed'}))
    .pipe(gulp.dest('./'))
    .pipe(minifyCss())
    .pipe(size({gzip: true, showFiles: true, title:'minified'}))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./'));
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({}));
});

gulp.task('default', ['css', 'serve'], function() {
  gulp.watch(['./src/**/*'], ['css']);
});


