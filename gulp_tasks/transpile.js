var gulp = require("gulp");
var babel = require("gulp-babel");
var sourceDirectories = [
  "atoms",
  "buttons",
  "forms",
  "graphs",
  "layout",
  "leaderboard",
  "lib",
  "mixins",
  "navigation",
  "search",
  "wizard",
  "lib",
  "sass"
];

var sourceMatcher = '{' + sourceDirectories.join(",") + '}';
var destination = 'transpiled';

gulp.task("transpile", ['transpile-js', 'transpile-scss', 'transpile-images'], function() {
  return gulp.src('package.json').pipe(gulp.dest(destination));
});

gulp.task("transpile-js", function () {
  return gulp.src([
      sourceMatcher + '/**/*.js',
      '!**/*-test.js',
      'api.js',
      'urls.js'
    ])
    .pipe(babel({
      presets: ['react', 'es2015', 'stage-0']
    }))
    .pipe(gulp.dest(destination));
});

gulp.task('transpile-scss', function() {
  return gulp
    .src([sourceMatcher + '/**/*.{scss,sass}', 'common.scss', 'assets.scss'])
    .pipe(gulp.dest(destination))
});

gulp.task('transpile-images', function() {
  return gulp
    .src('./images/*')
    .pipe(gulp.dest(destination + '/images'));
});
