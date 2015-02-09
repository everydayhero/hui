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
var pkg          = require('./package');

var debug        = !!gutil.env.debug;

var modulePaths = [
  'forms/**/*.{type}',
  'buttons/**/*.{type}',
  'DemoPage/**/*.{type}',
  'layout/**/*.{type}',
  'mixins/**/*.{type}',
  'navigation/**/*.{type}',
  'typography/**/*.{type}'
];

process.env.NODE_ENV = debug ? 'development' : 'production';

function modulePathsWithType(type) {
  var paths = [];

  for (var i = 0; i < modulePaths.length; i++) {
    paths.push(modulePaths[i].replace('{type}', type));
  };

  return paths;
}

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
    .pipe(gulp.dest('dist/images' + '-' + pkg.version));
});

gulp.task('build', ['index']);
gulp.task('default', [ 'build' ]);

gulp.task('watch', function() {
  gulp.watch(modulePathsWithType('.scss'), [ 'styles' ]);
  gulp.watch(modulePathsWithType('.js'), [ 'scripts' ]);
  gulp.watch('index.html', [ 'index' ]);
});
