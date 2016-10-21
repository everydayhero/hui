var gulp = require('gulp')
var pkg = require('../package')
var replace = require('gulp-replace')

gulp.task('docs', function () {
  return gulp
    .src('docs.md')
    .pipe(replace('{{ latest-version }}', pkg.version))
    .pipe(gulp.dest('dist'))
})
