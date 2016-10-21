var gulp = require('gulp')
var standard = require('gulp-standard')

gulp.task('lint', function () {
  return gulp.src(['./**/*.js', '!./node_modules/**', '!./bin/**', '!./gulp*', '!./gulp_tasks/**', '!./dist/**', '!./**/*Shim*'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }))
})
