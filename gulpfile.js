"use strict";

var gulp                = require('gulp');
var gutil               = require('gulp-util');
var concat              = require('gulp-concat');
var runSequence         = require('run-sequence');
var source              = require('vinyl-source-stream');
var buffer              = require('vinyl-buffer');

// stylesheets
var sass                = require('gulp-sass');
var autoprefixer        = require('gulp-autoprefixer');
var minifyCss           = require('gulp-minify-css');

// javascripts
var browserify          = require('browserify');
var uglify              = require('gulp-uglify');

// html
var inject              = require("gulp-inject");
var pkg                 = require('./package');

var modulePathsWithType = require('./gulp_tasks/modulePathsWithType');

// Tasks
require('./gulp_tasks/assets-deploy.js');
require('./gulp_tasks/lint.js');
require('./gulp_tasks/assets-build.js');

var debug        = !!gutil.env.debug;

process.env.NODE_ENV = debug ? 'development' : 'production';

gulp.task('styles', function() {
  var compress = debug ? gutil.noop : minifyCss;

  return gulp
    .src([ 'index.scss', 'node_modules/highlight.js/styles/monokai_sublime.css' ])
    .pipe(sass({
      sourceMap: 'sass',
      sourceComments: 'map',
      precision: 10,
      imagePath: 'images'
    }))
    .pipe(concat('index.css'))
    .pipe(autoprefixer())
    .pipe(compress())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', [ 'lint' ], function() {
  var compress = debug ? gutil.noop : uglify;

  var bundler = browserify({
      entries: ['./index.js'],
      debug: debug
    });

  return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(compress())
      .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('index', [ 'styles', 'scripts', 'images'], function() {
  var sources = gulp.src([
      'dist/*/index.*'
    ], { read: false });

  return gulp
    .src('index.ejs')
    .pipe(inject(sources, {
      transform: function(filepath, file, i, length) {
        // remove `/dist` from the filepath
        filepath = '/' + filepath.split('/').slice(2).join('/');
        return inject.transform(filepath, file, i, length);
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp
    .src('./images/*', {base: './images'})
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build', ['index']);
gulp.task('default', [ 'build' ]);

gulp.task('watch', function() {
  gulp.watch(modulePathsWithType('.scss'), [ 'styles' ]);
  gulp.watch(modulePathsWithType('.js'), [ 'scripts' ]);
  gulp.watch('index.ejs', [ 'index' ]);
});
