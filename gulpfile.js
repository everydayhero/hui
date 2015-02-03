"use strict";

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var runSequence  = require('run-sequence');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');

// stylesheets
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');

// javascripts
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var react        = require('gulp-react');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

// html
var inject       = require("gulp-inject");

var debug        = !!gutil.env.debug;

if (debug) {
  process.env.NODE_ENV = 'development';
}

gulp.task('styles', function() {
  var process = debug ? gutil.noop : minifyCss;

  return gulp
    .src([ 'src/index.scss' ])
    .pipe(sass({
      sourceMap: 'sass',
      sourceComments: 'map',
      precision: 10,
      imagePath: 'images'
    }))
    .pipe(concat('index.css'))
    .pipe(autoprefixer())
    .pipe(process())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('lint', function() {
  return gulp.src([ 'src/**/*.js' ])
    .pipe(react())
    .on('error', function(e) {
      // Need better logging here
      console.log(e);
    })
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', [ 'lint' ], function() {
  var process = debug ? gutil.noop : uglify;

  var bundler = browserify({
      entries: ['./src/index.js'],
      debug: debug
    });

  return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(process())
      .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('index', [ 'styles', 'scripts' ], function() {
  var sources = gulp.src([
      'dist/*/index.*'
    ], { read: false });

  return gulp
    .src('src/index.html')
    .pipe(inject(sources, {
      transform: function(filepath, file, i, length) {
        // remove `/dist` from the filepath
        filepath = '/' + filepath.split('/').slice(2).join('/');
        return inject.transform(filepath, file, i, length);
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['index']);
gulp.task('default', [ 'build' ]);

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', [ 'styles' ]);
  gulp.watch('src/**/*.js', [ 'scripts' ]);
  gulp.watch('src/index.html', [ 'index' ]);
});
