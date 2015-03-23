"use strict";

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var runSequence  = require('run-sequence');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var pkg          = require('../package');
var rename       = require('gulp-rename');

// stylesheets
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-minify-css');

// javascripts
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var react        = require('gulp-react');
var stylish      = require('jshint-stylish');

// Tasks
require('./assets-deploy.js');
require('./lint.js');

var debug        = !!gutil.env.debug;

process.env.NODE_ENV = debug ? 'development' : 'production';

gulp.task('assets-styles', function() {
  var compress = debug ? gutil.noop : minifyCss;

  return gulp
    .src([ './assets.scss' ])
    .pipe(sass({
      sourceMap: 'sass',
      sourceComments: 'map',
      precision: 10,
      imagePath: 'images'
    }))
    .pipe(concat('index.css'))
    .pipe(autoprefixer())
    .pipe(compress())
    .pipe(rename('hui-' + pkg.version + '.css'))
    .pipe(gulp.dest('./dist/deploy/'));
});

gulp.task('assets-scripts', [ 'lint' ], function() {
  var compress = debug ? gutil.noop : uglify;

  var bundler = browserify({
      entries: ['./assets.js'],
      debug: debug
    });

  return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(compress())
      .pipe(rename('hui-' + pkg.version + '.js'))
      .pipe(gulp.dest('./dist/deploy/'));
});

gulp.task('assets-build', [ 'assets-styles', 'assets-scripts', 'assets-images']);

gulp.task('assets-images', function() {
  return gulp
    .src('./images/*', {base: './images'})
    .pipe(gulp.dest('./dist/deploy/hui-' + pkg.version + '/images'));
});
