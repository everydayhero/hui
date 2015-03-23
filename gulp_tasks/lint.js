var gulp                = require('gulp');
var modulePathsWithType = require('./modulePathsWithType');
var jshint              = require('gulp-jshint');
var react               = require('gulp-react');
var stylish             = require('jshint-stylish');

gulp.task('lint', function() {
  return gulp.src(modulePathsWithType('js'))
    .pipe(react())
    .on('error', function(e) {
      // Need better logging here
      console.log(e);
    })
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
